import { createContext, useContext, useEffect, useMemo, useReducer, useRef, useState, type ReactNode } from "react";
import {
  createAssessmentReducer,
  createAssessmentState,
  type AssessmentState,
  type QuestionBank,
} from "../engine/assessment";
import { randomSeed } from "../engine/seed";
import { localPersistence, type Persistence } from "../engine/persistence";
import { hidesGrades, type Assessment, type JsonValue } from "../engine/types";
import { createVariant } from "../engine/variant";
import { getQuestion } from "../questions";

export interface AssessmentActions {
  setValue(index: number, part: string, value: JsonValue): void;
  submit(index: number): void;
  /** Hidden-grades mode: record the answer, graded silently. */
  save(index: number): void;
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
  /** False when the last save failed (progress is in memory only). */
  saved: boolean;
  persistence: Persistence;
  /** Students don't see scores, feedback or correct answers (`gradeButton: false`). */
  hideGrades: boolean;
}

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

interface ProviderProps {
  assessment: Assessment;
  bank?: QuestionBank;
  nextSeed?: () => number;
  /** Must be a stable object (it's an effect dependency). Default: localStorage. */
  persistence?: Persistence;
  children: ReactNode;
}

export function AssessmentProvider({
  assessment,
  bank = getQuestion,
  nextSeed = randomSeed,
  persistence = localPersistence,
  children,
}: ProviderProps) {
  const fresh = () => ({
    ...createAssessmentState(assessment, bank, nextSeed, new Date().toISOString()),
    studentName: persistence.learnerName ?? "",
  });
  const hideGrades = hidesGrades(assessment);
  const reducer = useMemo(() => createAssessmentReducer({ hideGrades }), [hideGrades]);
  const [state, dispatch] = useReducer(reducer, undefined, () => persistence.load(assessment, bank) ?? fresh());
  const [saved, setSaved] = useState(true);

  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    setSaved(persistence.save(state));
  }, [state, persistence]);

  const actions = useMemo<AssessmentActions>(
    () => ({
      setValue: (index, part, value) => dispatch({ type: "setValue", index, part, value }),
      submit: (index) => dispatch({ type: "submit", index, timestamp: new Date().toISOString() }),
      save: (index) => dispatch({ type: "save", index, timestamp: new Date().toISOString() }),
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
        persistence.clear(assessment.id);
        dispatch({ type: "replace", state: fresh() });
      },
    }),
    // `fresh` only closes over these props.
    [assessment, bank, nextSeed, persistence],
  );

  const value = useMemo(
    () => ({ assessment, state, bank, actions, saved, persistence, hideGrades }),
    [assessment, state, bank, actions, saved, persistence, hideGrades],
  );
  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>;
}

export function useAssessment(): AssessmentContextValue {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error("useAssessment must be used inside <AssessmentProvider>");
  return ctx;
}
