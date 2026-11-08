"use client"

import { useSyncExternalStore } from "react"

import { todayISO } from "@/lib/validation"

const subscribe = () => () => {}

/**
 * Today's date (YYYY-MM-DD) in the visitor's time zone. Returns "" during
 * server rendering so date `min` attributes never cause hydration mismatches.
 */
export function useToday() {
  return useSyncExternalStore(subscribe, () => todayISO(), () => "")
}
