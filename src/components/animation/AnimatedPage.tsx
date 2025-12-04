"use client";

import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export function AnimatedPage({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
