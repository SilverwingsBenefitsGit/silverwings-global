import React from "react";
import {
  AbsoluteFill, Audio, Img, useCurrentFrame, useVideoConfig,
  interpolate, Sequence, staticFile,
} from "remotion";

/* ─── Palette ─── */
const CYAN = "#00f6ff";
const GREEN = "#00ff88";
const GOLD = "#fbbf24";
const PURPLE = "#7c3aed";
const BLUE = "#3b82f6";
const ORANGE = "#f97316";
const RED = "#ff4444";
const WHITE = "#ffffff";
const DIM = "#64748b";
const SILVER = "#c0c0c0";

/* ─── Helpers ─── */
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; dur?: number }> = ({
  children, delay = 0, dur = 20,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(frame - delay, [0, dur], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ opacity, transform: `translateY(${y}px)` }}>{children}</div>;
};

const BGScene: React.FC<{
  children: React.ReactNode; from: number; dur: number;
  bg: string; overlay?: string; fadeIn?: number; fadeOut?: number;
}> = ({ children, from, dur, bg, overlay = "rgba(0,0,0,0.6)", fadeIn = 15, fadeOut = 15 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, fadeIn, dur - fadeOut, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, dur], [1.0, 1.08], { extrapolateRight: "clamp" });
  return (
    <Sequence from={from} durationInFrames={dur}>
      <AbsoluteFill style={{ opacity }}>
        <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
          <Img src={staticFile(bg)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </AbsoluteFill>
        <AbsoluteFill style={{ background: overlay }} />
        <AbsoluteFill style={{
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center",
          fontFamily: "'Inter', system-ui, sans-serif", padding: "80px 100px",
        }}>
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
    </Sequence>
  );
};

/* ─── Constellation Star ─── */
const Star: React.FC<{
  name: string; role: string; color: string; x: number; y: number;
  delay: number; size?: number;
}> = ({ name, role, color, x, y, delay, size = 8 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(frame - delay, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow = Math.sin((frame - delay) * 0.05) * 0.3 + 0.7;

  return (
    <div style={{
      position: "absolute", left: x, top: y, opacity,
      transform: `translate(-50%, -50%) scale(${scale})`,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
    }}>
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: color, boxShadow: `0 0 ${20 * glow}px ${color}88, 0 0 ${40 * glow}px ${color}44`,
      }} />
      <div style={{ fontSize: 13, fontWeight: 700, color, whiteSpace: "nowrap", textShadow: `0 0 10px ${color}66` }}>{name}</div>
      <div style={{ fontSize: 9, color: "#aaa", whiteSpace: "nowrap" }}>{role}</div>
    </div>
  );
};

/* ─── Connection Line ─── */
const Line: React.FC<{
  x1: number; y1: number; x2: number; y2: number; color: string; delay: number;
}> = ({ x1, y1, x2, y2, color, delay }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const x2a = x1 + (x2 - x1) * progress;
  const y2a = y1 + (y2 - y1) * progress;
  return (
    <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <line x1={x1} y1={y1} x2={x2a} y2={y2a} stroke={color} strokeWidth={1} strokeOpacity={0.3} />
    </svg>
  );
};

/* ─── Venture card ─── */
const VentureCard: React.FC<{
  name: string; role: string; detail: string; color: string; delay: number;
}> = ({ name, role, detail, color, delay }) => (
  <FadeIn delay={delay}>
    <div style={{
      padding: "20px 28px", background: "rgba(0,0,0,0.4)", border: `1px solid ${color}44`,
      borderRadius: 14, minWidth: 280, maxWidth: 380, backdropFilter: "blur(10px)",
    }}>
      <div style={{ fontSize: 24, fontWeight: 800, color, marginBottom: 4, textShadow: `0 2px 10px rgba(0,0,0,0.5)` }}>{name}</div>
      <div style={{ fontSize: 14, color: SILVER, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: 2 }}>{role}</div>
      <div style={{ fontSize: 15, color: "#ccc", lineHeight: 1.4 }}>{detail}</div>
    </div>
  </FadeIn>
);

