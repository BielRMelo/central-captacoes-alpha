"use client";

import React from "react";
import clsx from "clsx";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  fullHeight?: boolean;
}

export function Container({
  children,
  className,
  fullHeight,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8",
        fullHeight && "min-h-screen",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
