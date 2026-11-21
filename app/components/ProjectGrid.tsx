"use client";

import { useState } from "react";
import CountUp from "./CountUp";
import { categoryLabels, themes, type Category, type Project } from "../data";

const ORDER: Category[] = ["data", "ml", "web", "desain"];

function Chip({ label, bg, fg }: { label: string; bg: string; fg: string }) {
  return (
    <span className="rounded-lg px-3 py-[5px] text-sm font-medium" style={{ background: bg, color: fg }}>
      {label}
    </span>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const t = themes[p.theme];
  const links = p.links.filter((l) => l.href);
  const rows: [string, string][] = [
    ["Masalah", p.masalah],
    ["Solusi", p.solusi],
    ["Hasil", p.hasil],
  ];
  return (
    <article
      className="lift tone flex min-w-0 flex-[1_1_480px] flex-col gap-5 rounded-[22px] bg-white p-4 md:max-w-[608px]"
      style={{ "--tone": t.ring[0] } as React.CSSProperties}
    >
      {p.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.image} alt={`Tampilan proyek ${p.title}`} className="w-full rounded-[14px] border-2 md:aspect-[2.9/1] md:object-cover md:object-top" style={{ borderColor: `color-mix(in srgb, ${t.ring[0]} 45%, #ffffff)` }} />
      ) : (
        <div
          className="flex aspect-[2.9/1] items-center justify-center rounded-[14px] text-sm"
          style={{ background: t.shot, color: t.chipFg }}
        >
          Tangkapan layar menyusul
        </div>
      )}
      <div className="flex flex-col gap-[18px] px-3.5 pb-3.5">
        <span
          className="self-start rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-[0.06em]"
          style={{ background: t.chipBg, color: t.chipFg }}
        >
          {p.badge}
        </span>
        <h3 className="m-0 text-[22px] font-bold leading-[1.2] tracking-[-0.02em] md:text-[26px]">{p.title}</h3>
        <div className="flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <Chip key={s} label={s} bg={t.chipBg} fg={t.chipFg} />
          ))}
        </div>
        {p.stats && p.stats.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {p.stats.map((s) => (
              <div key={s.label} className="min-w-[130px] flex-1 rounded-[14px] px-4 py-3" style={{ background: t.chipBg }}>
                <div className="font-display text-[24px] font-extrabold md:text-[28px] leading-[1.1] tracking-[-0.02em]" style={{ color: t.chipFg }}>
                  <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-[13px] leading-[1.35] text-[#3B4658]">{s.label}</div>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-3.5 text-base">
          {rows.map(([k, v]) => (
            <div key={k}>
              <div className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#5B6270]">{k}</div>
              <div className="text-[#2A3447]">{v}</div>
            </div>
          ))}
        </div>
        {links.length > 0 && (
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-base font-semibold">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-u inline-flex min-h-11 items-center"
                style={{ color: t.link }}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const visible = projects.filter((p) => !p.hidden);
  const cats = ORDER.filter((c) => visible.some((p) => p.cats.includes(c)));
  const [active, setActive] = useState<Category | "all">("all");
  const shown = active === "all" ? visible : visible.filter((p) => p.cats.includes(active));
  const options: { key: Category | "all"; label: string }[] = [
    { key: "all", label: "Semua" },
    ...cats.map((c) => ({ key: c, label: categoryLabels[c] })),
  ];

  return (
    <div className="flex flex-col gap-4">
      {options.length > 2 && (
        <div role="group" aria-label="Filter proyek" className="flex flex-wrap gap-2.5">
          {options.map((o) => {
            const on = active === o.key;
            return (
              <button
                key={o.key}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(o.key)}
                className="btn-ghost inline-flex min-h-11 cursor-pointer items-center rounded-xl border-[1.5px] px-5 text-[15px] font-semibold transition-colors"
                style={
                  on
                    ? { background: "#2447C9", borderColor: "#2447C9", color: "#fff" }
                    : { background: "#fff", borderColor: "#C9D6F8", color: "#243A8A" }
                }
              >
                {o.label}
              </button>
            );
          })}
        </div>
      )}
      <div className="mt-2 flex flex-wrap gap-6">
        {shown.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </div>
  );
}
