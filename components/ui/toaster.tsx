"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { CircleAlert, CircleCheck, Info, X } from "lucide-react"

import { cn } from "@/lib/utils"

type ToastKind = "success" | "error" | "info"
type Toast = { id: number; kind: ToastKind; title: string; description?: string }
type ToastInput = Omit<Toast, "id"> & { duration?: number }

const ToastContext = React.createContext<((t: ToastInput) => void) | null>(null)

export function useToast() {
  const push = React.useContext(ToastContext)
  if (!push) throw new Error("useToast must be used inside <Toaster>")
  return push
}

const icons = { success: CircleCheck, error: CircleAlert, info: Info }
const tone = {
  success: "text-success",
  error: "text-destructive",
  info: "text-gold",
}

export function Toaster({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])
  const nextId = React.useRef(0)

  const dismiss = React.useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id))
  }, [])

  const push = React.useCallback(
    ({ duration = 5000, ...toast }: ToastInput) => {
      const id = ++nextId.current
      setToasts((list) => [...list.slice(-3), { ...toast, id }])
      window.setTimeout(() => dismiss(id), duration)
    },
    [dismiss]
  )

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 top-24 z-[60] flex flex-col items-end gap-3 sm:inset-x-auto sm:right-6"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const Icon = icons[t.kind]
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: -12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.25 }}
                role={t.kind === "error" ? "alert" : "status"}
                className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border border-white/10 bg-popover/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-md"
              >
                <Icon className={cn("mt-0.5 size-5 shrink-0", tone[t.kind])} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{t.title}</p>
                  {t.description ? (
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {t.description}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(t.id)}
                  className="rounded-md p-1 text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
                  aria-label="Dismiss notification"
                >
                  <X className="size-4" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
