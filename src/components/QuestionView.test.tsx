import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AssessmentProvider } from "./AssessmentContext";
import { AssessmentView } from "./AssessmentView";
import { QuestionView } from "./QuestionView";
import { createVariant } from "../engine/variant";
import { addQuestion, exam, exercise, seedCounter, testBank, twoPartQuestion } from "../test/fixtures";

function correctSum(seed: number): number {
  const p = createVariant(addQuestion as never, seed).parts[0];
  if (p.type !== "integer") throw new Error();
  return p.correct;
}

function renderQuestion(assessment = exercise, index = 0) {
  render(
    <AssessmentProvider assessment={assessment} bank={testBank} nextSeed={seedCounter(100)}>
      <QuestionView index={index} />
    </AssessmentProvider>,
  );
}

describe("QuestionView", () => {
  it("submits a wrong answer, then a correct one, showing feedback and score", async () => {
    const user = userEvent.setup();
    renderQuestion();
    const input = screen.getByRole("textbox", { name: "Sum:" });

    // Invalid format: message, no attempt used.
    await user.type(input, "2.5{Enter}");
    expect(screen.getByText(/is not an integer/)).toBeInTheDocument();
    expect(screen.getByText(/did not use an attempt/)).toBeInTheDocument();
    expect(screen.getByText(/Attempts used: 0/)).toBeInTheDocument();

    // Wrong answer.
    await user.clear(input);
    await user.type(input, "999");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(screen.getByText("Incorrect")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Submission score: 0%");
    expect(screen.getByText(/Attempts used: 1/)).toBeInTheDocument();
    // Correct answer not revealed yet.
    expect(screen.queryByText(/Correct answer:/)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "New variant" })).toBeInTheDocument();

    // Correct answer.
    await user.clear(input);
    await user.type(input, `${correctSum(100)}{Enter}`);
    expect(screen.getByText("Correct")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Submission score: 100%");
    expect(screen.getByText(/Best score: 100%/)).toBeInTheDocument();
    expect(screen.getByText("10 / 10 points")).toBeInTheDocument();
    expect(screen.getByText(/Correct answer:/)).toBeInTheDocument();
    expect(input).toBeDisabled();
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
  });

  it("shows the seed and a fresh variant on 'New variant'", async () => {
    const user = userEvent.setup();
    renderQuestion();
    expect(screen.getByText("seed 100")).toBeInTheDocument();
    await user.type(screen.getByRole("textbox"), "999{Enter}");
    await user.click(screen.getByRole("button", { name: "New variant" }));
    // Provider consumed seeds 100, 101 at start; the next is 102.
    expect(screen.getByText("seed 102")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(screen.getByText(/Variant 2/)).toBeInTheDocument();
  });

  it("exam: shows the correct answer after the final attempt", async () => {
    const user = userEvent.setup();
    renderQuestion(exam);
    await user.type(screen.getByRole("textbox"), "999{Enter}");
    expect(screen.getByText(/Correct answer:/)).toBeInTheDocument();
    expect(screen.getByText(/no attempts left/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "New variant" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
  });

  it("grades multi-part questions with per-part badges and MC feedback", async () => {
    const user = userEvent.setup();
    renderQuestion(exercise, 1);
    const n = (createVariant(twoPartQuestion as never, 101).params as { n: number }).n;
    await user.type(screen.getByRole("textbox"), String(2 * n));
    const group = screen.getByRole("radiogroup");
    await user.click(within(group).getByLabelText("odd"));
    // Enter on a radio submits
    await user.keyboard("{Enter}");
    expect(screen.getByText("Correct")).toBeInTheDocument();
    expect(screen.getByText("Incorrect")).toBeInTheDocument();
    expect(screen.getByText("Any multiple of 2 is even.")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("75%");
  });

  it("persists across remounts via localStorage", async () => {
    const user = userEvent.setup();
    const { unmount } = render(
      <AssessmentProvider assessment={exercise} bank={testBank} nextSeed={seedCounter(100)}>
        <AssessmentView />
      </AssessmentProvider>,
    );
    await user.type(screen.getByRole("textbox"), `${correctSum(100)}{Enter}`);
    unmount();
    render(
      <AssessmentProvider assessment={exercise} bank={testBank} nextSeed={seedCounter(900)}>
        <AssessmentView />
      </AssessmentProvider>,
    );
    expect(screen.getByText("seed 100")).toBeInTheDocument();
    expect(screen.getByText("Correct")).toBeInTheDocument();
    expect(screen.getByText(/Total score:/)).toHaveTextContent("10 / 14");
  });

  it("reset asks for confirmation and starts over", async () => {
    const user = userEvent.setup();
    render(
      <AssessmentProvider assessment={exercise} bank={testBank} nextSeed={seedCounter(100)}>
        <AssessmentView />
      </AssessmentProvider>,
    );
    await user.type(screen.getByRole("textbox"), "999{Enter}");
    await user.click(screen.getByRole("button", { name: "Reset assessment" }));
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.getByText(/Attempts used: 1/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Reset assessment" }));
    await user.click(screen.getByRole("button", { name: "Yes, reset" }));
    expect(screen.getByText(/Attempts used: 0/)).toBeInTheDocument();
    expect(screen.getByText("seed 102")).toBeInTheDocument();
  });
});
