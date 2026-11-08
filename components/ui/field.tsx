import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

export const controlClass =
  "h-11 w-full min-w-0 rounded-lg border border-input bg-white/[0.03] px-3.5 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground/70 hover:border-white/25 focus-visible:border-gold focus-visible:ring-3 focus-visible:ring-gold/20 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [color-scheme:dark]"

type FieldProps = {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
  icon?: React.ReactNode
  children: React.ReactNode
}

/** Label + control + error/hint wiring with proper aria attributes. */
export function Field({
  id,
  label,
  error,
  hint,
  required,
  className,
  icon,
  children,
}: FieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase"
      >
        {icon ? <span className="text-gold [&_svg]:size-3.5">{icon}</span> : null}
        {label}
        {required ? <span className="text-gold" aria-hidden>*</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

/** aria props to spread on a control so it links to its Field's error. */
export function fieldAria(id: string, error?: string) {
  return {
    id,
    name: id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  } as const
}

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(controlClass, className)} {...props} />
}

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(controlClass, "h-auto min-h-28 resize-y py-3", className)}
      {...props}
    />
  )
}

export function Select({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(
          controlClass,
          "cursor-pointer appearance-none pr-9 [&>option]:bg-popover",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
    </div>
  )
}
