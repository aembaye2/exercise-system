import type { ElementInputProps } from "../../engine/registry";
import { TextInput } from "../TextInput";
import type { IntegerPart } from "./types";

export function IntegerInput(props: ElementInputProps<IntegerPart>) {
  return <TextInput {...props} inputMode="numeric" placeholder="integer" />;
}
