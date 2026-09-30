import type { BasePart } from "../../engine/types";
import type { DrawingQuestionProps, ExpectedShape, UserDrawing } from "../../components/svgDrawingComponent";

/**
 * Props for the drawing component (`DrawingQuestionProps` in
 * `src/components/svgDrawingComponent`), as plain JSON. `expectedDrawing` is
 * required here: the exercise app grades the student's drawing against it when
 * they submit.
 */
export interface SvgDrawingProps extends DrawingQuestionProps {
  expectedDrawing: ExpectedShape[];
}

export interface SvgDrawingPart extends BasePart {
  type: "svgDrawing";
  props: SvgDrawingProps;
}

/** The submitted value: every shape the student drew, in drawing order. */
export type SvgDrawingValue = UserDrawing[];

declare module "../../engine/types" {
  interface PartTypeMap {
    svgDrawing: SvgDrawingPart;
  }
}
