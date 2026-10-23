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
  it("submits a wrong answer, then a correct one on a new variant, showing feedback and score", async () => {
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
    await user.click(screen.getByRole("button", { name: "Grade" }));
    expect(screen.getByText("Incorrect")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Submission score: 0%");
    expect(screen.getByText(/Attempts used: 1/)).toBeInTheDocument();
    // The graded variant is locked and shows its correct answer; retrying takes a new variant.
    expect(screen.getByText(/Correct answer:/)).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(/Press New variant to try again/);
    expect(input).toBeDisabled();
    expect(screen.getByRole("button", { name: "Grade" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "New variant" }));

    // Correct answer on the new variant (seed 102: the provider used 100 and 101 at start).
    const fresh = screen.getByRole("textbox", { name: "Sum:" });
    await user.type(fresh, `${correctSum(102)}{Enter}`);
    expect(screen.getByText("Correct")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Submission score: 100%");
    expect(screen.getByText(/Best score: 100%/)).toBeInTheDocument();
    expect(screen.getByText("10 / 10 points")).toBeInTheDocument();
    expect(screen.getByText(/Correct answer:/)).toBeInTheDocument();
    expect(fresh).toBeDisabled();
    expect(screen.getByRole("button", { name: "Grade" })).toBeDisabled();
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
    expect(screen.getByRole("button", { name: "Grade" })).toBeDisabled();
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

  it("resetButton: false hides the Reset button", () => {
    render(
      <AssessmentProvider assessment={{ ...exercise, resetButton: false }} bank={testBank} nextSeed={seedCounter(100)}>
        <AssessmentView />
      </AssessmentProvider>,
    );
    expect(screen.queryByRole("button", { name: "Reset assessment" })).toBeNull();
    expect(screen.getByRole("link", { name: "Results" })).toBeInTheDocument();
  });
});

describe("hidden grades: Next saves", () => {
  const hidden = { ...exam, gradeButton: false };
  function renderHidden() {
    render(
      <AssessmentProvider assessment={hidden} bank={testBank} nextSeed={seedCounter(100)}>
        <AssessmentView />
      </AssessmentProvider>,
    );
  }

  it("has no Grade or Save button; Enter saves without any score, feedback or lock", async () => {
    const user = userEvent.setup();
    renderQuestion(hidden);
    expect(screen.queryByRole("button", { name: "Grade" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Save" })).toBeNull();
    expect(screen.getByText("10 points")).toBeInTheDocument();
    const input = screen.getByRole("textbox", { name: "Sum:" });

    await user.type(input, "999{Enter}");
    expect(screen.getByRole("status")).toHaveTextContent(/Answer saved/);
    expect(screen.queryByText("Incorrect")).toBeNull();
    expect(screen.queryByText(/Correct answer:/)).toBeNull();
    expect(screen.queryByText(/Attempts used/)).toBeNull();

    await user.clear(input);
    await user.type(input, String(correctSum(100)));
    expect(screen.getByRole("status")).toHaveTextContent(/unsaved changes/);
    expect(screen.queryByText("Correct")).toBeNull();
    expect(input).toBeEnabled();
  });

  it("Save & next saves the answer and moves on", async () => {
    const user = userEvent.setup();
    renderHidden();
    await user.type(screen.getByRole("textbox", { name: "Sum:" }), "999");
    await user.click(screen.getByRole("button", { name: "Save & next →" }));
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByRole("button", { name: /^Question 1: .*, saved/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^Question 2\./ })).toBeInTheDocument();
  });

  it("warns once when the question isn't answered; a second press skips it unsaved", async () => {
    const user = userEvent.setup();
    renderHidden();
    await user.click(screen.getByRole("button", { name: "Save & next →" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/haven't answered this question/);
    expect(screen.getByRole("heading", { name: /^Question 1\./ })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Save & next →" }));
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByRole("heading", { name: /^Question 2\./ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Question 1: .*, not started/ })).toBeInTheDocument();
  });

  it("Previous and the question buttons save a complete answer without warning", async () => {
    const user = userEvent.setup();
    renderHidden();
    await user.type(screen.getByRole("textbox", { name: "Sum:" }), "999");
    await user.click(screen.getByRole("button", { name: /^Question 2:/ }));
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByRole("button", { name: /^Question 1: .*, saved/ })).toBeInTheDocument();
  });
});
