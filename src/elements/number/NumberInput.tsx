import type { ElementInputProps } from "../../engine/registry";
import { TextInput } from "../TextInput";
import type { NumberPart } from "./types";

export function NumberInput(props: ElementInputProps<NumberPart>) {
  return <TextInput {...props} inputMode="decimal" placeholder="number" />;
}
