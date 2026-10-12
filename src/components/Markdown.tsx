import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface MarkdownProps {
  children: string;
  /** Render inline (no wrapping <p>), e.g. for option labels or part labels. */
  inline?: boolean;
  className?: string;
  /** Every Enter starts a new line, as typed (for student text); by default Markdown joins single line breaks. */
  breaks?: boolean;
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

const plugins = [remarkGfm, remarkMath];
const pluginsWithBreaks = [remarkGfm, remarkMath, remarkBreaks];

export function Markdown({ children, inline = false, className, breaks = false }: MarkdownProps) {
  const content = (
    <ReactMarkdown
      remarkPlugins={breaks ? pluginsWithBreaks : plugins}
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
