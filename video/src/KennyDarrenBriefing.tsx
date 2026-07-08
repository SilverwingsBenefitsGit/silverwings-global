import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Img,
  Audio,
  staticFile,
  Sequence,
} from "remotion";

/* ─── Scene wrapper ─── */
const Scene: React.FC<{
  children: React.ReactNode;
  bg?: string;
}> = ({ children, bg = "#0a0a0f" }) => (
  <div style={{
    width: "100%", height: "100%", display: "flex", flexDirection: "column",
    justifyContent: "center", alignItems: "center", background: bg,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: "80px 100px", position: "relative",
  }}>{children}</div>
);

/* ─── Fade in/out helper ─── */
const useFade = (fadeIn = 15, fadeOut = 15) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return interpolate(frame, [0, fadeIn, durationInFrames - fadeOut, durationInFrames], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
};

/* ─── Slide components ─── */
const TitleSlide: React.FC = () => {
  const opacity = useFade(20, 20);
  const frame = useCurrentFrame();
  const titleY = interpolate(frame, [0, 30], [40, 0], { extrapolateRight: "clamp" });

  return (
    <Scene>
      <div style={{ opacity, textAlign: "center" }}>
        <div style={{ fontSize: 18, letterSpacing: 6, color: "#c0c0c0", marginBottom: 30, textTransform: "uppercase" }}>
          Confidential — For Kenny & Darren
        </div>
        <div style={{
          fontSize: 72, fontWeight: 700, color: "#fff",
          transform: `translateY(${titleY}px)`,
          lineHeight: 1.1, marginBottom: 30,
        }}>
          The Orion<br/>Constellation
        </div>
        <div style={{ fontSize: 24, color: "#888", maxWidth: 600 }}>
          24+ ventures. One loop. One founder. Zero external capital.
        </div>
        <div style={{
          marginTop: 60, fontSize: 22, fontStyle: "italic", color: "#c0c0c0",
          letterSpacing: 1,
        }}>
          No food, no dream. No dream, no food.
        </div>
      </div>
    </Scene>
  );
};

