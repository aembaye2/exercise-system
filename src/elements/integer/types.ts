import type { BasePart } from "../../engine/types";

export interface IntegerPart extends BasePart {
  type: "integer";
  correct: number; // must be an integer; authoring error otherwise
}

declare module "../../engine/types" {
  interface PartTypeMap {
    integer: IntegerPart;
  }
}
