"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; c: string };

const COLORS = ["#2447C9", "#7C3AED", "#0E8F9B", "#F2A900"];
const LINK = 118;
const POINTER = 160;

export default function HeroBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let pts: P[] = [];
    let ptr: { x: number; y: number } | null = null;
    let visible = true;
    let raf = 0;
    let last = 0;

    const setup = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(22, Math.min(70, Math.round((w * h) / 8200)));
      pts = Array.from({ length: n }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        c: COLORS[i % COLORS.length],
      }));
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (dt) {
          p.x += (p.vx * dt) / 16;
          p.y += (p.vy * dt) / 16;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < LINK) {
            ctx.globalAlpha = (1 - d / LINK) * 0.5;
            ctx.strokeStyle = "#2447C9";
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        if (ptr) {
          const d = Math.hypot(p.x - ptr.x, p.y - ptr.y);
          if (d < POINTER) {
            ctx.globalAlpha = (1 - d / POINTER) * 0.7;
            ctx.strokeStyle = "#7C3AED";
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(ptr.x, ptr.y);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      const dt = last ? Math.min(50, t - last) : 16;
      last = t;
      if (visible) draw(dt);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ptr = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => {
      ptr = null;
    };

    setup();
    draw(0);
    if (!reduce) raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      setup();
      draw(0);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white"
      />
    </>
  );
}
