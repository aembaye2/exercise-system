import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "../elements";

afterEach(() => {
  cleanup();
  try {
    localStorage.clear();
  } catch {
    // storage may be unavailable; nothing to clear
  }
});
