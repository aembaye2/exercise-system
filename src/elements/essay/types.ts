import type { BasePart } from "../../engine/types";

export interface EssayPart extends BasePart {
  type: "essay";
  /**
   * Shown to the student once they submit (Markdown + KaTeX), as feedback on what
   * a good answer covers. The score itself comes later, from the teacher.
   */
  modelAnswer: string;
  /** Upper limit on words; over it the answer is invalid (no attempt used). */
  maxWords?: number;
  /** Upper limit on characters (spaces included). */
  maxChars?: number;
  /** Lower limit on words. */
  minWords?: number;
  /** Height of the text box in lines. Default 8. */
  rows?: number;
  showHelpText?: boolean; // default true
}

/** The submitted value: the essay exactly as typed. */
export type EssayValue = string;

declare module "../../engine/types" {
  interface PartTypeMap {
    essay: EssayPart;
  }
}
