"use client";

import React from "react";
import clsx from "clsx";

interface AnimatedCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export function AnimatedCard({ title, description, icon, className }: AnimatedCardProps) {
  return (
    <div className={clsx("alpha-anim-card", className)}>
      <span className="alpha-anim-card__icon">
        {icon || (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.5 9.5V5.5C4.5 4.94772 4.94772 4.5 5.5 4.5H9.5C10.0523 4.5 10.5 4.94772 10.5 5.5V9.5C10.5 10.0523 10.0523 10.5 9.5 10.5H5.5C4.94772 10.5 4.5 10.0523 4.5 9.5Z" />
            <path d="M13.5 18.5V14.5C13.5 13.9477 13.9477 13.5 14.5 13.5H18.5C19.0523 13.5 19.5 13.9477 19.5 14.5V18.5C19.5 19.0523 19.0523 19.5 18.5 19.5H14.5C13.9477 19.5 13.5 19.0523 13.5 18.5Z" />
            <path d="M4.5 19.5L7.5 13.5L10.5 19.5H4.5Z" />
            <path d="M16.5 4.5C18.1569 4.5 19.5 5.84315 19.5 7.5C19.5 9.15685 18.1569 10.5 16.5 10.5C14.8431 10.5 13.5 9.15685 13.5 7.5C13.5 5.84315 14.8431 4.5 16.5 4.5Z" />
          </svg>
        )}
      </span>
      <h4>{title}</h4>
      <p>{description}</p>
      <div className="alpha-anim-card__shine" />
      <div className="alpha-anim-card__background">
        <div className="alpha-anim-card__tiles">
          <div className="alpha-anim-card__tile alpha-anim-card__tile--1" />
          <div className="alpha-anim-card__tile alpha-anim-card__tile--2" />
          <div className="alpha-anim-card__tile alpha-anim-card__tile--3" />
          <div className="alpha-anim-card__tile alpha-anim-card__tile--4" />
          <div className="alpha-anim-card__tile alpha-anim-card__tile--5" />
          <div className="alpha-anim-card__tile alpha-anim-card__tile--6" />
          <div className="alpha-anim-card__tile alpha-anim-card__tile--7" />
          <div className="alpha-anim-card__tile alpha-anim-card__tile--8" />
          <div className="alpha-anim-card__tile alpha-anim-card__tile--9" />
          <div className="alpha-anim-card__tile alpha-anim-card__tile--10" />
        </div>
        <div className="alpha-anim-card__line alpha-anim-card__line--1" />
        <div className="alpha-anim-card__line alpha-anim-card__line--2" />
        <div className="alpha-anim-card__line alpha-anim-card__line--3" />
      </div>
    </div>
  );
}
