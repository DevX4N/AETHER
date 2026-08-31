"use client";

import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up";
}

export default function Reveal({
  children,
  className = "",
  direction = "left",
}: RevealProps) {
  const { ref, visible } = useScrollReveal({
    threshold: 0.2,
  });

  const hiddenPosition = {
    left: "-translate-x-16",
    right: "translate-x-16",
    up: "translate-y-12",
  };

  return (
    <div
      ref={ref}
      className={`
        transition-all
        duration-[1200ms]
        ease-[cubic-bezier(0.16,1,0.3,1)]
        ${
          visible
            ? "opacity-100 translate-x-0 translate-y-0 blur-0"
            : `opacity-0 ${hiddenPosition[direction]} blur-sm`
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}
