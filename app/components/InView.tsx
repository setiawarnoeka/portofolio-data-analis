"use client";
import { useEffect, useRef, useState } from "react";

export default function InView({
  children,
  className = "",
  threshold = 0.4,
}: {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"on" | "off" | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setState("off");
    const io = new IntersectionObserver(([e]) => setState(e.isIntersecting ? "on" : "off"), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`ill ${className}`} data-anim={state}>
      {children}
    </div>
  );
}