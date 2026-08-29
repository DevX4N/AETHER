"use client";

import { useEffect, useState } from "react";

export default function UtcClock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState("--:--:-- UTC");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, "0");
      const m = String(now.getUTCMinutes()).padStart(2, "0");
      const s = String(now.getUTCSeconds()).padStart(2, "0");
      setTime(`${h}:${m}:${s} UTC`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className} aria-hidden="true">
      {time}
    </span>
  );
}
