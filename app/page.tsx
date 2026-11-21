import ProjectGrid from "./components/ProjectGrid";
import Story from "./components/Story";
import HeroBackground from "./components/HeroBackground";
import InView from "./components/InView";
import { certificates, profile, projects, skills, themes } from "./data";

const eyebrow = "text-sm font-bold uppercase tracking-[0.08em] text-accent";
const h2 = "m-0 text-[clamp(26px,4vw,42px)] font-extrabold leading-[1.15] tracking-[-0.025em]";
const wrap = "mx-auto w-full max-w-[1232px] px-6";
const ring = (a: string, b: string) => ({
  background: `linear-gradient(#fff,#fff) padding-box, linear-gradient(135deg, ${a}, ${b}) border-box`,
});
const rise = (i: number) => ({ "--i": i }) as React.CSSProperties;
const mark = (text: string, term: string) => {
  const i = text.indexOf(term);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className="hl">{term}</span>
      {text.slice(i + term.length)}
    </>
  );
};

function Illustration({ kind }: { kind: "chart" | "matrix" }) {
  const common = {
    viewBox: "0 0 560 140",
    preserveAspectRatio: "xMidYMid meet" as const,
    className: "block h-auto w-full",
    "aria-hidden": true,
  };
  const idx = (i: number) => ({ "--i": i }) as React.CSSProperties;
  const len = (n: number) => ({ "--len": n }) as React.CSSProperties;
  const grid = [28, 56, 84, 112].map((y) => <line key={y} className="a-fade" x1="0" x2="560" y1={y} y2={y} stroke="#9DB3F2" strokeOpacity="0.35" strokeWidth="1" />);
  if (kind === "chart") {
    const bars = [34, 52, 44, 70, 60, 88, 78, 104];
    return (
      <svg {...common}>
        {grid}
        {bars.map((h, i) => (
          <rect key={i} className="a-bar" style={idx(i)} x={36 + i * 64} y={132 - h} width="34" height={h} rx="5" fill="#2447C9" fillOpacity={0.25 + i * 0.09} />
        ))}
        <polyline className="a-line" style={len(500)} fill="none" stroke="#7C3AED" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" points="53,84 117,66 181,76 245,48 309,58 373,30 437,40 501,18" />
        {[[53, 84], [117, 66], [181, 76], [245, 48], [309, 58], [373, 30], [437, 40], [501, 18]].map(([x, y], i) => (
          <circle key={x} className="a-dot" style={idx(i)} cx={x} cy={y} r="5" fill="#fff" stroke="#7C3AED" strokeWidth="3" />
        ))}
      </svg>
    );
  }
  const stops = ["#3DB98A", "#F4C430", "#E4572E"];
  const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const color = (s: number) => {
    const x = (s / 8) * 2;
    const i = Math.min(1, Math.floor(x));
    const a = hex(stops[i]);
    const b = hex(stops[i + 1]);
    const f = x - i;
    return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * f)).join(",")})`;
  };
  const cells = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const s = 4 - r + c;
      cells.push(
        <rect key={`${r}-${c}`} className="a-cell" style={idx(s)} x={24 + c * 56} y={6 + r * 25} width="52" height="21" rx="5" fill={color(s)} />,
      );
    }
  }
  const pts: [number, number][] = [[338, 108], [372, 96], [406, 101], [440, 78], [474, 52], [508, 30], [540, 58]];
  return (
    <svg {...common}>
      <defs>
        <linearGradient id="riskFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="riskMask" maskUnits="userSpaceOnUse" x="0" y="0" width="560" height="140">
          <rect x="0" y="0" width="560" height="140" fill="url(#riskFade)" />
        </mask>
      </defs>
      <g mask="url(#riskMask)">
        {cells.map((c) => c)}
      </g>
      <circle className="a-pop" cx={24 + 3 * 56 + 26} cy={6 + 25 + 10.5} r="8" fill="#fff" stroke="#0F172A" strokeWidth="3" />
      <g mask="url(#riskMask)">
        {[28, 56, 84, 112].map((y) => <line key={y} className="a-fade" x1="326" x2="548" y1={y} y2={y} stroke="#7FC8CF" strokeOpacity="0.5" strokeWidth="1" />)}
        <line className="a-fade" x1="326" x2="548" y1="44" y2="44" stroke="#E4572E" strokeWidth="2.5" strokeDasharray="7 6" />
        <polyline className="a-line" style={len(260)} fill="none" stroke="#0E8F9B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" points={pts.map((q) => q.join(",")).join(" ")} />
      </g>
      {pts.map(([x, y], i) => (
        <circle key={x} className="a-dot" style={idx(i)} cx={x} cy={y} r={y < 44 ? 6.5 : 4.5} fill="#fff" stroke={y < 44 ? "#E4572E" : "#0E8F9B"} strokeWidth="3" />
      ))}
    </svg>
  );
}

function SectionHead({ label, title }: { label: string; title: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3.5">
      <div className={eyebrow}>{label}</div>
      <h2 className={h2}>{title}</h2>
    </div>
  );
}

export default function Home() {
  const initials = profile.name
    .split(" ")
    .filter((_, i, a) => i === 0 || i === a.length - 1)
    .map((w) => w[0])
    .join("");

  const strip = [
    profile.campus && { label: "Kampus", value: profile.campus, color: "#2447C9" },
    profile.gradYear && { label: "Perkiraan lulus", value: profile.gradYear, color: "#0E8F9B" },
    { label: "Fokus saat ini", value: "Analisis data", color: "#F2A900" },
    { label: "Arah jangka panjang", value: "Risk management", color: "#E4572E" },
  ].filter(Boolean) as { label: string; value: string; color: string }[];

  const path = [
    { n: "01", t: "Fondasi data", d: "SQL, BigQuery, dan Python untuk mengambil serta merapikan data.", bg: "#E3F4F6", fg: "#0B5E66", line: "#0E8F9B", hl: "merapikan data" },
    { n: "02", t: "Analisis dan visualisasi", d: "Menjawab pertanyaan lewat dashboard di Streamlit dan Data Studio.", bg: "#EFE7FF", fg: "#4C1D95", line: "#7C3AED", hl: "Menjawab pertanyaan" },
    { n: "03", t: "Machine learning", d: "Clustering, klasifikasi, dan CNN untuk menemukan pola di data.", bg: "#FFF1CC", fg: "#6B4700", line: "#F2A900", hl: "menemukan pola" },
  ];

  return (
    <div id="top">
      <a
        href="#konten"
        className="absolute left-[-9999px] top-2 z-10 rounded-[10px] bg-[#0F172A] px-[18px] py-3 text-white focus:left-4"
      >
        Lewati ke konten utama
      </a>

      <header className="border-b border-[#E3E6EB] bg-white">
        <div className={`${wrap} flex min-h-[76px] flex-wrap items-center gap-x-8 gap-y-1`}>
          <a href="#top" className="inline-flex flex-none items-center gap-3 py-2">
            {profile.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.photo} alt="" className="h-10 w-10 rounded-full border-2 border-[#0F172A] object-cover" />
            ) : (
              <span aria-hidden className="h-9 w-9 rounded-[11px]" style={{ background: "linear-gradient(135deg, #2447C9 0%, #7C3AED 100%)" }} />
            )}
            <span className="flex flex-col leading-[1.2]">
              <span className="font-display text-lg font-extrabold tracking-[-0.01em]">{profile.name}</span>
              <span className="text-xs font-medium text-accent">Portofolio</span>
            </span>
          </a>
          <nav aria-label="Menu utama" className="order-last flex w-full flex-nowrap gap-x-6 overflow-x-auto text-[15px] font-medium text-[#3B4658] md:order-none md:w-auto md:flex-1 md:flex-wrap md:justify-center md:gap-x-9 md:overflow-visible">
            {[
              ["#about", "Tentang"],
              ["#skills", "Keahlian"],
              ["#projects", "Proyek"],
              ["#cerita", "Cerita data"],
              ["#certificates", "Sertifikat"],
            ].map(([h, l]) => (
              <a key={h} href={h} className="inline-block whitespace-nowrap py-3 hover:text-[#0F172A]">
                {l}
              </a>
            ))}
          </nav>
          <div className="flex flex-none flex-wrap items-center gap-2.5">
            {profile.cv && (
              <a href={profile.cv} download className="btn-ghost inline-flex h-11 items-center rounded-xl border-[1.5px] border-[#C9D6F8] bg-white px-5 text-[15px] font-semibold text-accent">
                Unduh CV
              </a>
            )}
            <a href="#contact" className="btn inline-flex h-11 items-center rounded-xl bg-accent px-[22px] text-[15px] font-semibold text-white">
              Hubungi saya
            </a>
          </div>
        </div>
      </header>

      <main id="konten">
        {/* HERO */}
        <section className="relative flex min-h-[520px] md:min-h-[640px] items-center overflow-hidden bg-white">
          <HeroBackground />
          <div className={`${wrap} relative z-10 flex flex-wrap items-center gap-12 py-12 md:py-[72px]`}>
            <div className="flex min-w-0 max-w-[660px] flex-[1_1_520px] flex-col items-start gap-[26px]">
              <div className="inline-flex h-8 items-center gap-2.5 rounded-[10px] border border-[#C9D6F8] bg-[#E8EEFD] px-3.5 text-sm font-medium text-accent">
                <span aria-hidden className="h-2 w-2 rounded-full bg-[#F2A900]" />
                Sedang mencari kesempatan magang
              </div>
              <h1 lang="en" className="m-0 text-[clamp(34px,5.6vw,72px)] font-extrabold leading-[1.05] tracking-[-0.035em]">
                Data analytics, built toward risk management.
              </h1>
              <p className="m-0 max-w-[565px] text-base text-[#3B4658] md:text-lg">
                Saya {profile.name}, mahasiswa Informatika. Saya mengolah data lewat SQL, dashboard, dan machine learning untuk menjawab pertanyaan nyata.
              </p>
              <div className="flex flex-wrap gap-3.5 pt-1.5">
                <a href="#projects" className="btn inline-flex h-[52px] items-center rounded-[14px] bg-accent px-[30px] text-base font-semibold text-white shadow-[0_8px_20px_rgba(36,71,201,0.25)]">
                  Lihat proyek
                </a>
                <a href="#about" className="btn-ghost inline-flex h-[52px] items-center rounded-[14px] border-2 border-[#C9D6F8] bg-white px-[30px] text-base font-semibold text-accent">
                  Tentang saya
                </a>
              </div>
            </div>
            <div className="relative max-w-[440px] flex-[1_1_320px] pb-7 pr-7">
              <div aria-hidden className="absolute bottom-0 right-0 h-[72%] w-[72%] rotate-[4deg] rounded-[32px] bg-[#C9D6F8]" />
              <div aria-hidden className="absolute -left-5 top-11 h-14 w-14 -rotate-[8deg] rounded-2xl bg-[#E4572E]" />
              <div aria-hidden className="absolute -right-3 top-3.5 h-10 w-10 rounded-full bg-[#F2A900]" />
              <div aria-hidden className="absolute -bottom-1.5 left-6 h-11 w-11 rotate-[10deg] rounded-xl bg-[#0E8F9B]" />
              <div className="relative flex aspect-[1/1.05] items-center justify-center overflow-hidden rounded-[32px] border-2 border-[#0F172A] bg-[#F7F8FA] font-display text-6xl font-extrabold text-[#C9D6F8]">
                {profile.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.photo} alt={`Foto ${profile.name}`} className="h-full w-full object-cover" />
                ) : (
                  <span aria-hidden>{initials}</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* STRIP */}
        <section className="pb-12 md:pb-[72px]">
          <div className={wrap}>
            <div className="flex flex-wrap gap-x-6 gap-y-5 rounded-[18px] border-2 border-transparent p-6" style={ring("#2447C9", "#7C3AED")}>
              {strip.map((s) => (
                <div key={s.label} className="flex flex-[1_1_220px] gap-3.5">
                  <span aria-hidden className="w-[5px] flex-none rounded-[3px]" style={{ background: s.color }} />
                  <div>
                    <div className="text-sm text-[#5B6270]">{s.label}</div>
                    <div className="text-xl font-semibold leading-[1.35]">{s.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mb-0 mt-[18px] text-sm text-[#5B6270]">
              Terbuka untuk magang di bidang data analytics. Hubungi saya lewat{" "}
              <a href="#contact" className="text-accent underline">halaman kontak</a>.
            </p>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="border-y border-[#E3E6EB] bg-[#F7F8FA] py-14 md:py-20">
          <div className={`${wrap} flex flex-col gap-10`}>
            <div className="flex max-w-[760px] flex-col gap-4">
              <div className={eyebrow}>Tentang</div>
              <h2 className={h2}>Sedikit tentang saya</h2>
              <p className="m-0 text-base text-[#3B4658] md:text-lg">
                Saya mahasiswa Informatika yang sedang menyelesaikan proyek akhir. Selain riset di kampus, saya terbiasa membangun sistem sendiri, dari model deep learning sampai website. Dari situ saya belajar melihat data sebagai bahan untuk menjawab pertanyaan nyata, bukan sekadar angka.
              </p>
              <p className="m-0 text-base text-[#3B4658] md:text-lg">
                Saat ini saya fokus membangun fondasi di analisis data: belajar SQL, visualisasi data, dan machine learning. Saya ingin magang untuk menerapkannya di data yang nyata. Arah jangka panjang saya adalah risk management, dan analisis data jadi fondasinya.
              </p>
              <figure className="m-0 mt-2 rounded-r-2xl border-l-[5px] border-accent bg-white px-6 py-5">
                <blockquote lang="en" className="m-0 font-display text-2xl font-bold leading-[1.35] tracking-[-0.015em]">
                  “If you can&apos;t measure it, you can&apos;t manage it.”
                </blockquote>
                <figcaption className="mt-2 text-sm text-[#5B6270]">Prinsip yang saya pegang: ukur dulu, baru kelola.</figcaption>
              </figure>
            </div>
            <div className="flex flex-wrap gap-6">
              {[
                {
                  badge: "Fokus saat ini", title: "Analisis data", desc: "Membangun fondasi untuk menjawab pertanyaan lewat data.", hl: "menjawab pertanyaan",
                  items: ["SQL dan BigQuery untuk mengolah data", "Dashboard di Streamlit dan Data Studio", "Machine learning: clustering, klasifikasi, dan CNN"],
                  icon: "chart" as const, ring: ["#2447C9", "#7C3AED"], dot: "#2447C9", chipBg: "#E8EEFD", chipFg: "#243A8A", top: "linear-gradient(180deg,#DCE6FF 0%,#F6F8FF 100%)",
                },
                {
                  badge: "Arah jangka panjang", title: "Risk management", desc: "Memakai data untuk mengukur dan mengelola risiko.", hl: "mengukur dan mengelola risiko",
                  items: ["Dimulai dari magang di bidang data analytics", "Mengukur lebih dulu, baru mengelola", "Bergerak dari analisis data menuju manajemen risiko"],
                  icon: "matrix" as const, ring: ["#0E8F9B", "#2447C9"], dot: "#0E8F9B", chipBg: "#E3F4F6", chipFg: "#0B5E66", top: "linear-gradient(180deg,#D3F0F3 0%,#F4FBFC 100%)",
                },
              ].map((c) => (
                <article key={c.title} className="frame lift flex min-w-0 flex-[1_1_480px] flex-col gap-[22px] rounded-[22px] p-4" style={{ "--f1": c.ring[0], "--f2": c.ring[1] } as React.CSSProperties}>
                  <div className="overflow-hidden rounded-[14px]" style={{ background: c.top }}>
                    <InView className="w-full">
                      <Illustration kind={c.icon} />
                    </InView>
                  </div>
                  <div className="flex flex-col gap-3.5 px-3.5 pb-3.5">
                    <span className="self-start rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-[0.06em]" style={{ background: c.chipBg, color: c.chipFg }}>{c.badge}</span>
                    <h3 className="m-0 text-[22px] font-bold leading-[1.2] tracking-[-0.02em] md:text-[26px]">{c.title}</h3>
                    <p className="m-0 text-base text-[#3B4658] md:text-lg">{mark(c.desc, c.hl)}</p>
                    <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-base text-[#2A3447]">
                      {c.items.map((i) => (
                        <li key={i} className="flex gap-3">
                          <span aria-hidden className="mt-[9px] h-2 w-2 flex-none rounded-full" style={{ background: c.dot }} />
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* JALUR BELAJAR */}
        <section className="py-14 md:py-20">
          <div className={`${wrap} flex flex-col gap-9`}>
            <SectionHead label="Jalur belajar" title="Dari fondasi data menuju risk management" />
            <InView threshold={0.2} className="flex flex-wrap gap-5">
              {path.map((p, i) => (
                <div key={p.n} style={{ ...rise(i), "--tone": p.line } as React.CSSProperties} className="r-item lift tone flex min-w-0 flex-[1_1_250px] flex-col gap-3 rounded-[20px] bg-white p-5 md:p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl font-display font-extrabold" style={{ background: p.bg, color: p.fg }}>{p.n}</span>
                  <h3 className="m-0 mt-2 text-[22px] font-bold leading-[1.25]">{p.t}</h3>
                  <p className="m-0 text-base text-[#3B4658]">{mark(p.d, p.hl)}</p>
                </div>
              ))}
              <div style={{ ...rise(3), "--tone": "#fff" } as React.CSSProperties} className="r-item lift on-dark flex min-w-0 flex-[1_1_250px] flex-col gap-3 rounded-[20px] bg-accent p-5 text-white md:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white font-display font-extrabold text-accent">04</span>
                <h3 className="m-0 mt-2 text-[22px] font-bold leading-[1.25]">Risk management</h3>
                <p className="m-0 text-base">{mark("Tujuan akhir: memakai data untuk mengukur dan mengelola risiko.", "mengukur dan mengelola risiko")}</p>
              </div>
            </InView>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="border-y border-[#E3E6EB] bg-[#F7F8FA] py-14 md:py-20">
          <div className={`${wrap} flex flex-col gap-9`}>
            <SectionHead label="Keahlian" title={<>Tools yang saya <span className="text-accent">pakai</span></>} />
            <InView threshold={0.2} className="flex flex-wrap gap-5">
              {skills.map((s, k) => {
                const t = themes[s.theme];
                return (
                  <div key={s.title} className="r-item lift tone flex min-w-0 flex-[1_1_220px] flex-col gap-4 rounded-[18px] bg-white p-5 md:p-6" style={{ "--tone": t.ring[0], ...rise(k) } as React.CSSProperties}>
                    <h3 className="m-0 text-lg font-bold">{s.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {s.items.map((i) => (
                        <span key={i} className="rounded-[10px] px-3.5 py-1.5 text-sm font-medium" style={{ background: t.chipBg, color: t.chipFg }}>{i}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </InView>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-14 md:py-20">
          <div className={`${wrap} flex flex-col gap-9`}>
            <SectionHead label="Proyek" title={<>Proyek <span className="text-accent">unggulan</span></>} />
            <ProjectGrid projects={projects} />
          </div>
        </section>

        {/* STORY */}
        <section id="cerita" className="border-y border-[#E3E6EB] bg-[#F7F8FA] py-14 md:py-20">
          <div className={`${wrap} flex flex-col gap-9`}>
            <div className="flex max-w-[760px] flex-col gap-3.5">
              <div className={eyebrow}>Cerita data</div>
              <h2 className={h2}>Dari pertanyaan sampai <span className="text-accent">rekomendasi</span></h2>
              <p className="m-0 text-base text-[#3B4658] md:text-lg">
                Satu analisis, tiga langkah. Klik tiap langkah untuk melihat cara saya bekerja dengan data. Contohnya dari analisis e-commerce Olist, periode 2017–2018.
              </p>
            </div>
            <Story />
          </div>
        </section>

        {/* CERTIFICATES */}
        <section id="certificates" className="py-14 md:py-20">
          <div className={`${wrap} flex flex-col gap-9`}>
            <SectionHead label="Sertifikat" title="Kursus dan sertifikat" />
            <div className="flex flex-wrap gap-5">
              {certificates.map((c) => {
                const t = themes[c.theme];
                return (
                  <div key={c.name} className="lift tone flex min-w-0 flex-[1_1_300px] flex-col gap-1.5 rounded-[18px] bg-white p-5 md:p-6" style={{ "--tone": t.ring[0] } as React.CSSProperties}>
                    <div className="text-sm text-[#5B6270]">{c.issuer}{c.year ? ` · ${c.year}` : ""}</div>
                    <div className="text-lg font-bold leading-[1.35]">{c.name}</div>
                    {c.verifyUrl && (
                      <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="link-u inline-flex min-h-11 items-center text-[15px] font-semibold" style={{ color: t.link }}>
                        Verifikasi sertifikat
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="border-t border-[#E3E6EB] bg-[#F7F8FA] pb-16 pt-14 md:pb-24 md:pt-20">
          <div className={wrap}>
            <div className="flex flex-col items-start gap-6 rounded-[26px] border-2 border-transparent p-[clamp(28px,5vw,56px)]" style={ring("#2447C9", "#7C3AED")}>
              <div className={eyebrow}>Kontak</div>
              <h2 className="m-0 max-w-[720px] text-[clamp(28px,4.6vw,48px)] font-extrabold leading-[1.1] tracking-[-0.03em]">Yuk ngobrol soal kesempatan magang.</h2>
              <p className="m-0 max-w-[580px] text-base text-[#3B4658] md:text-lg">Saya senang cerita lebih jauh soal proyek-proyek saya, atau diskusi tentang bagaimana saya bisa membantu tim Anda.</p>
              <div className="flex flex-wrap gap-3 pt-1">
                <a href={`mailto:${profile.email}`} className="btn inline-flex h-[52px] items-center rounded-[14px] bg-accent px-7 text-base font-semibold text-white">{profile.email}</a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost inline-flex h-[52px] items-center rounded-[14px] border-2 border-[#C9D6F8] bg-white px-7 text-base font-semibold text-accent">LinkedIn</a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-ghost inline-flex h-[52px] items-center rounded-[14px] border-2 border-[#C9D6F8] bg-white px-7 text-base font-semibold text-accent">GitHub</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E3E6EB] py-6">
        <div className={`${wrap} flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-sm text-[#5B6270]`}>
          <span>© 2026 {profile.name}</span>
          <a href="#top" className="inline-flex min-h-11 items-center">Kembali ke atas</a>
        </div>
      </footer>
    </div>
  );
}
