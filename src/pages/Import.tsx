import { useState, type ChangeEvent } from "react";
import { ImportError, parseExport, type ResultsExport } from "../engine/storage";
import type { QuestionBank } from "../engine/assessment";
import { ReviewView } from "../components/ReviewView";
import { Card } from "../components/ui";
import { getQuestion } from "../questions";

export function Import({ bank = getQuestion }: { bank?: QuestionBank }) {
  const [data, setData] = useState<ResultsExport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setData(parseExport(await file.text()));
      setError(null);
    } catch (err) {
      setData(null);
      setError(err instanceof ImportError ? err.message : "Could not read this file.");
    }
  };

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <a href="#/" className="text-sm text-indigo-700 hover:underline dark:text-indigo-300">
          ← All assessments
        </a>
        <h1 className="text-2xl font-bold">Review exported results</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Load a student’s results file. Each variant is rebuilt from its seed and every submission is regraded.
        </p>
      </header>

      <Card>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Results file (.json)
          <input
            type="file"
            accept="application/json,.json"
            onChange={onFile}
            aria-describedby="import-error"
            className="text-sm file:mr-3 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-1.5 file:text-white hover:file:bg-indigo-700"
          />
        </label>
        <p id="import-error" role="alert" className="text-sm text-red-700 [&:not(:empty)]:mt-2 dark:text-red-300">
          {error}
        </p>
      </Card>

      {data && <ReviewView data={data} bank={bank} />}
    </div>
  );
}
