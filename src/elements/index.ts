// Registers every element type with the engine. To add a new element type,
// create its folder under src/elements/ and register it here.
import { registerElement } from "../engine/registry";
import { drawingElement } from "./drawing";
import { integerElement } from "./integer";
import { multipleChoiceElement } from "./multipleChoice";
import { numberElement } from "./number";
import { tableElement } from "./table";

registerElement<"multiple-choice">(multipleChoiceElement);
registerElement<"number">(numberElement);
registerElement<"integer">(integerElement);
registerElement<"drawing">(drawingElement);
registerElement<"table">(tableElement);
