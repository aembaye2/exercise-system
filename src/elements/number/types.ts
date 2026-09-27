import type { BasePart } from "../../engine/types";

export type NumberComparison = "relabs" | "sigfig" | "decdig";

export interface NumberPart extends BasePart {
  type: "number";
  correct: number;
  comparison?: NumberComparison; // default "relabs"
  rtol?: number; // default 1e-2
  atol?: number; // default 1e-8
  digits?: number; // for sigfig / decdig, default 2
  showHelpText?: boolean; // default true: explains the accepted format
}

declare module "../../engine/types" {
  interface PartTypeMap {
    number: NumberPart;
  }
}
