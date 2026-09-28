import { useState } from "react";
import { MousePointer2, Dot, Minus, MoveDiagonal, MoveUpRight, Square, Circle, Pentagon, Type, Palette, LocateFixed, Spline, ChartNoAxesCombined } from "lucide-react";
import type { ToolName } from "../types";
export type ActionName="undo"|"redo"|"clear";
export const COLORS=["#111827","#dc2626","#2563eb","#16a34a","#7c3aed","#ea580c"];
const Segment=()=> <svg viewBox="0 0 24 24"><line x1="5" y1="19" x2="19" y2="5"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="5" r="2"/></svg>;
const tools:{name:ToolName;label:string;icon:React.ReactNode}[]=[
  {name:"select",label:"Select",icon:<MousePointer2/>},{name:"segment",label:"Segment",icon:<Segment/>},{name:"point",label:"Point",icon:<Dot/>},{name:"line",label:"Line",icon:<Minus/>},{name:"arrow",label:"Arrow",icon:<MoveUpRight/>},{name:"doubleArrow",label:"Double Arrow",icon:<MoveDiagonal/>},{name:"rectangle",label:"Rectangle",icon:<Square/>},{name:"circle",label:"Circle",icon:<Circle/>},{name:"polygon",label:"Polygon",icon:<Pentagon/>},{name:"scatter",label:"Connected Scatter",icon:<ChartNoAxesCombined/>},{name:"curve",label:"4-Point Curve",icon:<Spline/>},{name:"text",label:"Text",icon:<Type/>},{name:"coordinate",label:"Coordinate",icon:<LocateFixed/>}
];
interface Props{activeTool:ToolName;onToolChange(t:ToolName):void;color:string;onColorChange(c:string):void;enabledTools?:ToolName[];colors?:string[];showColorPicker?:boolean;}
export default function DrawingToolbar({activeTool,onToolChange,color,onColorChange,enabledTools,colors=COLORS,showColorPicker=true}:Props){
  const [open,setOpen]=useState(false),shown=enabledTools?tools.filter(t=>enabledTools.includes(t.name)):tools;
  return <aside className="toolbar"><div className="tools-grid">{shown.map(t=><div className="tool-wrapper" key={t.name}><button type="button" className={`tool-button ${activeTool===t.name?"tool-button-active":""}`} onClick={()=>onToolChange(t.name)} aria-label={t.label}>{t.icon}</button><span className="tool-tooltip">{t.label}</span></div>)}</div>
    {showColorPicker&&<><div className="toolbar-divider"/><div className="tool-wrapper"><button type="button" className="color-picker-trigger" onClick={()=>setOpen(v=>!v)} aria-label="Choose color"><Palette style={{color}}/></button>{open&&<div className="color-picker-popover"><input type="color" value={color} onChange={e=>onColorChange(e.target.value)}/><div className="color-swatch-row">{colors.map(c=><button key={c} className={`color-swatch ${c===color?"selected-color":""}`} style={{background:c}} onClick={()=>{onColorChange(c);setOpen(false)}} aria-label={`Select ${c}`}/>)}</div></div>}</div></>}
  </aside>;
}
