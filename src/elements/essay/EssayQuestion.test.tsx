import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AssessmentProvider } from "../../components/AssessmentContext";
import { QuestionView } from "../../components/QuestionView";
import type { Assessment, Question } from "../../engine/types";
import { seedCounter } from "../../test/fixtures";

const essay: Question<Record<string, never>> = {
  id: "essay",
  title: "Price ceiling",
  generate: () => ({}),
  render: () => "Explain what a binding price ceiling does.",
  parts: () => [{ type: "essay", name: "why", label: "Your answer:", maxWords: 10, modelAnswer: "It causes a **shortage**." }],
};
const bank = (id: string) => (id === "essay" ? (essay as Question<unknown>) : undefined);
const hw: Assessment = { id: "essay-hw", title: "HW", mode: "exercise", questions: [{ questionId: "essay", points: 10 }] };

describe("essay question (student flow)", () => {
  it("rejects an over-limit answer, then submits once and shows the model answer while the grade is pending", async () => {
    const user = userEvent.setup();
    render(
      <AssessmentProvider assessment={hw} bank={bank} nextSeed={seedCounter()}>
        <QuestionView index={0} />
      </AssessmentProvider>,
    );
    const box = screen.getByRole("textbox", { name: "Your answer:" });

    await user.type(box, "one two three four five six seven eight nine ten eleven");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(screen.getByText(/11 words \(limit 10\)/)).toBeInTheDocument();
    expect(screen.getByText(/Attempts used: 0/)).toBeInTheDocument();
    expect(screen.queryByText("Model answer")).toBeNull();

    await user.clear(box);
    await user.type(box, "Quantity demanded exceeds $Q_s$.");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByRole("status")).toHaveTextContent("Submitted. Your teacher will grade this answer later.");
    expect(screen.getByText(/Awaiting teacher's grade/)).toBeInTheDocument();
    expect(screen.getByText("Model answer")).toBeInTheDocument();
    expect(screen.getByText("shortage")).toBeInTheDocument();
    expect(box).toBeDisabled();
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
    expect(screen.queryByRole("button", { name: "New variant" })).toBeNull();
  });
});
