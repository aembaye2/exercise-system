export type ToolName = "select" | "point" | "line" | "arrow" | "doubleArrow" | "segment" | "rectangle" | "circle" | "polygon" | "scatter" | "curve" | "text" | "coordinate" | "eraser";
export type Point2D = [number, number];
export type BoundingBox = [xMin: number, xMax: number, yMin: number, yMax: number];
export interface InitialObjectSpec {
  type: Exclude<ToolName, "select" | "eraser" | "coordinate">;
  points: Point2D[];
  radius?: number;
  text?: string;
  closed?: boolean;
  color?: string;
}
export interface UserDrawing { tool: ToolName; points: Point2D[]; color: string; text?: string; radius?: number; closed?: boolean; }
export interface DrawingBoardHandle {
  undo(): void; redo(): void; clear(): void; getUserDrawings(): UserDrawing[]; downloadImage(filename?: string): Promise<void>;
}
