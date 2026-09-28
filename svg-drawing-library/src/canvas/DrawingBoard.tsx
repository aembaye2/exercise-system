import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import type { BoundingBox, DrawingBoardHandle, InitialObjectSpec, Point2D, ToolName, UserDrawing } from "../types";

interface Props { boundingBox?: BoundingBox; xLabel?: string; yLabel?: string; initialObjects?: InitialObjectSpec[]; activeTool: ToolName; color: string; showNavigation?: boolean; toolActivationSeq?: number; onHistoryChange?(s: {canUndo:boolean;canRedo:boolean}): void; onDrawingsChange?(): void; overlayObjects?: InitialObjectSpec[]; overlayColor?: string; }
interface Draft { tool: ToolName; points: Point2D[]; color: string; closed?: boolean; }
const CLICK_PX = 12;
const round = (n:number) => Math.round(n * 100) / 100;
const d = (a:Point2D,b:Point2D) => Math.hypot(a[0]-b[0],a[1]-b[1]);

function curvePath(points:Point2D[]) {
  if (points.length < 2) return "";
  if (points.length === 2) return `M ${points[0].join(" ")} L ${points[1].join(" ")}`;
  let out = `M ${points[0].join(" ")}`;
  for (let i=0;i<points.length-1;i++) {
    const p0=points[Math.max(0,i-1)],p1=points[i],p2=points[i+1],p3=points[Math.min(points.length-1,i+2)];
    out += ` C ${p1[0]+(p2[0]-p0[0])/6} ${p1[1]+(p2[1]-p0[1])/6}, ${p2[0]-(p3[0]-p1[0])/6} ${p2[1]-(p3[1]-p1[1])/6}, ${p2.join(" ")}`;
  }
  return out;
}

function Shape({spec,index,interactive=false,dashed=false,onDown}:{spec:InitialObjectSpec|UserDrawing;index?:number;interactive?:boolean;dashed?:boolean;onDown?:(e:React.PointerEvent)=>void}) {
  const type = "tool" in spec ? spec.tool : spec.type, p=spec.points, color=spec.color ?? "#111827";
  const common={stroke:color,strokeWidth:2,vectorEffect:"non-scaling-stroke" as const,fill:"none",strokeDasharray:dashed?"7 5":undefined};
  const hit={onPointerDown:onDown,"data-shape-index":index,style:{cursor:interactive?"pointer":"default"}};
  const dots = (visible=true) => p.map((q,i)=><circle key={i} cx={q[0]} cy={q[1]} r={visible?.12:.001} fill={color} stroke="white" strokeWidth={.03} vectorEffect="non-scaling-stroke"/>);
  let body:React.ReactNode=null;
  if (type==="point") body=<circle cx={p[0]?.[0]} cy={p[0]?.[1]} r={.08} fill={color}/>;
  else if (type==="text") body=<text transform={`translate(${p[0]?.[0]} ${p[0]?.[1]}) scale(1 -1)`} fill={color} stroke="none" fontSize={.42} style={{userSelect:"none"}}>{spec.text ?? "Text"}</text>;
  else if (type==="coordinate") body=<>{<line x1={p[0][0]} y1={0} x2={p[0][0]} y2={p[0][1]} {...common} strokeDasharray="5 4"/>}<line x1={0} y1={p[0][1]} x2={p[0][0]} y2={p[0][1]} {...common} strokeDasharray="5 4"/><circle cx={p[0][0]} cy={p[0][1]} r={.09} fill={color}/><text transform={`translate(${p[0][0]+.2} ${p[0][1]+.35}) scale(1 -1)`} fill={color} stroke="none" fontSize={.34}>({round(p[0][0])}, {round(p[0][1])})</text></>;
  else if (type==="circle") { const r=spec.radius ?? d(p[0],p[1]??p[0]); body=<><circle cx={p[0][0]} cy={p[0][1]} r={r} {...common} fill={color} fillOpacity={.12}/>{dots()}</>; }
  else if (type==="rectangle") { const a=p[0],b=p[1]; body=<><rect x={Math.min(a[0],b[0])} y={Math.min(a[1],b[1])} width={Math.abs(a[0]-b[0])} height={Math.abs(a[1]-b[1])} {...common} fill={color} fillOpacity={.12}/>{dots()}</>; }
  else if (type==="polygon") body=<><polygon points={p.map(x=>x.join(",")).join(" ")} {...common} fill={color} fillOpacity={.12}/>{dots()}</>;
  else if (type==="scatter") body=<><polyline points={(spec.closed?[...p,p[0]]:p).map(x=>x.join(",")).join(" ")} {...common} fill="none"/>{dots()}</>;
  else if (type==="curve") body=<><path d={curvePath(p)} {...common}/>{dots()}</>;
  else if (["line","segment","arrow","doubleArrow"].includes(type) && p.length>1) {
    const markers=type==="arrow"?{markerEnd:"url(#arrow)"}:type==="doubleArrow"?{markerStart:"url(#arrow-start)",markerEnd:"url(#arrow)"}:{};
    const a=type==="line"?[p[0][0]-(p[1][0]-p[0][0])*1000,p[0][1]-(p[1][1]-p[0][1])*1000] as Point2D:p[0],b=type==="line"?[p[1][0]+(p[1][0]-p[0][0])*1000,p[1][1]+(p[1][1]-p[0][1])*1000] as Point2D:p[1];
    body=<><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} {...common} {...markers}/>{dots(type==="line"||type==="segment")}</>;
  }
  return <g {...hit} className="svg-shape">{body}{interactive&&<g className="shape-hit" stroke="transparent" strokeWidth={14} vectorEffect="non-scaling-stroke" fill="transparent">{body}</g>}</g>;
}

