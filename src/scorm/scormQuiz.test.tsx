import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AssessmentProvider } from "../components/AssessmentContext";
import { AssessmentView } from "../components/AssessmentView";
import { exam, seedCounter, testBank } from "../test/fixtures";
import type { Assessment } from "../engine/types";
import { fakeLms } from "./fakeLms";
import { connectScorm } from "./scormPersistence";

function renderQuiz(data: Record<string, string>, assessment: Assessment = exam) {
  const lms = fakeLms(data);
  const scorm = connectScorm(lms.api, testBank, { hideGrades: assessment.gradeButton === false })!;
  const utils = render(
    <AssessmentProvider assessment={assessment} bank={testBank} nextSeed={seedCounter(100)} persistence={scorm}>
      <AssessmentView />
    </AssessmentProvider>,
  );
  return { lms, ...utils };
}

describe("quiz running inside an LMS", () => {
  it("hides Reset, reports a submission, and restores the answer on the next launch", async () => {
    const user = userEvent.setup();
    const { lms, unmount } = renderQuiz({ "cmi.learner_name": "Doe, Jane" });
    expect(screen.queryByRole("button", { name: "Reset assessment" })).toBeNull();

    await user.type(screen.getByRole("textbox", { name: "Sum:" }), "999");
    await user.click(screen.getByRole("button", { name: "Grade" }));
    expect(lms.data["cmi.interactions.0.learner_response"]).toBe("999");
    expect(lms.data["cmi.interactions.0.result"]).toBe("incorrect");
    expect(lms.data["cmi.score.raw"]).toBe("0");
    expect(lms.calls).toContain("Commit");
    unmount();

    renderQuiz(lms.data);
    expect(screen.getByRole("textbox", { name: "Sum:" })).toHaveValue("999");
    expect(screen.getByText(/Attempts used: 1/)).toBeInTheDocument();
  });
});

describe("quiz with hidden grades inside an LMS", () => {
  it("reports the saved answers' score to the LMS without showing it", async () => {
    const user = userEvent.setup();
    const { lms } = renderQuiz({}, { ...exam, gradeButton: false });
    await user.type(screen.getByRole("textbox", { name: "Sum:" }), "999");
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(lms.data["cmi.interactions.0.result"]).toBe("incorrect");
    expect(lms.data["cmi.score.raw"]).toBe("0");
    expect(lms.data["cmi.progress_measure"]).toBe("0.5");
    expect(screen.queryByText(/Total score/)).toBeNull();
    expect(screen.getByRole("textbox", { name: "Sum:" })).toBeEnabled();
  });
});
