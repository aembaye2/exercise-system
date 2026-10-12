import { useMemo, useState } from "react";
import { AssessmentProvider } from "../components/AssessmentContext";
import { AssessmentView } from "../components/AssessmentView";
import { Import } from "../pages/Import";
import { Results } from "../pages/Results";
import type { QuestionBank } from "../engine/assessment";
import type { Persistence } from "../engine/persistence";
import type { AnyQuestion, Assessment } from "../engine/types";

export function questionBank(questions: AnyQuestion[]): QuestionBank {
  const byId = new Map(questions.map((q) => [q.id, q]));
  return (id) => byId.get(id);
}

export interface QuizWidgetProps {
  assessment: Assessment;
  questions: AnyQuestion[];
  /** Teacher view: load a student's results file, review it and grade hand-graded answers. */
  review?: boolean;
  /** Where progress is kept (default: this browser's localStorage). Must be a stable object. */
  persistence?: Persistence;
}

/**
 * A single self-contained assessment: no hash routing, no dependency on
 * `window.location`, so it's safe to embed in a page that has its own
 * navigation and anchors (e.g. a Quarto document).
 */
export function QuizWidget({ assessment, questions, review, persistence }: QuizWidgetProps) {
  const bank = useMemo(() => questionBank(questions), [questions]);
  const [showResults, setShowResults] = useState(false);

  if (review) return <Import bank={bank} showBackLink={false} />;

  return (
    <AssessmentProvider assessment={assessment} bank={bank} persistence={persistence}>
      {showResults ? (
        <Results onBack={() => setShowResults(false)} />
      ) : (
        <AssessmentView onShowResults={() => setShowResults(true)} />
      )}
    </AssessmentProvider>
  );
}
