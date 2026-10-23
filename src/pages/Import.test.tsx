import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Import } from "./Import";
import { assessmentReducer, createAssessmentState } from "../engine/assessment";
import { buildExport, type ResultsExport } from "../engine/storage";
import type { Assessment, Question } from "../engine/types";
import { createVariant } from "../engine/variant";
import { addQuestion, exercise, seedCounter, testBank } from "../test/fixtures";

const NOW = "2026-01-01T00:00:00.000Z";

function exportedResults(): ResultsExport {
  let s = createAssessmentState(exercise, testBank, seedCounter(100), NOW);
  s = assessmentReducer(s, { type: "setValue", index: 0, part: "sum", value: "999" });
  s = assessmentReducer(s, { type: "submit", index: 0, timestamp: NOW });
  // A graded variant is locked; the second (correct) answer is on a new variant.
  const preparedParts = createVariant(addQuestion as never, 200).parts;
  s = assessmentReducer(s, { type: "newVariant", index: 0, seed: 200, preparedParts });
  const part = preparedParts[0];
  const correct = part.type === "integer" ? part.correct : 0;
  s = assessmentReducer(s, { type: "setValue", index: 0, part: "sum", value: String(correct) });
  s = assessmentReducer(s, { type: "submit", index: 0, timestamp: NOW });
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

  it("lets the teacher grade an essay and updates the score", async () => {
    const essay: Question<Record<string, never>> = {
      id: "essay",
      title: "Essay",
      generate: () => ({}),
      render: () => "Explain.",
      parts: () => [{ type: "essay", name: "why", modelAnswer: "Because **shortage**." }],
    };
    const bank = (id: string) => (id === "essay" ? (essay as Question<unknown>) : undefined);
    const hw: Assessment = { id: "e", title: "E", mode: "exam", questions: [{ questionId: "essay", points: 10 }] };
    let s = createAssessmentState(hw, bank, seedCounter(), NOW);
    s = assessmentReducer(s, { type: "setValue", index: 0, part: "why", value: "Prices are capped." });
    s = assessmentReducer(s, { type: "submit", index: 0, timestamp: NOW });

    render(<Import bank={bank} />);
    await upload(JSON.stringify(buildExport(s, hw, NOW)));

    expect(await screen.findByText(/1 answer awaiting your grade/)).toBeInTheDocument();
    expect(screen.getByText("Model answer")).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText(/^Points/), "7");
    await userEvent.type(screen.getByLabelText(/Comment for the student/), "Mention the shortage.");
    await userEvent.click(screen.getByRole("button", { name: "Save grade" }));

    expect(screen.getByText(/graded: 7 \/ 10/)).toBeInTheDocument();
    expect(screen.getByText("Mention the shortage.", { selector: ":not(textarea)" })).toBeInTheDocument();
    expect(screen.getByText(/verified by regrading/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Download graded results" })).toBeInTheDocument();
    expect(screen.queryByText(/awaiting your grade/)).toBeNull();
  });

  it("rejects points above the part's maximum", async () => {
    const essay: Question<Record<string, never>> = {
      id: "essay",
      title: "Essay",
      generate: () => ({}),
      render: () => "Explain.",
      parts: () => [{ type: "essay", name: "why", modelAnswer: "m" }],
    };
    const bank = (id: string) => (id === "essay" ? (essay as Question<unknown>) : undefined);
    const hw: Assessment = { id: "e", title: "E", mode: "exam", questions: [{ questionId: "essay", points: 5 }] };
    let s = createAssessmentState(hw, bank, seedCounter(), NOW);
    s = assessmentReducer(s, { type: "setValue", index: 0, part: "why", value: "text" });
    s = assessmentReducer(s, { type: "submit", index: 0, timestamp: NOW });
    render(<Import bank={bank} />);
    await upload(JSON.stringify(buildExport(s, hw, NOW)));
    await userEvent.type(await screen.findByLabelText(/^Points/), "6");
    await userEvent.click(screen.getByRole("button", { name: "Save grade" }));
    expect(screen.getByText("Enter points between 0 and 5.")).toBeInTheDocument();
  });
});
