"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

// Like motion's useReducedMotion, but returns false during SSR and hydration so markup matches.
export function useReducedMotionSafe() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}
