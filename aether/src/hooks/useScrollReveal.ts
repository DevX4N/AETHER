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
  rootMargin = "0px 0px -10% 0px",
  once = false,
  disabled = false,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (disabled) return;

    const el = ref.current;
    if (!el) return;

    const mobile = window.innerWidth < 768;
    const effectiveThreshold = mobile ? Math.min(threshold, 0.12) : threshold;
    const effectiveRootMargin = mobile ? "0px 0px -20% 0px" : rootMargin;

    const checkVisibility = () => {
      const rect = el.getBoundingClientRect();
      const triggerPoint = window.innerHeight * (mobile ? 0.95 : 0.88);
      const inView = rect.top < triggerPoint && rect.bottom > 0;

      if (inView) {
        setVisible(true);
        if (once && observerRef.current) {
          observerRef.current.disconnect();
        }
      } else if (!once) {
        setVisible(false);
      }
    };

    if (typeof IntersectionObserver === "undefined") {
      checkVisibility();
      window.addEventListener("scroll", checkVisibility, { passive: true });
      window.addEventListener("resize", checkVisibility);
      return () => {
        window.removeEventListener("scroll", checkVisibility);
        window.removeEventListener("resize", checkVisibility);
      };
    }

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
      { threshold: effectiveThreshold, rootMargin: effectiveRootMargin }
    );

    observerRef.current.observe(el);
    checkVisibility();
    return () => observerRef.current?.disconnect();
  }, [threshold, rootMargin, once, disabled]);

  return { ref, visible };
}