/* ─── Ventures data ─── */
const ventures = [
  { name: "Silverwings", role: "Cash Cow", color: GREEN },
  { name: "Nova", role: "Runtime", color: CYAN },
  { name: "NaviSynth", role: "Voice Compiler", color: BLUE },
  { name: "Thuban", role: "Immune System", color: PURPLE },
  { name: "Bellatrix", role: "Digital COO", color: ORANGE },
  { name: "Praxis Human", role: "Identity Compiler", color: RED },
  { name: "Prometheus", role: "Collective Mind", color: GOLD },
  { name: "The Senate", role: "Governance", color: SILVER },
  { name: "Orion", role: "Builder", color: CYAN },
  { name: "Saiph", role: "Skeleton", color: GREEN },
  { name: "Mintaka", role: "Creative Director", color: PURPLE },
  { name: "Pyxis", role: "Eyes", color: BLUE },
  { name: "Rigel", role: "Metabolism", color: ORANGE },
  { name: "SickDay.ai", role: "Live Venture", color: GREEN },
  { name: "QuoteBuilder", role: "Live Venture", color: GREEN },
  { name: "The Imaginarium", role: "The Grail", color: GOLD },
  { name: "Orionos Foundry", role: "The Foundry", color: CYAN },
  { name: "Grail", role: "Classified", color: SILVER },
];

const cx = 960, cy = 480, rx = 360, ry = 280;
const starPositions = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2 - Math.PI / 2;
  return { x: cx + Math.cos(angle) * rx, y: cy + Math.sin(angle) * ry };
});

