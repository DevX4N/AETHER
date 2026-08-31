"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  disabled?: boolean;
}

export function useScrollReveal({
  threshold = 0.15,
  rootMargin = "0px 0px -50px 0px",
  once = false,
  disabled = false,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (disabled) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once && observerRef.current) {
            observerRef.current.disconnect();
          }
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, [threshold, rootMargin, once, disabled]);

  return { ref, visible };
}
