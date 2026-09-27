import { Component, type ReactNode } from "react";
import { getAssessment } from "./assessments";
import { AssessmentProvider } from "./components/AssessmentContext";
import { AssessmentView } from "./components/AssessmentView";
import { useHashRoute } from "./components/useHashRoute";
import { Home } from "./pages/Home";
import { Import } from "./pages/Import";
import { Results } from "./pages/Results";

export function App() {
  const route = useHashRoute();

  let content: ReactNode;
  if (route.page === "home") {
    content = <Home />;
  } else if (route.page === "import") {
    content = <Import />;
  } else if (route.page === "assessment" || route.page === "results") {
    const assessment = getAssessment(route.id);
    content = assessment ? (
      <AssessmentProvider key={assessment.id} assessment={assessment}>
        {route.page === "results" ? <Results /> : <AssessmentView />}
      </AssessmentProvider>
    ) : (
      <NotFound what={`Assessment “${route.id}”`} />
    );
  } else {
    content = <NotFound what="This page" />;
  }

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:rounded focus:bg-white focus:px-3 focus:py-2 dark:focus:bg-slate-900"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        Skip to content
      </a>
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <a href="#/" className="font-semibold tracking-tight">
            Exercise System
          </a>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="mx-auto max-w-4xl px-4 py-6 outline-none">
        <ErrorBoundary key={JSON.stringify(route)}>{content}</ErrorBoundary>
      </main>
    </div>
  );
}

function NotFound({ what }: { what: string }) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">Not found</h1>
      <p>{what} does not exist.</p>
      <a href="#/" className="text-indigo-700 hover:underline dark:text-indigo-300">
        ← All assessments
      </a>
    </div>
  );
}

/** Shows authoring errors (bad question definitions) instead of a blank page. */
class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div role="alert" className="space-y-2 rounded-lg border border-red-300 bg-red-50 p-4 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100">
          <h1 className="text-lg font-semibold">Something went wrong</h1>
          <pre className="overflow-x-auto whitespace-pre-wrap text-sm">{this.state.error.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
