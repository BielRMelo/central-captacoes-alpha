"use client";

import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

interface MotionSectionProps extends PropsWithChildren {
  className?: string;
}

export function MotionSection({ children, className }: MotionSectionProps) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.section>
  );
}
