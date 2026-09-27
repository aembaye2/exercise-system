import { useEffect, useState } from "react";

export type Route =
  | { page: "home" }
  | { page: "assessment"; id: string }
  | { page: "results"; id: string }
  | { page: "import" }
  | { page: "notFound" };

export function parseHash(hash: string): Route {
  const path = hash.replace(/^#/, "").replace(/\/+$/, "") || "/";
  if (path === "/") return { page: "home" };
  if (path === "/import") return { page: "import" };
  const m = /^\/assessment\/([^/]+)(\/results)?$/.exec(path);
  if (m) {
    const id = decodeURIComponent(m[1]);
    return m[2] ? { page: "results", id } : { page: "assessment", id };
  }
  return { page: "notFound" };
}

/** Tiny hash router: no dependency, works from file:// and static hosting. */
export function useHashRoute(): Route {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo?.(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}
