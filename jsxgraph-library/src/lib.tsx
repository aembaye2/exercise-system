/**
 * Library entry point (see vite.lib.config.ts / `npm run build:lib`).
 *
 * Bundled as a standalone script that exposes a `JSXDrawing` global, so the
 * widget can be used from plain HTML or Quarto pages without React or a build
 * step:
 *
 *   <link rel="stylesheet" href="jsxdrawing.min.css" />
 *   <script src="jsxdrawing.min.js"></script>
 *
 *   <!-- props from a JSON file -->
 *   <div data-drawing-app data-props-src="question1.json"></div>
 *
 *   <!-- or inline JSON -->
 *   <div data-drawing-app>
 *     <script type="application/json">{ "questionText": "..." }</script>
 *   </div>
 *
 *   <!-- or from JavaScript -->
 *   <script>JSXDrawing.mount("#q1", { questionText: "..." });</script>
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";

import DrawingApp from "./drawingApp";
import type { DrawingAppProps } from "./drawingApp";

export type { DrawingAppProps };

export interface DrawingAppInstance {
  /** Re-renders the widget with new props (replaces the old ones). */
  update: (props: DrawingAppProps) => void;
  /** Removes the widget from the page. */
  unmount: () => void;
}

const mounted = new WeakMap<Element, DrawingAppInstance>();

function resolveTarget(target: string | Element): Element {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) throw new Error(`JSXDrawing: no element matches "${String(target)}"`);
  return el;
}

/** Renders a drawing widget into `target` (an element or a CSS selector).
 * Mounting again into the same element just updates its props. */
export function mount(target: string | Element, props: DrawingAppProps = {}): DrawingAppInstance {
  const el = resolveTarget(target);
  const existing = mounted.get(el);
  if (existing) {
    existing.update(props);
    return existing;
  }

  const root: Root = createRoot(el);
  const render = (p: DrawingAppProps) =>
    root.render(
      <StrictMode>
        <DrawingApp {...p} />
      </StrictMode>
    );
  render(props);

  const instance: DrawingAppInstance = {
    update: render,
    unmount: () => {
      root.unmount();
      mounted.delete(el);
    },
  };
  mounted.set(el, instance);
  return instance;
}

/** Fetches a JSON file of props (e.g. "question1.json") and mounts the widget with it. */
export async function mountFromUrl(target: string | Element, url: string): Promise<DrawingAppInstance> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`JSXDrawing: could not load "${url}" (${res.status})`);
  return mount(target, (await res.json()) as DrawingAppProps);
}

/** Mounts every `[data-drawing-app]` element under `root` that isn't mounted
 * yet. Props come from `data-props-src` (a JSON file URL) or from a
 * `<script type="application/json">` inside the element. Runs automatically
 * once the page has loaded; call it again after adding elements dynamically. */
export function autoMount(root: ParentNode = document): Promise<DrawingAppInstance[]> {
  const elements = Array.from(root.querySelectorAll("[data-drawing-app]")).filter((el) => !mounted.has(el));
  return Promise.all(
    elements.map((el) => {
      const src = el.getAttribute("data-props-src");
      if (src) return mountFromUrl(el, src);
      const inline = el.querySelector('script[type="application/json"]');
      const props = inline?.textContent?.trim() ? (JSON.parse(inline.textContent) as DrawingAppProps) : {};
      return mount(el, props);
    })
  );
}

function autoMountLogged() {
  autoMount().catch((err) => console.error(err));
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autoMountLogged);
  } else {
    autoMountLogged();
  }
}