const DrawingBoard=forwardRef<DrawingBoardHandle,Props>(function DrawingBoard({boundingBox=[-10,10,-10,10],xLabel="x",yLabel="y",initialObjects=[],activeTool,color,showNavigation=false,toolActivationSeq=0,onHistoryChange,onDrawingsChange,overlayObjects=[],overlayColor="#16a34a"},ref){
  const svgRef=useRef<SVGSVGElement>(null), inputRef=useRef<HTMLInputElement>(null), startRef=useRef<Point2D|null>(null), dragRef=useRef<{index:number;last:Point2D}|null>(null), panRef=useRef<{client:Point2D;box:BoundingBox}|null>(null),textClosingRef=useRef(false);
  const [history,setHistory]=useState<UserDrawing[]>([]),[redo,setRedo]=useState<UserDrawing[]>([]),[draft,setDraft]=useState<Draft|null>(null),[hover,setHover]=useState<Point2D|null>(null),[hint,setHint]=useState<string|null>(null),[textAt,setTextAt]=useState<Point2D|null>(null),[textValue,setTextValue]=useState("");
  const [view,setView]=useState<BoundingBox>(boundingBox);
  const [xMin,xMax,yMin,yMax]=view, vw=xMax-xMin,vh=yMax-yMin;
  const padX=vw*.04,padY=vh*.04,displayXMin=xMin-padX,displayXMax=xMax+padX,displayYMin=yMin-padY,displayYMax=yMax+padY,displayW=displayXMax-displayXMin,displayH=displayYMax-displayYMin;
  const latest=useRef(history); latest.current=history;
  const historyCallback=useRef(onHistoryChange),drawingsCallback=useRef(onDrawingsChange);historyCallback.current=onHistoryChange;drawingsCallback.current=onDrawingsChange;
  useEffect(()=>{historyCallback.current?.({canUndo:history.length>0,canRedo:redo.length>0});drawingsCallback.current?.();},[history,redo]);
  useEffect(()=>{setDraft(null);setHint(null);setTextAt(null);startRef.current=null;},[activeTool,toolActivationSeq]);
  useEffect(()=>{if(textAt)inputRef.current?.focus();},[textAt]);
  useEffect(()=>setView(boundingBox),[boundingBox.join(",")]);
  const coords=(e:React.PointerEvent|PointerEvent):Point2D=>{const r=svgRef.current!.getBoundingClientRect();return [displayXMin+(e.clientX-r.left)/r.width*displayW,displayYMax-(e.clientY-r.top)/r.height*displayH];};
  const pxDist=(a:Point2D,b:Point2D)=>Math.hypot((a[0]-b[0])/displayW*(svgRef.current?.clientWidth||1),(a[1]-b[1])/displayH*(svgRef.current?.clientHeight||1));
  const commit=useCallback((shape:UserDrawing)=>{setHistory(h=>[...h,shape]);setRedo([]);setDraft(null);setHint(null);startRef.current=null;},[]);
  const undo=()=>setHistory(h=>{if(!h.length)return h;setRedo(r=>[h[h.length-1],...r]);return h.slice(0,-1)});
  const redoOne=()=>setRedo(r=>{if(!r.length)return r;setHistory(h=>[...h,r[0]]);return r.slice(1)});
  const clear=()=>setHistory(h=>{if(h.length)setRedo([...h]);return []});
  const downloadImage=async(filename="drawing.png")=>{
    const svg=svgRef.current;if(!svg)return;
    const clone=svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns","http://www.w3.org/2000/svg");
    clone.querySelectorAll(".shape-hit").forEach(el=>el.remove());
    const style=document.createElementNS("http://www.w3.org/2000/svg","style");
    style.textContent="text{font-family:Inter,system-ui,sans-serif}.axis-labels{font-size:.34px;fill:#374151}.axis-title{font-size:.45px;fill:#111827}";
    clone.prepend(style);
    const blob=new Blob([new XMLSerializer().serializeToString(clone)],{type:"image/svg+xml"});
    const url=URL.createObjectURL(blob),img=new Image();
    await new Promise<void>((ok,bad)=>{img.onload=()=>ok();img.onerror=bad;img.src=url});
    const canvas=document.createElement("canvas"),scale=2;canvas.width=svg.clientWidth*scale;canvas.height=svg.clientHeight*scale;
    const context=canvas.getContext("2d")!;context.fillStyle="#fff";context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(img,0,0,canvas.width,canvas.height);
    URL.revokeObjectURL(url);const a=document.createElement("a");a.download=filename;a.href=canvas.toDataURL("image/png");a.click();
  };
  useImperativeHandle(ref,()=>({undo,redo:redoOne,clear,getUserDrawings:()=>latest.current.map(x=>({...x,points:x.points.map(p=>[...p] as Point2D)})),downloadImage}));
  const finishMulti=()=>{if(!draft)return;const min=draft.tool==="polygon"?3:2;if(draft.points.length>=min)commit({tool:draft.tool,points:draft.points,color:draft.color,closed:draft.closed});else{setDraft(null);setHint(null)}};
  useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==="Escape"){setDraft(null);setHint(null);setTextAt(null)}else if(e.key==="Enter"&&draft)finishMulti()};window.addEventListener("keydown",key);return()=>window.removeEventListener("keydown",key)});
  const down=(e:React.PointerEvent)=>{
    e.preventDefault();
    const p=coords(e);
    if(e.shiftKey){svgRef.current?.setPointerCapture(e.pointerId);panRef.current={client:[e.clientX,e.clientY],box:view};return;}
    if(activeTool==="select"||activeTool==="eraser")return;
    if(activeTool==="point"||activeTool==="coordinate"){commit({tool:activeTool,points:[p],color});return;}
    if(activeTool==="text"){textClosingRef.current=false;setTextAt(p);setTextValue("");setHint("Type a label, then press Enter");return;}
    if(["polygon","scatter","curve"].includes(activeTool)){
      if(!draft){setDraft({tool:activeTool,points:[p],color});setHint(activeTool==="curve"?"Add up to 4 points":"Click points; Enter finishes; Escape cancels");}
      else {const first=draft.points[0],last=draft.points[draft.points.length-1];if(pxDist(p,last)<CLICK_PX&&draft.points.length>=2)finishMulti();else if(pxDist(p,first)<CLICK_PX&&draft.points.length>=3){commit({tool:activeTool,points:draft.points,color:draft.color,closed:true});}else{const next={...draft,points:[...draft.points,p]};if(activeTool==="curve"&&next.points.length===4)commit({tool:"curve",points:next.points,color:next.color});else setDraft(next);}}return;
    }
    svgRef.current?.setPointerCapture(e.pointerId);
    startRef.current=p;setDraft({tool:activeTool,points:[p,p],color});
  };
  const move=(e:React.PointerEvent)=>{
    const p=coords(e);setHover(p);
    if(panRef.current){const r=svgRef.current!.getBoundingClientRect(),[cx,cy]=panRef.current.client,b=panRef.current.box,dx=(e.clientX-cx)/r.width*(b[1]-b[0])*1.08,dy=(e.clientY-cy)/r.height*(b[3]-b[2])*1.08;setView([b[0]-dx,b[1]-dx,b[2]+dy,b[3]+dy]);return;}
    if(dragRef.current){const {index,last}=dragRef.current,dx=p[0]-last[0],dy=p[1]-last[1];dragRef.current.last=p;setHistory(h=>h.map((s,i)=>i===index?{...s,points:s.points.map(q=>[q[0]+dx,q[1]+dy])}:s));return;}
    if(startRef.current&&draft)setDraft({...draft,points:[startRef.current,p]});
  };
  const up=()=>{panRef.current=null;if(dragRef.current){dragRef.current=null;return;}if(startRef.current&&draft&&draft.points.length>1){if(pxDist(draft.points[0],draft.points[1])>2)commit({tool:draft.tool,points:draft.points,color:draft.color});else{setDraft(null);startRef.current=null;}}};
  const shapeDown=(e:React.PointerEvent,index:number)=>{if(activeTool==="eraser"){e.stopPropagation();setHistory(h=>h.filter((_,i)=>i!==index));setRedo([]);}else if(activeTool==="select"){e.stopPropagation();dragRef.current={index,last:coords(e)};svgRef.current?.setPointerCapture(e.pointerId);}};
  const submitText=()=>{if(textClosingRef.current)return;textClosingRef.current=true;if(textAt&&textValue.trim())commit({tool:"text",points:[textAt],color,text:textValue.trim()});setTextAt(null);setHint(null)};
  const cancelText=()=>{textClosingRef.current=true;setTextAt(null);setHint(null)};
  const ticksX=useMemo(()=>Array.from({length:Math.max(0,Math.floor(xMax))+1},(_,i)=>i),[xMax]),ticksY=useMemo(()=>Array.from({length:Math.max(0,Math.floor(yMax))+1},(_,i)=>i),[yMax]);
  const draftSpec=draft?({type:draft.tool as InitialObjectSpec["type"],points:draft.points,color:draft.color,closed:draft.closed}):null;
  return <div className="svg-board-wrapper">
    <svg ref={svgRef} className="svg-board" viewBox={`${displayXMin} ${-displayYMax} ${displayW} ${displayH}`} preserveAspectRatio="none" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={()=>setHover(null)} role="application" aria-label="Coordinate drawing board">
      <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8 z" fill="context-stroke"/></marker><marker id="arrow-start" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M8,0 L0,4 L8,8 z" fill="context-stroke"/></marker><marker id="axis-arrow" markerWidth="9" markerHeight="7" refX="8.25" refY="3.5" orient="auto" markerUnits="strokeWidth"><path d="M.5,.5 C3.2,.7 6.1,2.45 8.25,3.5 C6.1,4.55 3.2,6.3 .5,6.5" fill="none" stroke="#111827" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></marker></defs>
      <g transform="scale(1,-1)"><rect x={displayXMin} y={-displayYMax} width={displayW} height={displayH} fill="white"/>
        {ticksX.map(x=><line key={`gx${x}`} x1={x} y1={0} x2={x} y2={Math.max(0,yMax)} stroke="#e5e9ef" strokeWidth={1} vectorEffect="non-scaling-stroke"/>)}
        {ticksY.map(y=><line key={`gy${y}`} x1={0} y1={y} x2={Math.max(0,xMax)} y2={y} stroke="#e5e9ef" strokeWidth={1} vectorEffect="non-scaling-stroke"/>)}
        <line x1={0} y1={0} x2={Math.max(0,xMax+padX*.8)} y2={0} stroke="#111827" strokeWidth={1.5} vectorEffect="non-scaling-stroke" markerEnd="url(#axis-arrow)"/><line x1={0} y1={0} x2={0} y2={Math.max(0,yMax+padY*.8)} stroke="#111827" strokeWidth={1.5} vectorEffect="non-scaling-stroke" markerEnd="url(#axis-arrow)"/>
        {ticksX.filter(Boolean).map(x=><line key={`tx${x}`} x1={x} y1={-.12} x2={x} y2={.12} stroke="#111827" strokeWidth={1.5} vectorEffect="non-scaling-stroke"/>)}
        {ticksY.filter(Boolean).map(y=><line key={`ty${y}`} x1={-.12} y1={y} x2={.12} y2={y} stroke="#111827" strokeWidth={1.5} vectorEffect="non-scaling-stroke"/>)}
        {initialObjects.map((s,i)=><Shape key={`i${i}`} spec={s}/>)}
        {history.map((s,i)=><Shape key={`u${i}`} spec={s} index={i} interactive onDown={e=>shapeDown(e,i)}/>)}
        {draftSpec&&<Shape spec={draftSpec}/>} {draft&&hover&&["polygon","scatter","curve"].includes(draft.tool)&&<line x1={draft.points[draft.points.length-1][0]} y1={draft.points[draft.points.length-1][1]} x2={hover[0]} y2={hover[1]} stroke={draft.color} strokeDasharray="5 4" vectorEffect="non-scaling-stroke"/>}
        {activeTool==="coordinate"&&hover&&<><line x1={hover[0]} y1={0} x2={hover[0]} y2={hover[1]} stroke={color} strokeDasharray="5 4" vectorEffect="non-scaling-stroke"/><line x1={0} y1={hover[1]} x2={hover[0]} y2={hover[1]} stroke={color} strokeDasharray="5 4" vectorEffect="non-scaling-stroke"/><circle cx={hover[0]} cy={hover[1]} r={.12} fill={color}/></>}
        {overlayObjects.map((s,i)=><Shape key={`o${i}`} spec={{...s,color:s.color??overlayColor}} dashed/>)}
      </g>
      <g className="axis-labels">{ticksX.map(x=><text key={x} x={x} y={.42} textAnchor={x===xMax?"end":"middle"}>{x}</text>)}{ticksY.filter(Boolean).map(y=><text key={y} x={-.18} y={-y+(y===yMax?.36:.12)} textAnchor="end">{y}</text>)}<text x={(xMin+xMax)/2} y={-yMin-.22} textAnchor="middle" className="axis-title">{xLabel}</text><text transform={`translate(${xMin+.48} ${-(yMin+yMax)/2}) rotate(-90)`} textAnchor="middle" className="axis-title">{yLabel}</text></g>
    </svg>
    {textAt&&<input ref={inputRef} className="svg-text-input" style={{left:`${(textAt[0]-displayXMin)/displayW*100}%`,top:`${(displayYMax-textAt[1])/displayH*100}%`,color}} value={textValue} onChange={e=>setTextValue(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();submitText();}if(e.key==="Escape"){e.preventDefault();cancelText();}}} onBlur={submitText}/>} 
    {hint&&<div className="drawing-hint">{hint}</div>}
    {showNavigation&&<div className="svg-navigation"><button onClick={()=>setView(b=>{const dx=(b[1]-b[0])*.1,dy=(b[3]-b[2])*.1;return[b[0]+dx,b[1]-dx,b[2]+dy,b[3]-dy]})}>+</button><button onClick={()=>setView(b=>{const dx=(b[1]-b[0])*.1,dy=(b[3]-b[2])*.1;return[b[0]-dx,b[1]+dx,b[2]-dy,b[3]+dy]})}>−</button><button onClick={()=>setView(boundingBox)}>⌂</button></div>}
  </div>;
});
export default DrawingBoard;
