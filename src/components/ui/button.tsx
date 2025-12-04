"use client";

import React from "react";
import clsx from "clsx";

export type ButtonVariant = "primary" | "secondary" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

type ButtonProps = ButtonBaseProps &
  (React.ButtonHTMLAttributes<HTMLButtonElement> | React.HTMLAttributes<HTMLElement>);

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpha-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-alpha-500 text-black hover:bg-alpha-400 active:bg-alpha-600 shadow-sm hover:shadow-md",
  secondary:
    "bg-neutral-800 text-neutral-50 hover:bg-neutral-700 active:bg-neutral-900",
  outline:
    "border border-neutral-600 bg-transparent text-neutral-100 hover:border-alpha-500 hover:bg-black/60 active:bg-black",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  asChild,
  ...rest
}: ButtonProps) {
  const Component: React.ElementType = asChild ? "span" : "button";

  return (
    <Component
      className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
