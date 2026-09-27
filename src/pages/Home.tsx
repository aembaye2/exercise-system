import { totals } from "../engine/assessment";
import { loadState } from "../engine/storage";
import { assessments } from "../assessments";
import { Card, ModeBadge, formatPoints } from "../components/ui";

export function Home() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Assessments</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Pick an assessment to start. Your progress is saved in this browser. If you are using a different browser or device, your progress will not be available.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {assessments.map((a) => {
          const saved = loadState(a);
          const progress = saved ? totals(saved) : null;
          return (
            <li key={a.id}>
              <Card className="flex h-full flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold">{a.title}</h2>
                  <ModeBadge mode={a.mode} />
                </div>
                {a.description && <p className="text-sm text-slate-600 dark:text-slate-400">{a.description}</p>}
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {a.questions.length} questions · {a.questions.reduce((s, q) => s + q.points, 0)} points
                  {progress && (
                    <>
                      {" "}
                      · <span className="font-medium text-slate-800 dark:text-slate-200">
                        score so far {formatPoints(progress.earned)} / {progress.possible}
                      </span>
                    </>
                  )}
                </p>
                <a
                  href={`#/assessment/${a.id}`}
                  className="mt-auto inline-flex w-fit items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                >
                  {progress ? "Continue" : "Start"}
                  <span className="sr-only"> {a.title}</span>
                </a>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
