import { createContext, useContext, useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from "react";
import {
  assessmentReducer,
  createAssessmentState,
  type AssessmentState,
  type QuestionBank,
} from "../engine/assessment";
import { randomSeed } from "../engine/seed";
import { clearState, loadState, saveState } from "../engine/storage";
import type { Assessment, JsonValue } from "../engine/types";
import { createVariant } from "../engine/variant";
import { getQuestion } from "../questions";

export interface AssessmentActions {
  setValue(index: number, part: string, value: JsonValue): void;
  submit(index: number): void;
  newVariant(index: number): void;
  goTo(index: number): void;
  setStudentName(name: string): void;
  reset(): void;
}

interface AssessmentContextValue {
  assessment: Assessment;
  state: AssessmentState;
  bank: QuestionBank;
  actions: AssessmentActions;
  /** False when the last save to localStorage failed (progress is in memory only). */
  saved: boolean;
}

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

interface ProviderProps {
  assessment: Assessment;
  bank?: QuestionBank;
  nextSeed?: () => number;
  children: ReactNode;
}

export function AssessmentProvider({ assessment, bank = getQuestion, nextSeed = randomSeed, children }: ProviderProps) {
  const fresh = () => createAssessmentState(assessment, bank, nextSeed, new Date().toISOString());
  const [state, dispatch] = useReducer(assessmentReducer, undefined, () => loadState(assessment) ?? fresh());
  const [saved, setSaved] = useState(true);

  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    setSaved(saveState(state));
  }, [state]);

  const actions = useMemo<AssessmentActions>(
    () => ({
      setValue: (index, part, value) => dispatch({ type: "setValue", index, part, value }),
      submit: (index) => dispatch({ type: "submit", index, timestamp: new Date().toISOString() }),
      newVariant: (index) => {
        const q = stateRef.current.questions[index];
        const question = q && bank(q.questionId);
        if (!question) return;
        const seed = nextSeed();
        dispatch({ type: "newVariant", index, seed, preparedParts: createVariant(question, seed).parts });
      },
      goTo: (index) => dispatch({ type: "goTo", index }),
      setStudentName: (name) => dispatch({ type: "setStudentName", name }),
      reset: () => {
        clearState(assessment.id);
        dispatch({ type: "replace", state: fresh() });
      },
    }),
    // `fresh` only closes over these props.
    [assessment, bank, nextSeed],
  );

  const value = useMemo(() => ({ assessment, state, bank, actions, saved }), [assessment, state, bank, actions, saved]);
  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>;
}

export function useAssessment(): AssessmentContextValue {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error("useAssessment must be used inside <AssessmentProvider>");
  return ctx;
}
