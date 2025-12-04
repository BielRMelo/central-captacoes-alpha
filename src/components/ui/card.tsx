"use client";

import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ children, className, ...rest }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-white/5 bg-neutral-900/60 shadow-[0_18px_45px_rgba(0,0,0,0.55)] backdrop-blur-sm",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "flex items-start justify-between gap-2 border-b border-white/5 px-4 py-3",
        className,
      )}
      {...rest}
    />
  );
}

export function CardTitle({ className, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={clsx(
        "text-sm font-semibold tracking-tight text-neutral-50",
        className,
      )}
      {...rest}
    />
  );
}

export function CardContent({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("px-4 py-3 text-sm text-neutral-300", className)} {...rest} />
  );
}

export function CardFooter({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "flex items-center justify-end gap-2 border-t border-white/5 px-4 py-3 text-sm",
        className,
      )}
      {...rest}
    />
  );
}
