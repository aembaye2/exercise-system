import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Import } from "./Import";
import { assessmentReducer, createAssessmentState } from "../engine/assessment";
import { buildExport, type ResultsExport } from "../engine/storage";
import { exercise, seedCounter, testBank } from "../test/fixtures";

const NOW = "2026-01-01T00:00:00.000Z";

function exportedResults(): ResultsExport {
  let s = createAssessmentState(exercise, testBank, seedCounter(100), NOW);
  const part = s.questions[0].preparedParts[0];
  const correct = part.type === "integer" ? part.correct : 0;
  for (const value of ["999", String(correct)]) {
    s = assessmentReducer(s, { type: "setValue", index: 0, part: "sum", value });
    s = assessmentReducer(s, { type: "submit", index: 0, timestamp: NOW });
  }
  s = assessmentReducer(s, { type: "setStudentName", name: "Ada" });
  return buildExport(s, exercise, NOW);
}

function upload(content: string) {
  const file = new File([content], "results.json", { type: "application/json" });
  return userEvent.upload(screen.getByLabelText(/Results file/), file);
}

describe("Import page", () => {
  it("regenerates variants from seeds and shows submissions read-only", async () => {
    render(<Import bank={testBank} />);
    await upload(JSON.stringify(exportedResults()));

    expect(await screen.findByText("Ada")).toBeInTheDocument();
    expect(screen.getByText(/verified by regrading/)).toBeInTheDocument();
    expect(screen.getByText(/seed 100/)).toBeInTheDocument();
    // Question text regenerated from the seed, with correct answers shown.
    expect(screen.getAllByText(/Correct answer:/).length).toBeGreaterThan(0);
    // Both submissions listed, inputs read-only.
    expect(screen.getByRole("table", { name: /Submissions for variant 1/ })).toBeInTheDocument();
    for (const box of screen.getAllByRole("textbox")) expect(box).toBeDisabled();
  });

  it("flags tampered scores", async () => {
    const data = exportedResults();
    data.questions[0].submissions[0].score = 1;
    data.earned = 14;
    render(<Import bank={testBank} />);
    await upload(JSON.stringify(data));
    expect(await screen.findByText(/regrading gives 10/)).toBeInTheDocument();
    expect(screen.getByText(/file says 100%/)).toBeInTheDocument();
  });

  it("shows an error for invalid files", async () => {
    render(<Import bank={testBank} />);
    await upload("not json");
    expect(await screen.findByText("This file is not valid JSON.")).toBeInTheDocument();
  });
});
