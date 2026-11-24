"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

// Fades a block up into place the first time it enters the viewport.
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

// Draws a dimension line outward from its centre, the way a draughtsperson would.
export function DrawLine({ axis, className = "", delay = 0 }: { axis: "x" | "y"; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const prop = axis === "x" ? "scaleX" : "scaleY";
  return (
    <motion.div
      className={`${axis === "x" ? "dim-h" : "dim-v"} ${className}`}
      initial={reduce ? false : { [prop]: 0 }}
      animate={{ [prop]: 1 }}
      transition={{ duration: 0.9, delay, ease }}
    />
  );
}

// Floors of the contents elevation rise from the ground up.
export function Floor({ children, index, total }: { children: React.ReactNode; index: number; total: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, delay: (total - 1 - index) * 0.07, ease }}
    >
      {children}
    </motion.li>
  );
}
