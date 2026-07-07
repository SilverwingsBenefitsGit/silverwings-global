import React from "react";
import {
  AbsoluteFill, Audio, useCurrentFrame, useVideoConfig,
  interpolate, Sequence, staticFile,
} from "remotion";

/* ─── Palette ─── */
const BG = "#0a0a1a";
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

const SceneWrap: React.FC<{
  children: React.ReactNode; from: number; dur: number; fadeIn?: number; fadeOut?: number;
}> = ({ children, from, dur, fadeIn = 15, fadeOut = 15 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [from, from + fadeIn, from + dur - fadeOut, from + dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <Sequence from={from} durationInFrames={dur}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity, flexDirection: "column" }}>
        {children}
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
      <div style={{ fontSize: 9, color: DIM, whiteSpace: "nowrap" }}>{role}</div>
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

/* ─── Venture card for showcase scenes ─── */
const VentureCard: React.FC<{
  name: string; role: string; detail: string; color: string; delay: number;
}> = ({ name, role, detail, color, delay }) => (
  <FadeIn delay={delay}>
    <div style={{
      padding: "20px 28px", background: `${color}0a`, border: `1px solid ${color}33`,
      borderRadius: 14, minWidth: 280, maxWidth: 380,
    }}>
      <div style={{ fontSize: 24, fontWeight: 800, color, marginBottom: 4 }}>{name}</div>
      <div style={{ fontSize: 14, color: SILVER, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: 2 }}>{role}</div>
      <div style={{ fontSize: 15, color: DIM, lineHeight: 1.4 }}>{detail}</div>
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

/* Star positions in constellation ring */
const cx = 960, cy = 480, rx = 360, ry = 280;
const starPositions = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2 - Math.PI / 2;
  return { x: cx + Math.cos(angle) * rx, y: cy + Math.sin(angle) * ry };
});

/*
 * VO timing (~166s = 4980 frames @ 30fps, padded to 5100):
 *
 * 0-300 (0-10s):     Opening — "Twelve months ago..."
 * 300-900 (10-30s):  Constellation map — all 18 ventures appear as stars
 * 900-1500 (30-50s): Revenue engines — Silverwings + Nova + NaviSynth + Thuban
 * 1500-2100 (50-70s): Intelligence — Bellatrix + Praxis + Prometheus + Senate
 * 2100-2550 (70-85s): Builders — Orion + Saiph + Mintaka + Pyxis + Rigel + SickDay + QB
 * 2550-3150 (85-105s): The Imaginarium — the grail (emotional peak)
 * 3150-3750 (105-125s): The loop — self-replicating venture factory
 * 3750-4350 (125-145s): Financial projections + zero dilution
 * 4350-4800 (145-160s): "The question" — closing statement
 * 4800-5100 (160-170s): Doctrine stamp — hold
 */