const StatsSlide: React.FC = () => {
  const opacity = useFade();
  const frame = useCurrentFrame();

  const stats = [
    { n: "24+", label: "Active Ventures" },
    { n: "£120k", label: "Monthly Revenue" },
    { n: "94%", label: "Success Rate" },
    { n: "100%", label: "Founder Owned" },
  ];

  return (
    <Scene>
      <div style={{ opacity, textAlign: "center", width: "100%" }}>
        <div style={{ fontSize: 42, fontWeight: 600, color: "#fff", marginBottom: 50 }}>
          Where We Are Right Now
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {stats.map((s, i) => {
            const delay = i * 8;
            const o = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const y = interpolate(frame, [delay, delay + 15], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ opacity: o, transform: `translateY(${y}px)`, textAlign: "center" }}>
                <div style={{ fontSize: 64, fontWeight: 700, color: "#fff" }}>{s.n}</div>
                <div style={{ fontSize: 16, color: "#888", marginTop: 8 }}>{s.label}</div>
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
                <div style={{ fontSize: 48, fontWeight: 700, color: "#fbbf24" }}>{s.n}</div>
                <div style={{ fontSize: 14, color: "#888", marginTop: 8 }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Scene>
  );
};

const LoopSlide: React.FC = () => {
  const opacity = useFade();
  const frame = useCurrentFrame();
  const nodes = ["Praxis", "Senate", "Orion", "Thuban", "Saiph", "NaviSynth", "Mintaka", "Pyxis", "Bellatrix", "Nova", "Silverwings", "Remain", "SickDay.AI", "Rigel"];

  return (
    <Scene>
      <div style={{ opacity, textAlign: "center", width: "100%" }}>
        <div style={{ fontSize: 42, fontWeight: 600, color: "#fff", marginBottom: 40 }}>The Loop</div>
        <div style={{ fontSize: 20, color: "#888", marginBottom: 40, maxWidth: 700, margin: "0 auto 40px" }}>
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
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 10, padding: "10px 20px", color: "#c0c0c0", fontSize: 16, fontWeight: 500,
                }}>
                  {name}
                </div>
                {i < nodes.length - 1 && (
                  <div style={{ opacity: o, color: "rgba(255,255,255,0.2)", fontSize: 20, display: "flex", alignItems: "center" }}>→</div>
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
    </Scene>
  );
};

/* ─── Full constellation by category ─── */
const ConstellationSlide: React.FC = () => {
  const opacity = useFade();
  const frame = useCurrentFrame();

  const categories = [
    { title: "Revenue Engines", color: "#4ade80", brands: [
      "Silverwings Benefits — £120K/mo, 94% success, ITV deal",
      "Life Events Platform — weddings + funerals, $550B TAM",
      "Remain — human compilation, talk to yourself after death",
    ]},
    { title: "SaaS Products", color: "#fbbf24", brands: [
      "Thuban — AI code verification, live on npm",
      "SickDay.AI — absence management, Bradford Factor + AI",
      "NaviSynth — voice agent compiler from real data",
      "Mintaka — AI sales qualification at machine speed",
      "Rigel — automated marketing engine",
      "QuoteBuilder — instant pricing & proposals",
      "Bellatrix — digital COO, living dashboard",
    ]},
    { title: "Intelligence Layer", color: "#c084fc", brands: [
      "Orion — the foundry, persistent state, memory",
      "Prometheus — AI substrate, reasoning engine",
      "Praxis Human — human compilation framework",
      "Senate — venture ideation & validation",
      "The Imaginarium — creative engine",
    ]},
    { title: "Builders & Infrastructure", color: "#38bdf8", brands: [
      "Nova — ERP, replaced £45K/yr Zoho",
      "Saiph — automated venture builder",
      "Pyxis — data pipeline & integration",
      "Afterlight — mobile compilation app",
    ]},
    { title: "The Dream", color: "#f472b6", brands: [
      "Best Mate — robot Craig, surfs, devs, gets pints in",
      "Grail Defence — [Classified]",
    ]},
  ];

  return (
    <Scene>
      <div style={{ opacity, width: "100%" }}>
        <div style={{ fontSize: 38, fontWeight: 600, color: "#fff", marginBottom: 30, textAlign: "center" }}>
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
                background: "rgba(255,255,255,0.03)", border: `1px solid ${cat.color}33`,
                borderRadius: 12, padding: "16px 20px", minWidth: 320, maxWidth: 340,
              }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: cat.color, marginBottom: 10, textTransform: "uppercase", letterSpacing: 2 }}>
                  {cat.title}
                </div>
                {cat.brands.map((b, bi) => (
                  <div key={bi} style={{ fontSize: 13, color: "#b0b0b8", marginBottom: 5, lineHeight: 1.4 }}>
                    {b}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Scene>
  );
};

const GlobalSlide: React.FC = () => {
  const opacity = useFade();
  const frame = useCurrentFrame();
  const markets = [
    { flag: "🇬🇧", name: "UK", y1: "$9.9M", y2: "$34.7M", y3: "$72.6M" },
    { flag: "🇦🇺", name: "Australia", y1: "$1.8M", y2: "$9.8M", y3: "$25.9M" },
    { flag: "🇨🇦", name: "Canada", y1: "$780K", y2: "$5.1M", y3: "$14.4M" },
    { flag: "🇺🇸", name: "USA", y1: "$225K", y2: "$2.4M", y3: "$10.0M" },
  ];

  return (
    <Scene>
      <div style={{ opacity, width: "100%" }}>
        <div style={{ fontSize: 42, fontWeight: 600, color: "#fff", marginBottom: 10, textAlign: "center" }}>
          Silverwings Global
        </div>
        <div style={{ fontSize: 20, color: "#888", marginBottom: 40, textAlign: "center" }}>
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
                background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "18px 30px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div style={{ fontSize: 28, fontWeight: 600, color: "#fff", minWidth: 200 }}>
                  {m.flag} {m.name}
                </div>
                <div style={{ fontSize: 22, color: "#fbbf24", fontWeight: 600 }}>{m.y1}</div>
                <div style={{ fontSize: 22, color: "#fbbf24", fontWeight: 600 }}>{m.y2}</div>
                <div style={{ fontSize: 22, color: "#fbbf24", fontWeight: 600 }}>{m.y3}</div>
              </div>
            );
          })}
          <div style={{
            opacity: interpolate(frame, [50, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            display: "flex", justifyContent: "space-between", padding: "20px 30px",
            borderTop: "2px solid rgba(255,255,255,0.1)", marginTop: 10,
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#fff" }}>TOTAL</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#4ade80" }}>$12.7M</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#4ade80" }}>$52.0M</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#4ade80" }}>$122.9M</div>
          </div>
        </div>
      </div>
    </Scene>
  );
};

const RobotSlide: React.FC = () => {
  const opacity = useFade();
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
    <Scene>
      <div style={{ opacity, width: "100%" }}>
        <div style={{ fontSize: 42, fontWeight: 600, color: "#fff", marginBottom: 8, textAlign: "center" }}>
          Best Mate — Venture 19
        </div>
        <div style={{ fontSize: 20, color: "#c084fc", marginBottom: 40, textAlign: "center", fontStyle: "italic" }}>
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
                  paddingLeft: 20, borderLeft: "2px solid rgba(192,192,192,0.15)",
                }}>
                  <div style={{ fontSize: 16, color: "#c0c0c0", fontWeight: 600, minWidth: 120 }}>{t.when}</div>
                  <div style={{ fontSize: 16, color: "#888" }}>{t.what}</div>
                </div>
              );
            })}
          </div>
          <div style={{
            flex: 1,
            opacity: interpolate(frame, [30, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            background: "rgba(192,128,252,0.05)", border: "1px solid rgba(192,128,252,0.2)",
            borderRadius: 14, padding: 30,
          }}>
            <div style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 14 }}>The Stage Moment</div>
            <div style={{ fontSize: 16, color: "#b0b0b8", lineHeight: 1.7 }}>
              A founder presenting alongside his own compiled intelligence. Both dressed the same. Both contributing. Fist bump at the close. Then the robot walks to the bar and brings back two pints. That's not a demo. That's a moment.
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
};

const DoctrineSlide: React.FC = () => {
  const opacity = useFade(30, 1);
  const frame = useCurrentFrame();
  const line1 = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line2 = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <Scene>
      <div style={{ textAlign: "center" }}>
        <div style={{ opacity: line1, fontSize: 48, fontStyle: "italic", color: "#c0c0c0", letterSpacing: 2, marginBottom: 20 }}>
          No food, no dream.
        </div>
        <div style={{ opacity: line2, fontSize: 48, fontStyle: "italic", color: "#c0c0c0", letterSpacing: 2 }}>
          No dream, no food.
        </div>
      </div>
    </Scene>
  );
};

/* ─── Main composition ─── */
export const KennyDarrenBriefing: React.FC = () => {
  const SEC = 30; // 30fps

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
