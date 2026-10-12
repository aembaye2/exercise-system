import { useMemo, useState } from "react";
import { AssessmentProvider } from "../components/AssessmentContext";
import { AssessmentView } from "../components/AssessmentView";
import { Import } from "../pages/Import";
import { Results } from "../pages/Results";
import type { AnyQuestion, Assessment } from "../engine/types";

export interface QuizWidgetProps {
  assessment: Assessment;
  questions: AnyQuestion[];
  /** Teacher view: load a student's results file, review it and grade hand-graded answers. */
  review?: boolean;
}

/**
 * A single self-contained assessment: no hash routing, no dependency on
 * `window.location`, so it's safe to embed in a page that has its own
 * navigation and anchors (e.g. a Quarto document).
 */
export function QuizWidget({ assessment, questions, review }: QuizWidgetProps) {
  const bank = useMemo(() => {
    const byId = new Map(questions.map((q) => [q.id, q]));
    return (id: string) => byId.get(id);
  }, [questions]);
  const [showResults, setShowResults] = useState(false);

  if (review) return <Import bank={bank} showBackLink={false} />;

  return (
    <AssessmentProvider assessment={assessment} bank={bank}>
      {showResults ? (
        <Results onBack={() => setShowResults(false)} />
      ) : (
        <AssessmentView onShowResults={() => setShowResults(true)} />
      )}
    </AssessmentProvider>
  );
}
