// Registers every element type with the engine. To add a new element type,
// create its folder under src/elements/ and register it here.
import { registerElement } from "../engine/registry";
import { integerElement } from "./integer";
import { jsxGraphElement } from "./jsxgraph";
import { multipleChoiceElement } from "./multipleChoice";
import { numberElement } from "./number";
import { svgDrawingElement } from "./svgDrawing";
import { tableElement } from "./table";

registerElement<"multiple-choice">(multipleChoiceElement);
registerElement<"number">(numberElement);
registerElement<"integer">(integerElement);
registerElement<"table">(tableElement);
registerElement<"jsxgraph">(jsxGraphElement);
registerElement<"svgDrawing">(svgDrawingElement);
