import { useEffect, useMemo, useRef, useState } from "react";
import type { ElementInputProps } from "../../engine/registry";
import type { JsonValue } from "../../engine/types";
import { DrawingApp } from "../../components/svgDrawingComponent";
import type { UserDrawing } from "../../components/svgDrawingComponent";
import { readDrawings } from "./gradeSvgDrawing";
import type { SvgDrawingPart } from "./types";

/**
 * Hosts the drawing component. The value of the part is the student's drawing,
 * kept up to date on every change; it is graded by the exercise app when the
 * question is submitted (the component has no grade button of its own).
 *
 * The board draws for itself, so it only needs rebuilding when the value is
 * changed from outside (a new variant, saved progress being loaded).
 */
export function SvgDrawingInput({ part, id, labelId, describedBy, value, onChange, disabled, invalid, showCorrect }: ElementInputProps<SvgDrawingPart>) {
  const drawings = readDrawings(value);
  const json = JSON.stringify(drawings);
  // What the board currently holds, as JSON.
  const onBoard = useRef(json);
  const [epoch, setEpoch] = useState(0);

  useEffect(() => {
    if (json !== onBoard.current) {
      onBoard.current = json;
      setEpoch((e) => e + 1);
    }
  }, [json]);

  const propsJson = JSON.stringify(part.props);
  const props = useMemo(() => JSON.parse(propsJson) as SvgDrawingPart["props"], [propsJson]);
  // The board reads these only when it is built, which `key` triggers below.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialDrawings = useMemo(() => drawings, [epoch, propsJson]);

  const latest = useRef({ onChange, disabled });
  latest.current = { onChange, disabled };

  const handleChange = (next: UserDrawing[]) => {
    const nextJson = JSON.stringify(next);
    if (nextJson === onBoard.current || latest.current.disabled) return;
    onBoard.current = nextJson;
    latest.current.onChange(next as unknown as JsonValue);
  };

  return (
    <div id={id} aria-labelledby={labelId} aria-describedby={describedBy} className="basis-full">
      <div className={`overflow-x-auto rounded-lg ${invalid ? "ring-2 ring-red-500" : ""}`}>
        <DrawingApp
          key={`${id}|${epoch}|${propsJson}`}
          {...props}
          initialDrawings={initialDrawings}
          onDrawingsChange={handleChange}
          readOnly={disabled}
          showAnswer={showCorrect}
        />
      </div>
    </div>
  );
}