export const Constellation: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Audio src={staticFile("vo-constellation.mp3")} />

      {/* Subtle star field background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(1px 1px at 100px 200px, ${WHITE}15, transparent),
          radial-gradient(1px 1px at 400px 100px, ${WHITE}10, transparent),
          radial-gradient(1px 1px at 700px 400px, ${WHITE}12, transparent),
          radial-gradient(1px 1px at 1200px 150px, ${WHITE}08, transparent),
          radial-gradient(1px 1px at 1500px 300px, ${WHITE}15, transparent),
          radial-gradient(1px 1px at 1800px 500px, ${WHITE}10, transparent),
          radial-gradient(1px 1px at 300px 600px, ${WHITE}12, transparent),
          radial-gradient(1px 1px at 900px 700px, ${WHITE}08, transparent),
          radial-gradient(1px 1px at 1600px 800px, ${WHITE}15, transparent),
          radial-gradient(1px 1px at 500px 900px, ${WHITE}10, transparent)`,
      }} />

      {/* ═══ Scene 1: 0-300 — Opening ═══ */}
      <SceneWrap from={0} dur={300}>
        <FadeIn>
          <div style={{ fontSize: 22, color: DIM, letterSpacing: 8, textTransform: "uppercase", marginBottom: 24 }}>
            Twelve months. One founder.
          </div>
        </FadeIn>
        <FadeIn delay={30}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
            <span style={{ fontSize: 160, fontWeight: 900, color: CYAN, textShadow: `0 0 80px ${CYAN}44`, lineHeight: 1 }}>18</span>
            <span style={{ fontSize: 60, fontWeight: 900, color: WHITE }}>Ventures</span>
          </div>
        </FadeIn>
        <FadeIn delay={60}>
          <div style={{ fontSize: 28, color: DIM, marginTop: 16 }}>400,000 lines of production code</div>
        </FadeIn>
        <FadeIn delay={85}>
          <div style={{ fontSize: 32, color: GREEN, fontWeight: 700, marginTop: 12 }}>
            A living constellation of AI-powered businesses
          </div>
        </FadeIn>
      </SceneWrap>

      {/* ═══ Scene 2: 300-900 — Constellation Map ═══ */}
      <SceneWrap from={300} dur={600} fadeIn={20} fadeOut={20}>
        <div style={{ position: "relative", width: 1920, height: 960 }}>
          {/* Connection lines */}
          {starPositions.map((pos, i) => {
            const next = starPositions[(i + 1) % 18];
            return (
              <Line key={`line-${i}`}
                x1={pos.x} y1={pos.y} x2={next.x} y2={next.y}
                color={ventures[i]?.color || CYAN} delay={i * 8 + 10}
              />
            );
          })}
          {/* Cross connections to centre (Imaginarium) */}
          {[0, 3, 6, 9, 12, 15].map((i) => (
            <Line key={`cross-${i}`}
              x1={starPositions[i].x} y1={starPositions[i].y}
              x2={cx} y2={cy}
              color={GOLD} delay={i * 8 + 40}
            />
          ))}
          {/* Stars */}
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
          {/* Centre: Imaginarium */}
          <Star name="The Imaginarium" role="The Grail" color={GOLD}
            x={cx} y={cy} delay={130} size={16}
          />
        </div>
      </SceneWrap>

      {/* ═══ Scene 3: 900-1500 — Revenue Engines ═══ */}
      <SceneWrap from={900} dur={600}>
        <FadeIn>
          <div style={{ fontSize: 18, color: CYAN, letterSpacing: 6, marginBottom: 24 }}>THE REVENUE ENGINES</div>
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
      </SceneWrap>

      {/* ═══ Scene 4: 1500-2100 — Intelligence Layer ═══ */}
      <SceneWrap from={1500} dur={600}>
        <FadeIn>
          <div style={{ fontSize: 18, color: GOLD, letterSpacing: 6, marginBottom: 24 }}>THE INTELLIGENCE LAYER</div>
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
      </SceneWrap>

      {/* ═══ Scene 5: 2100-2550 — The Builders ═══ */}
      <SceneWrap from={2100} dur={450}>
        <FadeIn>
          <div style={{ fontSize: 18, color: GREEN, letterSpacing: 6, marginBottom: 24 }}>THE BUILDERS & THE WATCHERS</div>
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
                padding: "16px 24px", background: `${v.color}0a`, border: `1px solid ${v.color}33`,
                borderRadius: 12, minWidth: 180, textAlign: "center",
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: v.color }}>{v.name}</div>
                <div style={{ fontSize: 12, color: DIM, marginTop: 4 }}>{v.role}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </SceneWrap>

      {/* ═══ Scene 6: 2550-3150 — The Imaginarium ═══ */}
      <SceneWrap from={2550} dur={600} fadeIn={25} fadeOut={25}>
        <FadeIn>
          <div style={{
            width: 120, height: 120, borderRadius: "50%", marginBottom: 24,
            background: `radial-gradient(circle, ${GOLD}44, ${GOLD}00)`,
            border: `2px solid ${GOLD}66`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 60px ${GOLD}33, 0 0 120px ${GOLD}11`,
            animation: "pulse 3s ease-in-out infinite",
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
          <div style={{ fontSize: 22, color: SILVER, letterSpacing: 4, marginTop: 8 }}>THE GRAIL</div>
        </FadeIn>
        <FadeIn delay={70}>
          <div style={{
            maxWidth: 700, textAlign: "center", marginTop: 24,
            fontSize: 22, color: WHITE, lineHeight: 1.6, fontWeight: 300,
          }}>
            A system that preserves a human being's reasoning, taste, judgement, and voice.
            <br /><span style={{ color: GOLD, fontWeight: 600 }}>Beyond biological failure.</span>
          </div>
        </FadeIn>
        <FadeIn delay={110}>
          <div style={{ fontSize: 18, color: DIM, marginTop: 20, fontStyle: "italic" }}>
            The dream that everything else funds.
          </div>
        </FadeIn>
      </SceneWrap>

      {/* ═══ Scene 7: 3150-3750 — The Loop ═══ */}
      <SceneWrap from={3150} dur={600}>
        <FadeIn>
          <div style={{ fontSize: 42, fontWeight: 900, color: WHITE, textAlign: "center", lineHeight: 1.3, maxWidth: 800 }}>
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
                {i > 0 && <span style={{ fontSize: 20, color: DIM }}>→</span>}
                <FadeIn delay={80 + i * 15}>
                  <div style={{
                    padding: "14px 24px", background: `${step.color}12`,
                    border: `1px solid ${step.color}44`, borderRadius: 10,
                  }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: step.color }}>{step.label}</span>
                  </div>
                </FadeIn>
              </React.Fragment>
            ))}
            <span style={{ fontSize: 20, color: GOLD }}>↻</span>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <div style={{ fontSize: 28, color: GREEN, fontWeight: 700, marginTop: 30 }}>
            The loop compounds.
          </div>
        </FadeIn>
      </SceneWrap>

      {/* ═══ Scene 8: 3750-4350 — Financial Projections ═══ */}
      <SceneWrap from={3750} dur={600}>
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
                  <div style={{ fontSize: 48, fontWeight: 900, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: 14, color: DIM }}>{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        {/* Revenue bars */}
        <FadeIn delay={70}>
          <div style={{ display: "flex", gap: 50, marginTop: 20, alignItems: "flex-end" }}>
            {[
              { year: "Year 1", amount: "$12.7M", height: 60, color: BLUE },
              { year: "Year 2", amount: "$52M", height: 150, color: PURPLE },
              { year: "Year 3", amount: "$123M", height: 280, color: GREEN },
            ].map((yr, i) => {
              const barH = interpolate(frame - 3820 - i * 15, [0, 40], [0, yr.height], {
                extrapolateLeft: "clamp", extrapolateRight: "clamp",
              });
              return (
                <FadeIn key={i} delay={80 + i * 15}>
                  <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: yr.color, marginBottom: 8 }}>{yr.amount}</div>
                    <div style={{
                      width: 100, height: barH, minHeight: 4,
                      background: `linear-gradient(180deg, ${yr.color}, ${yr.color}66)`,
                      borderRadius: "8px 8px 0 0", boxShadow: `0 0 30px ${yr.color}33`,
                    }} />
                    <div style={{ fontSize: 16, color: DIM, marginTop: 10, fontWeight: 600 }}>{yr.year}</div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </FadeIn>
        <FadeIn delay={160}>
          <div style={{ display: "flex", gap: 40, marginTop: 24 }}>
            <div style={{ padding: "10px 20px", background: `${GREEN}12`, border: `1px solid ${GREEN}33`, borderRadius: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: GREEN }}>100% founder owned</span>
            </div>
            <div style={{ padding: "10px 20px", background: `${CYAN}12`, border: `1px solid ${CYAN}33`, borderRadius: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: CYAN }}>Zero dilution</span>
            </div>
            <div style={{ padding: "10px 20px", background: `${GOLD}12`, border: `1px solid ${GOLD}33`, borderRadius: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: GOLD }}>Cashflow funded</span>
            </div>
          </div>
        </FadeIn>
      </SceneWrap>

      {/* ═══ Scene 9: 4350-4800 — The Question ═══ */}
      <SceneWrap from={4350} dur={450}>
        <FadeIn>
          <div style={{ fontSize: 20, color: DIM, letterSpacing: 6, marginBottom: 20 }}>NO VENTURE CAPITAL. NO BOARD SEATS.</div>
        </FadeIn>
        <FadeIn delay={25}>
          <div style={{ fontSize: 54, fontWeight: 900, color: WHITE, textAlign: "center", lineHeight: 1.3 }}>
            The question was never<br />
            <span style={{ color: CYAN }}>&ldquo;can one person build this?&rdquo;</span>
          </div>
        </FadeIn>
        <FadeIn delay={60}>
          <div style={{ fontSize: 54, fontWeight: 900, color: WHITE, textAlign: "center", marginTop: 16 }}>
            The question is<br />
            <span style={{ color: GREEN }}>&ldquo;can anyone else keep up?&rdquo;</span>
          </div>
        </FadeIn>
      </SceneWrap>

      {/* ═══ Scene 10: 4800-5100 — Doctrine ═══ */}
      <SceneWrap from={4800} dur={300} fadeOut={1}>
        <FadeIn dur={30}>
          <div style={{
            fontSize: 52, fontWeight: 300, color: SILVER,
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
          <div style={{ fontSize: 14, color: DIM, marginTop: 20, letterSpacing: 4 }}>
            THE ORION CONSTELLATION
          </div>
        </FadeIn>
      </SceneWrap>
    </AbsoluteFill>
  );
};
