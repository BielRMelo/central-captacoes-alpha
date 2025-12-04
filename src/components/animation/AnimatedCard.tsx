"use client";

import { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface AnimatedCardProps extends PropsWithChildren {
  className?: string;
  delay?: number;
}

export function AnimatedCard({ children, className, delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
      whileHover={{ scale: 1.02 }}
      className={clsx(
        "group rounded-2xl border border-white/10 bg-black/50 shadow-[0_18px_45px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
