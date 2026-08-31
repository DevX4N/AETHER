"use client";

import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface RevealProps {
  children: ReactNode;
  className?: string;
}

export default function Reveal({
  children,
  className = "",
}: RevealProps) {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-1000 ease-out
        ${
          visible
            ? "opacity-100 translate-y-0 blur-0"
            : "opacity-0 translate-y-12 blur-sm"
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}
