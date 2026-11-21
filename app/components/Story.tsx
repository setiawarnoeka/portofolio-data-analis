"use client";

import { useState } from "react";
import { story } from "../data";
import InView from "./InView";

const steps = [
  { key: "q", label: "1. Pertanyaan", badge: "Langkah 1", title: "Pertanyaan bisnis", ring: ["#2447C9", "#7C3AED"], bg: "#E8EEFD", fg: "#243A8A" },
  { key: "f", label: "2. Temuan", badge: "Langkah 2", title: "Temuan utama", ring: ["#0E8F9B", "#2447C9"], bg: "#E3F4F6", fg: "#0B5E66" },
  { key: "r", label: "3. Rekomendasi", badge: "Langkah 3", title: "Rekomendasi", ring: ["#F2A900", "#E4572E"], bg: "#FFF1CC", fg: "#6B4700" },
] as const;

function Bullets({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="m-0 flex max-w-[720px] list-none flex-col gap-2.5 p-0 text-base text-[#2A3447]">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span aria-hidden className="mt-[9px] h-2 w-2 flex-none rounded-full" style={{ background: color }} />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function Story() {
  const [i, setI] = useState(0);
  const s = steps[i];
  const max = 10;

  return (
    <div className="flex flex-col gap-3.5">
      <div role="tablist" aria-label="Langkah analisis" className="flex flex-wrap gap-2.5">
        {steps.map((st, idx) => {
          const on = idx === i;
          return (
            <button
              key={st.key}
              role="tab"
              id={`tab-${st.key}`}
              aria-selected={on}
              aria-controls="story-panel"
              type="button"
              onClick={() => setI(idx)}
              className="btn-ghost inline-flex min-h-11 cursor-pointer items-center rounded-xl border-[1.5px] px-5 text-[15px] font-semibold transition-colors"
              style={
                on
                  ? { background: "#2447C9", borderColor: "#2447C9", color: "#fff" }
                  : { background: "#fff", borderColor: "#C9D6F8", color: "#243A8A" }
              }
            >
              {st.label}
            </button>
          );
        })}
      </div>

      <div
        id="story-panel"
        role="tabpanel"
        aria-labelledby={`tab-${s.key}`}
        className="flex flex-wrap gap-8 rounded-[22px] border-2 border-transparent p-6 md:p-8"
        style={{ background: `linear-gradient(#fff,#fff) padding-box, linear-gradient(135deg, ${s.ring[0]}, ${s.ring[1]}) border-box` }}
      >
        <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-3">
          <span className="self-start rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-[0.06em]" style={{ background: s.bg, color: s.fg }}>
            {s.badge}
          </span>
          <h3 className="m-0 text-[26px] font-bold tracking-[-0.02em]">{s.title}</h3>
          {s.key === "q" && <p className="m-0 max-w-[720px] text-lg text-[#3B4658]">{story.question}</p>}
          {s.key === "f" && (
            <>
              <p className="m-0 text-lg text-[#3B4658]">Tiga hal yang paling menonjol:</p>
              <Bullets items={story.findings} color="#0E8F9B" />
            </>
          )}
          {s.key === "r" && (
            <>
              <p className="m-0 text-lg text-[#3B4658]">Tiga langkah yang saya sarankan:</p>
              <Bullets items={story.recommendations} color="#E4572E" />
            </>
          )}
        </div>

        {s.key === "f" && (
          <InView className="flex min-w-0 flex-[1_1_320px] flex-col gap-2.5">
            <div className="text-sm font-semibold text-[#3B4658]">{story.chartTitle}</div>
            <div
              role="img"
              aria-label={`Grafik batang: ${story.bars.map((b) => `${b.label} ${b.display}`).join(", ")}`}
              className="flex h-[200px] items-end gap-[18px] border-b-2 border-[#E3E6EB] px-2"
            >
              {story.bars.map((b, k) => (
                <div key={b.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                  <span className="a-fade text-sm font-bold" style={{ animationDelay: `${k * 70 + 500}ms` }}>
                    {b.display}
                  </span>
                  <div
                    className="a-bar w-full rounded-t-lg"
                    style={{ ...({ "--i": k } as React.CSSProperties), height: `${(b.value / max) * 85}%`, background: b.color }}
                  />
                </div>
              ))}
            </div>
            <div aria-hidden className="flex gap-[18px] px-2 text-center text-[13px] text-[#5B6270]">
              {story.bars.map((b) => (
                <span key={b.label} className="flex-1">
                  {b.label}
                </span>
              ))}
            </div>
            <div className="text-sm text-[#5B6270]">{story.chartSource}</div>
          </InView>
        )}
      </div>
    </div>
  );
}
