import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TrueFalseInput } from "./TrueFalseInput";
import type { TrueFalsePart } from "./types";

const part: TrueFalsePart = {
  type: "true-false",
  name: "tf",
  statements: [
    { text: "Some bacteria conduct photosynthesis and produce oxygen.", correct: true },
    { text: "Bacteria are always autotrophic.", correct: false },
    { text: "Some bacteria live symbiotically inside host organisms.", correct: true },
  ],
};

function setup(props: { value?: (boolean | null)[]; disabled?: boolean; invalid?: boolean; showCorrect?: boolean } = {}) {
  const onChange = vi.fn();
  render(
    <>
      <span id="lbl">Which statements are true?</span>
      <TrueFalseInput
        part={part}
        id="q-tf"
        labelId="lbl"
        value={props.value as never}
        onChange={onChange}
        disabled={props.disabled}
        invalid={props.invalid}
        showCorrect={props.showCorrect}
      />
    </>,
  );
  return onChange;
}

describe("TrueFalseInput", () => {
  it("renders one row per statement with True/False radios", () => {
    setup();
    expect(screen.getByText(/Some bacteria conduct photosynthesis/)).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(6);
  });

  it("reports the new answers array when a radio is picked", async () => {
    const onChange = setup({ value: [true, null, null] });
    await userEvent.click(screen.getByRole("radio", { name: "Statement 2: False" }));
    expect(onChange).toHaveBeenCalledWith([true, false, null]);
  });

  it("keeps each statement's True/False as an independent radio group", async () => {
    const onChange = setup({ value: [true, false, true] });
    await userEvent.click(screen.getByRole("radio", { name: "Statement 1: False" }));
    expect(onChange).toHaveBeenCalledWith([false, false, true]);
  });

  it("marks correct and incorrect answers once the answer is shown", () => {
    setup({ value: [true, true, true], showCorrect: true });
    // Statement 2's correct answer is False but the student picked True.
    expect(screen.getByText(/Correct: False/)).toBeInTheDocument();
  });
});
