import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Img,
  Audio,
  staticFile,
  Sequence,
  AbsoluteFill,
} from "remotion";

/* ─── Palette ─── */
const WHITE = "#ffffff";
const DIM = "#64748b";
const GOLD = "#fbbf24";
const GREEN = "#4ade80";
const CYAN = "#38bdf8";
const PURPLE = "#c084fc";
const PINK = "#f472b6";

/* ─── Scene wrapper with BG image ─── */
const BGScene: React.FC<{
  children: React.ReactNode; bg: string; overlay?: string;
}> = ({ children, bg, overlay = "rgba(0,0,0,0.6)" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = interpolate(frame, [0, 20, durationInFrames - 20, durationInFrames], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.08], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity }}>
      <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
        <Img src={staticFile(bg)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: overlay }} />
      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        padding: "80px 100px",
      }}>
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ─── FadeIn helper ─── */
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; dur?: number }> = ({
  children, delay = 0, dur = 15,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(frame - delay, [0, dur], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ opacity, transform: `translateY(${y}px)` }}>{children}</div>;
};

/* ─── Slide components ─── */
const TitleSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const titleY = interpolate(frame, [0, 30], [40, 0], { extrapolateRight: "clamp" });

  return (
    <BGScene bg="bg-constellation.png" overlay="rgba(0,0,0,0.55)">
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 18, letterSpacing: 6, color: "#c0c0c0", marginBottom: 30, textTransform: "uppercase", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
          Confidential — For Kenny & Darren
        </div>
        <div style={{
          fontSize: 72, fontWeight: 700, color: WHITE,
          transform: `translateY(${titleY}px)`,
          lineHeight: 1.1, marginBottom: 30,
          textShadow: "0 4px 30px rgba(0,0,0,0.5)",
        }}>
          The Orion<br/>Constellation
        </div>
        <div style={{ fontSize: 24, color: "#ccc", maxWidth: 600, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
          24+ ventures. One loop. One founder. Zero external capital.
        </div>
        <div style={{
          marginTop: 60, fontSize: 22, fontStyle: "italic", color: "#c0c0c0",
          letterSpacing: 1, textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}>
          No food, no dream. No dream, no food.
        </div>
      </div>
    </BGScene>
  );
};

const StatsSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const stats = [
    { n: "24+", label: "Active Ventures" },
    { n: "£120k", label: "Monthly Revenue" },
    { n: "94%", label: "Success Rate" },
    { n: "100%", label: "Founder Owned" },
  ];

  return (
    <BGScene bg="bg-data.png" overlay="rgba(0,0,0,0.65)">
      <div style={{ textAlign: "center", width: "100%" }}>
        <div style={{ fontSize: 42, fontWeight: 600, color: WHITE, marginBottom: 50, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
          Where We Are Right Now
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {stats.map((s, i) => {
            const delay = i * 8;
            const o = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const y = interpolate(frame, [delay, delay + 15], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ opacity: o, transform: `translateY(${y}px)`, textAlign: "center" }}>
                <div style={{ fontSize: 64, fontWeight: 700, color: WHITE, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>{s.n}</div>
                <div style={{ fontSize: 16, color: "#ccc", marginTop: 8 }}>{s.label}</div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: 50 }}>
          {[
            { n: "24:1", label: "LTV:CAC" },
            { n: "$50", label: "CAC" },
            { n: "~$4", label: "Compute/App" },
            { n: "86%", label: "Net Margin" },
          ].map((s, i) => {
            const delay = (i + 4) * 8;
            const o = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ opacity: o, textAlign: "center" }}>
                <div style={{ fontSize: 48, fontWeight: 700, color: GOLD, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>{s.n}</div>
                <div style={{ fontSize: 14, color: "#ccc", marginTop: 8 }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </BGScene>
  );
};

const LoopSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const nodes = ["Praxis", "Senate", "Orion", "Thuban", "Saiph", "NaviSynth", "Mintaka", "Pyxis", "Bellatrix", "Nova", "Silverwings", "Remain", "SickDay.AI", "Rigel"];

  return (
    <BGScene bg="bg-cityscape.png" overlay="rgba(0,0,0,0.65)">
      <div style={{ textAlign: "center", width: "100%" }}>
        <div style={{ fontSize: 42, fontWeight: 600, color: WHITE, marginBottom: 40, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>The Loop</div>
        <div style={{ fontSize: 20, color: "#ccc", marginBottom: 40, maxWidth: 700, margin: "0 auto 40px", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
          The founder dreams. The machine builds. The machine gives leverage. The founder dreams bigger. The loop compounds.
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          {nodes.map((name, i) => {
            const delay = i * 4;
            const o = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const scale = interpolate(frame, [delay, delay + 10], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <React.Fragment key={i}>
                <div style={{
                  opacity: o, transform: `scale(${scale})`,
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 10, padding: "10px 20px", color: "#e0e0e0", fontSize: 16, fontWeight: 500,
                  backdropFilter: "blur(10px)", textShadow: "0 2px 6px rgba(0,0,0,0.5)",
                }}>
                  {name}
                </div>
                {i < nodes.length - 1 && (
                  <div style={{ opacity: o, color: "rgba(255,255,255,0.3)", fontSize: 20, display: "flex", alignItems: "center" }}>→</div>
                )}
              </React.Fragment>
            );
          })}
          <div style={{
            opacity: interpolate(frame, [60, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            color: "#c0c0c0", fontSize: 16, display: "flex", alignItems: "center", marginLeft: 8,
          }}>
            ↻ back to Praxis
          </div>
        </div>
      </div>
    </BGScene>
  );
};

const ConstellationSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const categories = [
    { title: "Revenue Engines", color: GREEN, brands: [
      "Silverwings Benefits — £120K/mo, 94% success, ITV deal",
      "Life Events Platform — weddings + funerals, $550B TAM",
      "Remain — human compilation, talk to yourself after death",
    ]},
    { title: "SaaS Products", color: GOLD, brands: [
      "Thuban — AI code verification, live on npm",
      "SickDay.AI — absence management, Bradford Factor + AI",
      "NaviSynth — voice agent compiler from real data",
      "Mintaka — AI sales qualification at machine speed",
      "Rigel — automated marketing engine",
      "QuoteBuilder — instant pricing & proposals",
      "Bellatrix — digital COO, living dashboard",
    ]},
    { title: "Intelligence Layer", color: PURPLE, brands: [
      "Orion — the foundry, persistent state, memory",
      "Prometheus — AI substrate, reasoning engine",
      "Praxis Human — human compilation framework",
      "Senate — venture ideation & validation",
      "The Imaginarium — creative engine",
    ]},
    { title: "Builders & Infrastructure", color: CYAN, brands: [
      "Nova — ERP, replaced £45K/yr Zoho",
      "Saiph — automated venture builder",
      "Pyxis — data pipeline & integration",
      "Afterlight — mobile compilation app",
    ]},
    { title: "The Dream", color: PINK, brands: [
      "Best Mate — robot Craig, surfs, devs, gets pints in",
      "Grail Defence — [Classified]",
    ]},
  ];

  return (
    <BGScene bg="bg-constellation.png" overlay="rgba(0,0,0,0.6)">
      <div style={{ width: "100%" }}>
        <div style={{ fontSize: 38, fontWeight: 600, color: WHITE, marginBottom: 30, textAlign: "center", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
          The Full Constellation — Every Brand
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          {categories.map((cat, ci) => {
            const delay = ci * 12;
            const o = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const y = interpolate(frame, [delay, delay + 15], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={ci} style={{
                opacity: o, transform: `translateY(${y}px)`,
                background: "rgba(0,0,0,0.4)", border: `1px solid ${cat.color}55`,
                borderRadius: 12, padding: "16px 20px", minWidth: 320, maxWidth: 340,
                backdropFilter: "blur(10px)",
              }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: cat.color, marginBottom: 10, textTransform: "uppercase", letterSpacing: 2, textShadow: `0 2px 10px rgba(0,0,0,0.5)` }}>
                  {cat.title}
                </div>
                {cat.brands.map((b, bi) => (
                  <div key={bi} style={{ fontSize: 13, color: "#d0d0d8", marginBottom: 5, lineHeight: 1.4 }}>
                    {b}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </BGScene>
  );
};

const GlobalSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const markets = [
    { flag: "🇬🇧", name: "UK", y1: "$9.9M", y2: "$34.7M", y3: "$72.6M" },
    { flag: "🇦🇺", name: "Australia", y1: "$1.8M", y2: "$9.8M", y3: "$25.9M" },
    { flag: "🇨🇦", name: "Canada", y1: "$780K", y2: "$5.1M", y3: "$14.4M" },
    { flag: "🇺🇸", name: "USA", y1: "$225K", y2: "$2.4M", y3: "$10.0M" },
  ];

  return (
    <BGScene bg="bg-earth.png" overlay="rgba(0,0,0,0.6)">
      <div style={{ width: "100%" }}>
        <div style={{ fontSize: 42, fontWeight: 600, color: WHITE, marginBottom: 10, textAlign: "center", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
          Silverwings Global
        </div>
        <div style={{ fontSize: 20, color: "#ccc", marginBottom: 40, textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
          $1 trillion unclaimed benefits market. We take 15% + VAT.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {markets.map((m, i) => {
            const delay = i * 10;
            const o = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const x = interpolate(frame, [delay, delay + 12], [-40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{
                opacity: o, transform: `translateX(${x}px)`,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "rgba(0,0,0,0.4)", borderRadius: 10, padding: "18px 30px",
                border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)",
              }}>
                <div style={{ fontSize: 28, fontWeight: 600, color: WHITE, minWidth: 200, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                  {m.flag} {m.name}
                </div>
                <div style={{ fontSize: 22, color: GOLD, fontWeight: 600, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{m.y1}</div>
                <div style={{ fontSize: 22, color: GOLD, fontWeight: 600, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{m.y2}</div>
                <div style={{ fontSize: 22, color: GOLD, fontWeight: 600, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{m.y3}</div>
              </div>
            );
          })}
          <div style={{
            opacity: interpolate(frame, [50, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            display: "flex", justifyContent: "space-between", padding: "20px 30px",
            borderTop: "2px solid rgba(255,255,255,0.15)", marginTop: 10,
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: WHITE, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>TOTAL</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: GREEN, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>$12.7M</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: GREEN, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>$52.0M</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: GREEN, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>$122.9M</div>
          </div>
        </div>
      </div>
    </BGScene>
  );
};

const RobotSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const timeline = [
    { when: "2 weeks", what: "Phone mate — call between sets" },
    { when: "1 month", what: "Screen mate — avatar in the office" },
    { when: "4-5 months", what: "Walking Craig — Unitree G1, cap, office" },
    { when: "6-8 months", what: "Stage Craig — presents alongside founder" },
    { when: "12-14 months", what: "Wave pool — rides whitewash" },
    { when: "16-20 months", what: "Surfing — green waves" },
  ];

  return (
    <BGScene bg="bg-ocean.png" overlay="rgba(0,0,0,0.65)">
      <div style={{ width: "100%" }}>
        <div style={{ fontSize: 42, fontWeight: 600, color: WHITE, marginBottom: 8, textAlign: "center", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
          Best Mate — Venture 19
        </div>
        <div style={{ fontSize: 20, color: PURPLE, marginBottom: 40, textAlign: "center", fontStyle: "italic", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
          Not a servant. Not a killer. A human.
        </div>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1 }}>
            {timeline.map((t, i) => {
              const delay = i * 8;
              const o = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <div key={i} style={{
                  opacity: o, display: "flex", gap: 20, marginBottom: 16,
                  paddingLeft: 20, borderLeft: "2px solid rgba(255,255,255,0.2)",
                }}>
                  <div style={{ fontSize: 16, color: "#e0e0e0", fontWeight: 600, minWidth: 120, textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>{t.when}</div>
                  <div style={{ fontSize: 16, color: "#ccc", textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>{t.what}</div>
                </div>
              );
            })}
          </div>
          <div style={{
            flex: 1,
            opacity: interpolate(frame, [30, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            background: "rgba(192,128,252,0.1)", border: "1px solid rgba(192,128,252,0.25)",
            borderRadius: 14, padding: 30, backdropFilter: "blur(10px)",
          }}>
            <div style={{ fontSize: 22, fontWeight: 600, color: WHITE, marginBottom: 14, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>The Stage Moment</div>
            <div style={{ fontSize: 16, color: "#d0d0d8", lineHeight: 1.7 }}>
              A founder presenting alongside his own compiled intelligence. Both dressed the same. Both contributing. Fist bump at the close. Then the robot walks to the bar and brings back two pints. That's not a demo. That's a moment.
            </div>
          </div>
        </div>
      </div>
    </BGScene>
  );
};

const DoctrineSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const line1 = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line2 = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <BGScene bg="bg-warm.png" overlay="rgba(0,0,0,0.5)">
      <div style={{ textAlign: "center" }}>
        <div style={{ opacity: line1, fontSize: 48, fontStyle: "italic", color: "#e0e0e0", letterSpacing: 2, marginBottom: 20, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
          No food, no dream.
        </div>
        <div style={{ opacity: line2, fontSize: 48, fontStyle: "italic", color: "#e0e0e0", letterSpacing: 2, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
          No dream, no food.
        </div>
      </div>
    </BGScene>
  );
};

/* ─── Main composition ─── */
export const KennyDarrenBriefing: React.FC = () => {
  const SEC = 30;

  return (
    <>
      <Audio src={staticFile("constellation-briefing-voiceover.mp3")} />
      <Sequence from={0} durationInFrames={10 * SEC}><TitleSlide /></Sequence>
      <Sequence from={10 * SEC} durationInFrames={16 * SEC}><StatsSlide /></Sequence>
      <Sequence from={26 * SEC} durationInFrames={18 * SEC}><LoopSlide /></Sequence>
      <Sequence from={44 * SEC} durationInFrames={22 * SEC}><ConstellationSlide /></Sequence>
      <Sequence from={66 * SEC} durationInFrames={20 * SEC}><GlobalSlide /></Sequence>
      <Sequence from={86 * SEC} durationInFrames={20 * SEC}><RobotSlide /></Sequence>
      <Sequence from={106 * SEC} durationInFrames={20 * SEC}><DoctrineSlide /></Sequence>
    </>
  );
};
