"use client"

import * as React from "react"
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react"

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number
  y?: number
}

/** Fades and lifts its children into view once, when scrolled into view. */
export function Reveal({ delay = 0, y = 28, children, ...props }: RevealProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/** Staggers its direct <RevealItem> children. */
export function RevealGroup({
  children,
  stagger = 0.08,
  ...props
}: HTMLMotionProps<"div"> & { stagger?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