export const Constellation: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Audio src={staticFile("vo-constellation.mp3")} />

      {/* Scene 1: 0-300 — Opening */}
      <BGScene from={0} dur={300} bg="bg-constellation.png" overlay="rgba(0,0,0,0.5)">
        <FadeIn>
          <div style={{ fontSize: 22, color: "#ccc", letterSpacing: 8, textTransform: "uppercase", marginBottom: 24, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            Twelve months. One founder.
          </div>
        </FadeIn>
        <FadeIn delay={30}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
            <span style={{ fontSize: 160, fontWeight: 900, color: CYAN, textShadow: `0 0 80px ${CYAN}44`, lineHeight: 1 }}>18</span>
            <span style={{ fontSize: 60, fontWeight: 900, color: WHITE, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>Ventures</span>
          </div>
        </FadeIn>
        <FadeIn delay={60}>
          <div style={{ fontSize: 28, color: "#ccc", marginTop: 16, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>400,000 lines of production code</div>
        </FadeIn>
        <FadeIn delay={85}>
          <div style={{ fontSize: 32, color: GREEN, fontWeight: 700, marginTop: 12, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            A living constellation of AI-powered businesses
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 2: 300-900 — Constellation Map */}
      <BGScene from={300} dur={600} bg="bg-constellation.png" overlay="rgba(0,0,0,0.45)" fadeIn={20} fadeOut={20}>
        <div style={{ position: "relative", width: 1920, height: 960 }}>
          {starPositions.map((pos, i) => {
            const next = starPositions[(i + 1) % 18];
            return (
              <Line key={`line-${i}`}
                x1={pos.x} y1={pos.y} x2={next.x} y2={next.y}
                color={ventures[i]?.color || CYAN} delay={i * 8 + 10}
              />
            );
          })}
          {[0, 3, 6, 9, 12, 15].map((i) => (
            <Line key={`cross-${i}`}
              x1={starPositions[i].x} y1={starPositions[i].y}
              x2={cx} y2={cy}
              color={GOLD} delay={i * 8 + 40}
            />
          ))}
          {starPositions.map((pos, i) => {
            const v = ventures[i] || ventures[0];
            return (
              <Star key={i}
                name={v.name} role={v.role} color={v.color}
                x={pos.x} y={pos.y} delay={i * 8}
                size={i === 15 ? 14 : 8}
              />
            );
          })}
          <Star name="The Imaginarium" role="The Grail" color={GOLD}
            x={cx} y={cy} delay={130} size={16}
          />
        </div>
      </BGScene>

      {/* Scene 3: 900-1500 — Revenue Engines */}
      <BGScene from={900} dur={600} bg="bg-cityscape.png" overlay="rgba(0,0,0,0.65)">
        <FadeIn>
          <div style={{ fontSize: 18, color: CYAN, letterSpacing: 6, marginBottom: 24, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>THE REVENUE ENGINES</div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 800 }}>
          <VentureCard name="Silverwings" role="The Cash Cow" color={GREEN} delay={15}
            detail="Benefits AI. 94% success rate. £100k/month and doubling. Voice AI interviews to online submission." />
          <VentureCard name="Nova" role="The Runtime" color={CYAN} delay={40}
            detail="The operating system that runs every venture in the constellation. Endpoints, agents, orchestration." />
          <VentureCard name="NaviSynth" role="Voice Compiler" color={BLUE} delay={65}
            detail="Every call makes the agent smarter. Every conversation deepens the data moat. Compounding flywheel." />
          <VentureCard name="Thuban" role="Immune System" color={PURPLE} delay={90}
            detail="Scanning code for hallucinations before they ship. 69 rules, 10 languages. Live on npm." />
        </div>
      </BGScene>

      {/* Scene 4: 1500-2100 — Intelligence Layer */}
      <BGScene from={1500} dur={600} bg="bg-data.png" overlay="rgba(0,0,0,0.65)">
        <FadeIn>
          <div style={{ fontSize: 18, color: GOLD, letterSpacing: 6, marginBottom: 24, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>THE INTELLIGENCE LAYER</div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 800 }}>
          <VentureCard name="Bellatrix" role="Digital COO" color={ORANGE} delay={15}
            detail="The nervous system. Every metric, every company. Self-assembling dashboards. Auto-healing." />
          <VentureCard name="Praxis Human" role="Identity Compiler" color={RED} delay={40}
            detail="The founder's mind — structured, executable data. Doctrine, taste, judgement, refusals. Compiled." />
          <VentureCard name="Prometheus" role="Collective Mind" color={GOLD} delay={65}
            detail="30 AI agents across 9 providers reaching consensus. Multi-model reasoning at scale." />
          <VentureCard name="The Senate" role="Governance" color={SILVER} delay={90}
            detail="Every decision evaluated against the founder's doctrine. The constitutional layer." />
        </div>
      </BGScene>

      {/* Scene 5: 2100-2550 — The Builders */}
      <BGScene from={2100} dur={450} bg="bg-ocean.png" overlay="rgba(0,0,0,0.6)">
        <FadeIn>
          <div style={{ fontSize: 18, color: GREEN, letterSpacing: 6, marginBottom: 24, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>THE BUILDERS & THE WATCHERS</div>
        </FadeIn>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", maxWidth: 1000 }}>
          {[
            { name: "Orion", role: "Code at 18x speed", color: CYAN },
            { name: "Saiph", role: "SaaS in 4 minutes", color: GREEN },
            { name: "Mintaka", role: "Creative Director", color: PURPLE },
            { name: "Pyxis", role: "Competitor Intel", color: BLUE },
            { name: "Rigel", role: "The Metabolism", color: ORANGE },
            { name: "SickDay.ai", role: "Live & paying", color: GREEN },
            { name: "QuoteBuilder", role: "Live & paying", color: GREEN },
          ].map((v, i) => (
            <FadeIn key={i} delay={15 + i * 15}>
              <div style={{
                padding: "16px 24px", background: "rgba(0,0,0,0.4)", border: `1px solid ${v.color}44`,
                borderRadius: 12, minWidth: 180, textAlign: "center", backdropFilter: "blur(10px)",
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: v.color, textShadow: `0 2px 10px rgba(0,0,0,0.5)` }}>{v.name}</div>
                <div style={{ fontSize: 12, color: "#ccc", marginTop: 4 }}>{v.role}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </BGScene>

      {/* Scene 6: 2550-3150 — The Imaginarium */}
      <BGScene from={2550} dur={600} bg="bg-warm.png" overlay="rgba(0,0,0,0.55)" fadeIn={25} fadeOut={25}>
        <FadeIn>
          <div style={{
            width: 120, height: 120, borderRadius: "50%", marginBottom: 24,
            background: `radial-gradient(circle, ${GOLD}44, ${GOLD}00)`,
            border: `2px solid ${GOLD}66`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 60px ${GOLD}33, 0 0 120px ${GOLD}11`,
          }}>
            <div style={{ fontSize: 48 }}>&#10022;</div>
          </div>
        </FadeIn>
        <FadeIn delay={20}>
          <div style={{ fontSize: 48, fontWeight: 900, color: GOLD, textShadow: `0 0 40px ${GOLD}44` }}>
            The Imaginarium
          </div>
        </FadeIn>
        <FadeIn delay={45}>
          <div style={{ fontSize: 22, color: SILVER, letterSpacing: 4, marginTop: 8, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>THE GRAIL</div>
        </FadeIn>
        <FadeIn delay={70}>
          <div style={{
            maxWidth: 700, textAlign: "center", marginTop: 24,
            fontSize: 22, color: WHITE, lineHeight: 1.6, fontWeight: 300,
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          }}>
            A system that preserves a human being's reasoning, taste, judgement, and voice.
            <br /><span style={{ color: GOLD, fontWeight: 600 }}>Beyond biological failure.</span>
          </div>
        </FadeIn>
        <FadeIn delay={110}>
          <div style={{ fontSize: 18, color: "#ccc", marginTop: 20, fontStyle: "italic", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            The dream that everything else funds.
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 7: 3150-3750 — The Loop */}
      <BGScene from={3150} dur={600} bg="bg-constellation.png" overlay="rgba(0,0,0,0.55)">
        <FadeIn>
          <div style={{ fontSize: 42, fontWeight: 900, color: WHITE, textAlign: "center", lineHeight: 1.3, maxWidth: 800, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
            This is not a portfolio of startups.
          </div>
        </FadeIn>
        <FadeIn delay={30}>
          <div style={{
            fontSize: 42, fontWeight: 900, textAlign: "center", marginTop: 8,
            background: `linear-gradient(135deg, ${CYAN}, ${GREEN})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            This is a self-replicating venture factory.
          </div>
        </FadeIn>
        <FadeIn delay={70}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 36, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { label: "Founder dreams", color: GOLD },
              { label: "Machine builds", color: CYAN },
              { label: "Machine gives leverage", color: GREEN },
              { label: "Founder dreams bigger", color: PURPLE },
            ].map((step, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span style={{ fontSize: 20, color: "#aaa" }}>→</span>}
                <FadeIn delay={80 + i * 15}>
                  <div style={{
                    padding: "14px 24px", background: "rgba(0,0,0,0.4)",
                    border: `1px solid ${step.color}55`, borderRadius: 10, backdropFilter: "blur(10px)",
                  }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: step.color, textShadow: `0 2px 10px rgba(0,0,0,0.5)` }}>{step.label}</span>
                  </div>
                </FadeIn>
              </React.Fragment>
            ))}
            <span style={{ fontSize: 20, color: GOLD }}>↻</span>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <div style={{ fontSize: 28, color: GREEN, fontWeight: 700, marginTop: 30, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            The loop compounds.
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 8: 3750-4350 — Financial Projections */}
      <BGScene from={3750} dur={600} bg="bg-data.png" overlay="rgba(0,0,0,0.6)">
        <FadeIn>
          <div style={{ display: "flex", gap: 60, marginBottom: 16 }}>
            {[
              { label: "Ventures", value: "18", color: CYAN },
              { label: "Founder", value: "1", color: GREEN },
              { label: "Months", value: "12", color: GOLD },
              { label: "Starting Point", value: "Zero", color: RED },
            ].map((stat, i) => (
              <FadeIn key={i} delay={10 + i * 12}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 48, fontWeight: 900, color: stat.color, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>{stat.value}</div>
                  <div style={{ fontSize: 14, color: "#ccc" }}>{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={70}>
          <div style={{ display: "flex", gap: 50, marginTop: 20, alignItems: "flex-end" }}>
            {[
              { year: "Year 1", amount: "$12.7M", height: 60, color: BLUE },
              { year: "Year 2", amount: "$52M", height: 150, color: PURPLE },
              { year: "Year 3", amount: "$123M", height: 280, color: GREEN },
            ].map((yr, i) => (
              <FadeIn key={i} delay={80 + i * 15}>
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: yr.color, marginBottom: 8, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>{yr.amount}</div>
                  <div style={{
                    width: 100, height: yr.height,
                    background: `linear-gradient(180deg, ${yr.color}, ${yr.color}66)`,
                    borderRadius: "8px 8px 0 0", boxShadow: `0 0 30px ${yr.color}33`,
                  }} />
                  <div style={{ fontSize: 16, color: "#ccc", marginTop: 10, fontWeight: 600 }}>{yr.year}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={160}>
          <div style={{ display: "flex", gap: 40, marginTop: 24 }}>
            {[
              { label: "100% founder owned", color: GREEN },
              { label: "Zero dilution", color: CYAN },
              { label: "Cashflow funded", color: GOLD },
            ].map((badge, i) => (
              <div key={i} style={{ padding: "10px 20px", background: "rgba(0,0,0,0.4)", border: `1px solid ${badge.color}44`, borderRadius: 8, backdropFilter: "blur(10px)" }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: badge.color, textShadow: `0 2px 10px rgba(0,0,0,0.5)` }}>{badge.label}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 9: 4350-4800 — The Question */}
      <BGScene from={4350} dur={450} bg="bg-earth.png" overlay="rgba(0,0,0,0.5)">
        <FadeIn>
          <div style={{ fontSize: 20, color: "#ccc", letterSpacing: 6, marginBottom: 20, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>NO VENTURE CAPITAL. NO BOARD SEATS.</div>
        </FadeIn>
        <FadeIn delay={25}>
          <div style={{ fontSize: 54, fontWeight: 900, color: WHITE, textAlign: "center", lineHeight: 1.3, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
            The question was never<br />
            <span style={{ color: CYAN }}>&ldquo;can one person build this?&rdquo;</span>
          </div>
        </FadeIn>
        <FadeIn delay={60}>
          <div style={{ fontSize: 54, fontWeight: 900, color: WHITE, textAlign: "center", marginTop: 16, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
            The question is<br />
            <span style={{ color: GREEN }}>&ldquo;can anyone else keep up?&rdquo;</span>
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 10: 4800-5100 — Doctrine */}
      <BGScene from={4800} dur={300} bg="bg-constellation.png" overlay="rgba(0,0,0,0.45)" fadeOut={1}>
        <FadeIn dur={30}>
          <div style={{
            fontSize: 52, fontWeight: 300, color: "#e0e0e0",
            textAlign: "center", lineHeight: 1.5, letterSpacing: 2,
            textShadow: `0 0 40px ${SILVER}33`,
          }}>
            No food, no dream.
            <br />
            No dream, no food.
          </div>
        </FadeIn>
        <FadeIn delay={50}>
          <div style={{
            marginTop: 40, width: 80, height: 1,
            background: `linear-gradient(90deg, transparent, ${SILVER}, transparent)`,
          }} />
        </FadeIn>
        <FadeIn delay={70}>
          <div style={{ fontSize: 14, color: "#ccc", marginTop: 20, letterSpacing: 4, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            THE ORION CONSTELLATION
          </div>
        </FadeIn>
      </BGScene>
    </AbsoluteFill>
  );
};
