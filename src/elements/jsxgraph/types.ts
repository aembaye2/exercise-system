import type { BasePart } from "../../engine/types";
import type { DrawingQuestionProps, ExpectedShape, UserDrawing } from "../../components/jsxgraphComponent";

/**
 * Props for the drawing component (`DrawingQuestionProps` in
 * `src/components/jsxgraphComponent`), as plain JSON. `expectedDrawing` is
 * required here: the exercise app grades the student's drawing against it when
 * they submit.
 */
export interface JsxGraphProps extends DrawingQuestionProps {
  expectedDrawing: ExpectedShape[];
}

export interface JsxGraphPart extends BasePart {
  type: "jsxgraph";
  props: JsxGraphProps;
}

/** The submitted value: every shape the student drew, in drawing order. */
export type JsxGraphValue = UserDrawing[];

declare module "../../engine/types" {
  interface PartTypeMap {
    jsxgraph: JsxGraphPart;
  }
}
