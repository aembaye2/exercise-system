import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface MarkdownProps {
  children: string;
  /** Render inline (no wrapping <p>), e.g. for option labels or part labels. */
  inline?: boolean;
  className?: string;
}

const inlineComponents = {
  p: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
};

const blockComponents = {
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto">
      <table>{children}</table>
    </div>
  ),
};

export function Markdown({ children, inline = false, className }: MarkdownProps) {
  const content = (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={inline ? inlineComponents : blockComponents}
    >
      {children}
    </ReactMarkdown>
  );
  return inline ? (
    <span className={`markdown ${className ?? ""}`}>{content}</span>
  ) : (
    <div className={`markdown ${className ?? ""}`}>{content}</div>
  );
}
