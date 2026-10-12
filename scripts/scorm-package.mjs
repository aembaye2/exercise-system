#!/usr/bin/env node
// Packages a quiz module (the same .js file a Quarto page loads with data-quiz) as a
// SCORM 2004 3rd edition zip for an LMS such as Blackboard Ultra.
//
//   npm run scorm -- quarto-demo/quiz1.js [--passing 0.7] [--out file.zip]
//
// The package holds index.html (mounts the quiz with mountScorm), imsmanifest.xml, the
// built bundle from dist-lib/ and the quiz with every question file it imports.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { zipSync } from "fflate";

const BUNDLE_FILES = ["exercise-system.js", "exercise-system.css"];
const IMPORT_RE = /(?:\bfrom\s*|\bimport\s*\(?\s*)["'](\.{1,2}\/[^"']+)["']/g;

const toPosix = (p) => p.split(sep).join("/");

const escapeXml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

/** xs:ID: starts with a letter or underscore; letters, digits, '.', '-', '_' only. */
export function xmlId(s) {
  const id = s.replace(/[^A-Za-z0-9._-]/g, "_");
  return /^[A-Za-z_]/.test(id) ? id : `_${id}`;
}

/**
 * The quiz file and every module it imports through relative paths, as paths relative
 * to `rootDir`. Throws if an import is missing or points outside `rootDir`.
 */
export function collectModuleFiles(entry, rootDir) {
  const root = resolve(rootDir);
  const seen = new Set();
  const queue = [resolve(entry)];
  while (queue.length > 0) {
    const file = queue.shift();
    if (seen.has(file)) continue;
    const rel = relative(root, file);
    if (rel.startsWith("..")) throw new Error(`${file} is outside ${root}; the package can only hold files under it.`);
    if (!existsSync(file)) throw new Error(`Missing module ${file}.`);
    seen.add(file);
    for (const match of readFileSync(file, "utf8").matchAll(IMPORT_RE)) {
      queue.push(resolve(dirname(file), match[1]));
    }
  }
  return [...seen].map((f) => toPosix(relative(root, f))).sort();
}

export function buildManifest({ identifier, title, files, passingScore }) {
  const t = escapeXml(title);
  const sequencing =
    passingScore === undefined
      ? ""
      : `
        <imsss:sequencing>
          <imsss:objectives>
            <imsss:primaryObjective objectiveID="primary" satisfiedByMeasure="true">
              <imsss:minNormalizedMeasure>${passingScore}</imsss:minNormalizedMeasure>
            </imsss:primaryObjective>
          </imsss:objectives>
        </imsss:sequencing>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${xmlId(identifier)}" version="1"
  xmlns="http://www.imsglobal.org/xsd/imscp_v1p1"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_v1p3"
  xmlns:adlseq="http://www.adlnet.org/xsd/adlseq_v1p3"
  xmlns:adlnav="http://www.adlnet.org/xsd/adlnav_v1p3"
  xmlns:imsss="http://www.imsglobal.org/xsd/imsss"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imscp_v1p1 imscp_v1p1.xsd http://www.adlnet.org/xsd/adlcp_v1p3 adlcp_v1p3.xsd http://www.adlnet.org/xsd/adlseq_v1p3 adlseq_v1p3.xsd http://www.adlnet.org/xsd/adlnav_v1p3 adlnav_v1p3.xsd http://www.imsglobal.org/xsd/imsss imsss_v1p0.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>2004 3rd Edition</schemaversion>
  </metadata>
  <organizations default="org">
    <organization identifier="org">
      <title>${t}</title>
      <item identifier="item_1" identifierref="resource_1">
        <title>${t}</title>${sequencing}
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="resource_1" type="webcontent" adlcp:scormType="sco" href="index.html">
${files.map((f) => `      <file href="${escapeXml(f)}"/>`).join("\n")}
    </resource>
  </resources>
</manifest>
`;
}

export function buildIndexHtml({ title, quizPath }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeXml(title)}</title>
<link rel="stylesheet" href="exercise-system.css">
<style>
  body { margin: 0; padding: 16px; background: #fff; color: #0f172a; font-family: system-ui, -apple-system, "Segoe UI", sans-serif; }
  @media (prefers-color-scheme: dark) { body { background: #020617; color: #e2e8f0; } }
  #exercise-system-root { max-width: 64rem; margin: 0 auto; }
</style>
</head>
<body>
<div id="exercise-system-root" class="exercise-system-root">Loading…</div>
<script type="module">
  const root = document.getElementById("exercise-system-root");
  try {
    const { mountScorm } = await import("./exercise-system.js");
    const { assessment, questions } = await import("./${quizPath}");
    root.textContent = "";
    mountScorm(root, { assessment, questions });
  } catch (err) {
    root.textContent = "Could not load the quiz: " + err.message;
    console.error(err);
  }
</script>
</body>
</html>
`;
}

/** Builds the zip in memory. Returns { zip: Uint8Array, files: string[], assessment }. */
export async function buildScormPackage({ quizFile, libDir = "dist-lib", passingScore }) {
  const quiz = resolve(quizFile);
  const rootDir = dirname(quiz);
  const { assessment, questions } = await import(pathToFileURL(quiz).href);
  if (!assessment?.id || !assessment?.title || !Array.isArray(questions)) {
    throw new Error(`${quizFile} must export \`assessment\` (with id and title) and \`questions\`.`);
  }
  if (passingScore !== undefined && !(passingScore >= 0 && passingScore <= 1)) {
    throw new Error("--passing must be between 0 and 1 (e.g. 0.7 for 70%).");
  }
  for (const f of BUNDLE_FILES) {
    if (!existsSync(join(libDir, f))) throw new Error(`${join(libDir, f)} not found; run npm run build:lib first.`);
  }

  const quizFiles = collectModuleFiles(quiz, rootDir);
  const quizPath = toPosix(relative(rootDir, quiz));
  const contentFiles = ["index.html", ...BUNDLE_FILES, ...quizFiles];
  const entries = {
    "imsmanifest.xml": new TextEncoder().encode(
      buildManifest({ identifier: assessment.id, title: assessment.title, files: contentFiles, passingScore }),
    ),
    "index.html": new TextEncoder().encode(buildIndexHtml({ title: assessment.title, quizPath })),
  };
  for (const f of BUNDLE_FILES) entries[f] = readFileSync(join(libDir, f));
  for (const f of quizFiles) entries[f] = readFileSync(join(rootDir, f));
  return { zip: zipSync(entries, { level: 9 }), files: Object.keys(entries), assessment };
}

function parseArgs(argv) {
  const args = { quizFile: undefined, out: undefined, passingScore: undefined, libDir: "dist-lib" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--out") args.out = argv[++i];
    else if (a === "--passing") args.passingScore = Number(argv[++i]);
    else if (a === "--lib") args.libDir = argv[++i];
    else if (!a.startsWith("--")) args.quizFile = a;
    else throw new Error(`Unknown option ${a}`);
  }
  if (!args.quizFile) {
    throw new Error("Usage: npm run scorm -- <quiz.js> [--passing 0.7] [--out file.zip]");
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const { zip, files, assessment } = await buildScormPackage(args);
  const out = args.out ?? join("dist-scorm", `${xmlId(assessment.id)}-scorm.zip`);
  mkdirSync(dirname(resolve(out)), { recursive: true });
  writeFileSync(out, zip);
  console.log(`SCORM 2004 package: ${out} (${(zip.length / 1024 / 1024).toFixed(1)} MB, ${files.length} files)`);
  console.log(`  "${assessment.title}" (id ${assessment.id}), ${files.filter((f) => f.endsWith(".js")).length - 1} quiz module(s)`);
}

if (process.argv[1] && basename(process.argv[1]) === "scorm-package.mjs") {
  main().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
