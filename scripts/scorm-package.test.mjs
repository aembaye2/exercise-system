// @vitest-environment node
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { unzipSync } from "fflate";
import { afterAll, describe, expect, it } from "vitest";
import { buildIndexHtml, buildManifest, buildScormPackage, collectModuleFiles, xmlId } from "./scorm-package.mjs";

const tmp = mkdtempSync(join(tmpdir(), "scorm-pkg-"));
afterAll(() => rmSync(tmp, { recursive: true, force: true }));

/** A quiz folder like quarto-demo/, plus a fake built bundle. */
function fixture() {
  const root = join(tmp, "assets");
  mkdirSync(join(root, "questions", "a"), { recursive: true });
  writeFileSync(join(root, "questions", "a", "01_q.js"), 'import { helper } from "./helper.js";\nexport const q = { id: "q", title: "Q", generate: () => ({}), render: () => "x", parts: () => [] };\n');
  writeFileSync(join(root, "questions", "a", "helper.js"), "export const helper = 1;\n");
  writeFileSync(
    join(root, "quiz.js"),
    'import { q } from "./questions/a/01_q.js";\nexport const questions = [q];\nexport const assessment = { id: "my quiz", title: "Quiz <1> & more", mode: "exam", questions: [] };\n',
  );
  const lib = join(tmp, "lib");
  mkdirSync(lib, { recursive: true });
  writeFileSync(join(lib, "exercise-system.js"), "export function mountScorm() {}\n");
  writeFileSync(join(lib, "exercise-system.css"), "body{}\n");
  return { root, lib };
}

describe("scorm-package", () => {
  it("collects the quiz and every module it imports, transitively", () => {
    const { root } = fixture();
    expect(collectModuleFiles(join(root, "quiz.js"), root)).toEqual(["questions/a/01_q.js", "questions/a/helper.js", "quiz.js"]);
  });

  it("collects the real Quarto quiz1.js", () => {
    const root = "quarto-demo";
    const files = collectModuleFiles(join(root, "quiz1.js"), root);
    expect(files).toContain("quiz1.js");
    expect(files).toContain("questions/07_jsxgraph_budget_line.js");
    expect(files).toHaveLength(16);
  });

  it("refuses imports outside the quiz folder", () => {
    const { root } = fixture();
    writeFileSync(join(root, "bad.js"), 'import "../outside.js";\n');
    expect(() => collectModuleFiles(join(root, "bad.js"), root)).toThrow(/outside/);
  });

  it("makes valid XML ids", () => {
    expect(xmlId("my quiz")).toBe("my_quiz");
    expect(xmlId("1st")).toBe("_1st");
  });

  it("writes a SCORM 2004 3rd edition manifest with an optional passing score", () => {
    const m = buildManifest({ identifier: "q 1", title: "A & B", files: ["index.html", "x.js"], passingScore: 0.7 });
    expect(m).toContain("<schemaversion>2004 3rd Edition</schemaversion>");
    expect(m).toContain('identifier="q_1"');
    expect(m).toContain("<title>A &amp; B</title>");
    expect(m).toContain('adlcp:scormType="sco" href="index.html"');
    expect(m).toContain('<file href="x.js"/>');
    expect(m).toContain("<imsss:minNormalizedMeasure>0.7</imsss:minNormalizedMeasure>");
    expect(buildManifest({ identifier: "q", title: "t", files: [] })).not.toContain("imsss:sequencing");
  });

  it("writes an index.html that mounts the quiz with mountScorm", () => {
    const html = buildIndexHtml({ title: "T <x>", quizPath: "quiz1.js" });
    expect(html).toContain("<title>T &lt;x&gt;</title>");
    expect(html).toContain('await import("./quiz1.js")');
    expect(html).toContain("mountScorm(root, { assessment, questions })");
  });

  it("zips the manifest, page, bundle and quiz files", async () => {
    const { root, lib } = fixture();
    const { zip, assessment } = await buildScormPackage({ quizFile: join(root, "quiz.js"), libDir: lib, passingScore: 0.6 });
    const files = Object.keys(unzipSync(zip)).sort();
    expect(files).toEqual([
      "exercise-system.css",
      "exercise-system.js",
      "imsmanifest.xml",
      "index.html",
      "questions/a/01_q.js",
      "questions/a/helper.js",
      "quiz.js",
    ]);
    expect(assessment.id).toBe("my quiz");
    const manifest = new TextDecoder().decode(unzipSync(zip)["imsmanifest.xml"]);
    expect(manifest).toContain("<title>Quiz &lt;1&gt; &amp; more</title>");
  });

  it("explains a missing bundle or a bad passing score", async () => {
    const { root, lib } = fixture();
    await expect(buildScormPackage({ quizFile: join(root, "quiz.js"), libDir: join(tmp, "nope") })).rejects.toThrow(/build:lib/);
    await expect(buildScormPackage({ quizFile: join(root, "quiz.js"), libDir: lib, passingScore: 70 })).rejects.toThrow(/between 0 and 1/);
  });
});
