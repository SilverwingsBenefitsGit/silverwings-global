import React from "react";
import {
  AbsoluteFill, Img, useCurrentFrame,
  interpolate, Sequence, staticFile,
} from "remotion";

/* ─── Palette ─── */
const BG = "#0a0e17";
const CYAN = "#00f6ff";
const GREEN = "#00ff88";
const AMBER = "#fbbf24";
const RED = "#ff4444";
const FIRE = "#ff6b1a";
const WHITE = "#ffffff";
const DIM = "#4a5568";
const TERM_BG = "rgba(10,14,23,0.92)";
const MONO = "'JetBrains Mono', 'Fira Code', 'Consolas', monospace";

/* ─── Helpers ─── */
const lerp = (f: number, start: number, end: number, from: number, to: number) =>
  interpolate(f, [start, end], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; dur?: number }> = ({
  children, delay = 0, dur = 15,
}) => {
  const frame = useCurrentFrame();
  const opacity = lerp(frame - delay, 0, dur, 0, 1);
  const y = lerp(frame - delay, 0, dur, 24, 0);
  return <div style={{ opacity, transform: `translateY(${y}px)` }}>{children}</div>;
};

const BGScene: React.FC<{
  children: React.ReactNode; from: number; dur: number;
  bg: string; overlay?: string;
}> = ({ children, from, dur, bg, overlay = "rgba(0,0,0,0.7)" }) => {
  const frame = useCurrentFrame();
  const opacity = lerp(frame, 0, 12, 0, 1) * lerp(frame, dur - 12, dur, 1, 0);
  const scale = lerp(frame, 0, dur, 1.0, 1.06);
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
          fontFamily: "'Inter', -apple-system, sans-serif", padding: "60px 100px",
        }}>
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
    </Sequence>
  );
};

/* ─── Animated Counter ─── */
const Counter: React.FC<{
  from: number; to: number; startFrame: number; dur: number;
  color: string; size?: number; prefix?: string; suffix?: string;
}> = ({ from, to, startFrame, dur, color, size = 72, prefix = "", suffix = "" }) => {
  const frame = useCurrentFrame();
  const val = Math.round(lerp(frame - startFrame, 0, dur, from, to));
  const opacity = lerp(frame - startFrame, 0, 8, 0, 1);
  return (
    <span style={{ fontSize: size, fontWeight: 900, color, fontFamily: MONO, opacity,
      textShadow: `0 0 40px ${color}44, 0 4px 20px rgba(0,0,0,0.5)` }}>
      {prefix}{val.toLocaleString()}{suffix}
    </span>
  );
};

/* ─── Terminal Line ─── */
const TermLine: React.FC<{
  text: string; color?: string; delay: number; indent?: number; bold?: boolean;
}> = ({ text, color = "#e0e0f0", delay, indent = 0, bold = false }) => {
  const frame = useCurrentFrame();
  const opacity = lerp(frame - delay, 0, 6, 0, 1);
  return (
    <div style={{
      fontFamily: MONO, fontSize: 18, color, opacity,
      paddingLeft: indent, fontWeight: bold ? 700 : 400,
      lineHeight: 1.7, textShadow: "0 1px 4px rgba(0,0,0,0.5)",
    }}>{text}</div>
  );
};

/* ─── Blinking Cursor ─── */
const Cursor: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const visible = Math.floor((frame - delay) / 15) % 2 === 0;
  const opacity = lerp(frame - delay, 0, 6, 0, 1);
  return (
    <span style={{ fontFamily: MONO, fontSize: 18, color: CYAN, opacity: visible && opacity > 0 ? 1 : 0 }}>█</span>
  );
};

/* ─── Progress Bar ─── */
const ProgressBar: React.FC<{
  progress: number; color: string; width?: number; delay: number;
}> = ({ progress, color, width = 500, delay }) => {
  const frame = useCurrentFrame();
  const opacity = lerp(frame - delay, 0, 8, 0, 1);
  return (
    <div style={{ opacity, display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
      <div style={{ width, height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${Math.min(progress, 100)}%`, height: "100%", background: color, borderRadius: 4,
          boxShadow: `0 0 12px ${color}66`, transition: "width 0.1s" }} />
      </div>
      <span style={{ fontFamily: MONO, fontSize: 14, color, fontWeight: 700 }}>{Math.round(progress)}%</span>
    </div>
  );
};

/* ─── Grade Badge ─── */
const GradeBadge: React.FC<{
  grade: string; color: string; size?: number; delay: number; pulse?: boolean;
}> = ({ grade, color, size = 120, delay, pulse = false }) => {
  const frame = useCurrentFrame();
  const opacity = lerp(frame - delay, 0, 10, 0, 1);
  const scale = lerp(frame - delay, 0, 15, 0.5, 1);
  const glowPulse = pulse ? 0.4 + Math.sin((frame - delay) * 0.15) * 0.3 : 0.3;
  return (
    <div style={{
      opacity, transform: `scale(${scale})`,
      width: size, height: size, borderRadius: size / 2,
      border: `4px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center",
      background: `${color}15`, boxShadow: `0 0 60px ${color}${Math.round(glowPulse * 255).toString(16).padStart(2, "0")}`,
    }}>
      <span style={{ fontSize: size * 0.45, fontWeight: 900, color, fontFamily: MONO }}>{grade}</span>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════
   MAIN COMPOSITION — 60 seconds @ 30fps = 1800 frames
   ════════════════════════════════════════════════════════════════ */

export const MerciaThuban: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: BG }}>

      {/* ── SCENE 1: Title Card (0-5s, frames 0-150) ── */}
      <BGScene from={0} dur={150} bg="bg-data.png" overlay="rgba(0,0,0,0.75)">
        <FadeIn delay={10}>
          <div style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: 6, color: CYAN, marginBottom: 20 }}>
            Introducing
          </div>
        </FadeIn>
        <FadeIn delay={20}>
          <div style={{ fontSize: 80, fontWeight: 900, color: WHITE, letterSpacing: -2,
            textShadow: `0 0 60px ${CYAN}44, 0 4px 30px rgba(0,0,0,0.5)` }}>
            Thuban
          </div>
        </FadeIn>
        <FadeIn delay={35}>
          <div style={{ fontSize: 26, color: "#ccc", marginTop: 12, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            AI Code Verification
          </div>
        </FadeIn>
        <FadeIn delay={50}>
          <div style={{ fontSize: 16, color: AMBER, marginTop: 30, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>
            The only scanner built for AI-generated code
          </div>
        </FadeIn>
      </BGScene>

      {/* ── SCENE 2: The Scan (5-18s, frames 150-540) ── */}
      <BGScene from={150} dur={390} bg="bg-cityscape.png" overlay="rgba(0,0,0,0.82)">
        <div style={{ width: "100%", maxWidth: 900, background: TERM_BG, borderRadius: 16,
          border: "1px solid rgba(0,246,255,0.15)", padding: "30px 40px",
          backdropFilter: "blur(20px)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>

          {/* Terminal chrome */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#ff5f57" }} />
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#febc2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#28c840" }} />
            <span style={{ fontFamily: MONO, fontSize: 12, color: DIM, marginLeft: 12 }}>~/your-project</span>
          </div>

          {/* Command */}
          <TermLine text="$ npx thuban scan ." color={CYAN} delay={5} />

          {/* Engine banner */}
          <TermLine text="" delay={20} />
          <TermLine text="  ▲ THUBAN v0.4.10 — AI Code Verification" color={CYAN} delay={25} bold />
          <TermLine text="  69 rules · 10 languages · Scanning..." color={DIM} delay={35} />

          {/* File counter */}
          <TermLine text="" delay={50} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
            <TermLine text="  Files analysed:" color="#aaa" delay={50} />
            <Counter from={0} to={1547} startFrame={50} dur={80} color={WHITE} size={18} />
          </div>

          {/* Progress bar */}
          {(() => {
            const f = frame;
            const progress = lerp(f, 50, 140, 0, 100);
            return <div style={{ paddingLeft: 16 }}><ProgressBar progress={progress} color={CYAN} delay={50} width={600} /></div>;
          })()}

          {/* Languages detected */}
          <TermLine text="" delay={90} />
          <TermLine text="  Languages: JS · TS · Python · Go · Rust · PHP · Ruby · Java · Kotlin · C#" color={DIM} delay={95} />

          {/* Issues appearing */}
          <TermLine text="" delay={120} />
          <TermLine text="  ✗ 12 hallucinated API calls" color={RED} delay={130} />
          <TermLine text="  ✗ 8 phantom imports (packages that don't exist)" color={RED} delay={145} />
          <TermLine text="  ✗ 23 dead code blocks" color={AMBER} delay={160} />
          <TermLine text="  ✗ 6 architecture drift violations" color={AMBER} delay={175} />
          <TermLine text="  ✗ 14 undocumented dependencies" color={AMBER} delay={190} />
          <TermLine text="  ✗ 24 tech debt hotspots" color={AMBER} delay={205} />

          {/* Total + Grade */}
          <TermLine text="" delay={230} />
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 4 }}>
            <TermLine text="  Total issues:" color="#aaa" delay={230} />
            <Counter from={0} to={87} startFrame={230} dur={30} color={RED} size={22} />
          </div>

          {/* Grade reveal */}
          <TermLine text="" delay={270} />
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
            <TermLine text="  Health Grade:" color="#aaa" delay={275} bold />
            <FadeIn delay={280} dur={10}>
              <span style={{ fontFamily: MONO, fontSize: 32, fontWeight: 900, color: RED,
                textShadow: `0 0 20px ${RED}66` }}>D+</span>
            </FadeIn>
          </div>

          <TermLine text="" delay={300} />
          <TermLine text="  Scan complete in 4.2s. No data sent." color={DIM} delay={305} />
        </div>
      </BGScene>

      {/* ── SCENE 3: Crucible (18-30s, frames 540-900) ── */}
      <BGScene from={540} dur={360} bg="bg-warm.png" overlay="rgba(0,0,0,0.8)">
        <FadeIn delay={5}>
          <div style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: 6, color: FIRE, marginBottom: 16 }}>
            But how do you trust the scanner?
          </div>
        </FadeIn>
        <FadeIn delay={25}>
          <div style={{ fontSize: 64, fontWeight: 900, color: WHITE, textAlign: "center",
            textShadow: `0 0 60px ${FIRE}44, 0 4px 30px rgba(0,0,0,0.5)` }}>
            The Crucible
          </div>
        </FadeIn>
        <FadeIn delay={40}>
          <div style={{ fontSize: 22, color: "#ccc", textAlign: "center", marginTop: 16, maxWidth: 700 }}>
            515 adversarial patterns designed to break the scanner.
            Every scan proves itself.
          </div>
        </FadeIn>

        {/* Crucible terminal */}
        <FadeIn delay={60}>
          <div style={{ marginTop: 40, width: "100%", maxWidth: 700, background: TERM_BG,
            borderRadius: 12, border: `1px solid ${FIRE}33`, padding: "24px 32px",
            backdropFilter: "blur(20px)" }}>

            <TermLine text="$ thuban crucible --hell-mode" color={FIRE} delay={65} bold />
            <TermLine text="" delay={75} />
            <TermLine text="  ██ THUBAN CRUCIBLE v0.4.10 — HELL MODE ENGAGED ██" color={FIRE} delay={80} bold />
            <TermLine text="" delay={95} />

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
              <TermLine text="  Adversarial patterns tested:" color="#aaa" delay={100} />
              <Counter from={0} to={515} startFrame={100} dur={60} color={FIRE} size={20} />
            </div>

            {(() => {
              const f = frame;
              const progress = lerp(f, 100, 170, 0, 100);
              return <div style={{ paddingLeft: 16 }}><ProgressBar progress={progress} color={FIRE} delay={100} width={450} /></div>;
            })()}

            <TermLine text="" delay={170} />
            <TermLine text="  ✓ 511 patterns caught correctly" color={GREEN} delay={175} bold />
            <TermLine text="  ✗ 4 patterns missed — tracked, not hidden" color={AMBER} delay={190} />
            <TermLine text="" delay={210} />
            <TermLine text="  Crucible Score: 99.2% — PASSED" color={GREEN} delay={215} bold />
            <TermLine text="  This is not a certification. It's a snapshot." color={DIM} delay={230} />
          </div>
        </FadeIn>
      </BGScene>

      {/* ── SCENE 4: The Fix (30-40s, frames 900-1200) ── */}
      <BGScene from={900} dur={300} bg="bg-ocean.png" overlay="rgba(0,0,0,0.8)">
        <FadeIn delay={5}>
          <div style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: 6, color: GREEN, marginBottom: 16 }}>
            Now fix it
          </div>
        </FadeIn>

        <div style={{ width: "100%", maxWidth: 800, background: TERM_BG, borderRadius: 12,
          border: `1px solid ${GREEN}33`, padding: "24px 32px", backdropFilter: "blur(20px)", marginTop: 20 }}>

          <TermLine text="$ thuban fix --auto" color={GREEN} delay={15} bold />
          <TermLine text="" delay={25} />

          {/* Fix progress */}
          <TermLine text="  Fixing hallucinated APIs..." color="#aaa" delay={30} />
          <TermLine text="    ✓ 12 phantom API calls removed" color={GREEN} delay={50} />
          <TermLine text="  Fixing phantom imports..." color="#aaa" delay={60} />
          <TermLine text="    ✓ 8 non-existent packages flagged" color={GREEN} delay={80} />
          <TermLine text="  Cleaning dead code..." color="#aaa" delay={90} />
          <TermLine text="    ✓ 23 unreachable blocks removed" color={GREEN} delay={110} />
          <TermLine text="  Resolving drift..." color="#aaa" delay={120} />
          <TermLine text="    ✓ 6 annotations updated" color={GREEN} delay={140} />

          <TermLine text="" delay={160} />
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 8 }}>
            <TermLine text="  Issues remaining:" color="#aaa" delay={165} />
            <Counter from={87} to={14} startFrame={165} dur={30} color={AMBER} size={22} />
          </div>

          {/* Grade upgrade */}
          <TermLine text="" delay={200} />
          <div style={{ display: "flex", alignItems: "center", gap: 20, justifyContent: "center", marginTop: 16 }}>
            <GradeBadge grade="D+" color={RED} size={70} delay={210} />
            <FadeIn delay={220}>
              <span style={{ fontSize: 36, color: DIM }}>→</span>
            </FadeIn>
            <GradeBadge grade="B+" color={GREEN} size={70} delay={230} pulse />
          </div>
        </div>

        <FadeIn delay={250}>
          <div style={{ fontSize: 18, color: DIM, marginTop: 24, fontStyle: "italic" }}>
            One command. 4.2 seconds. 73 issues fixed.
          </div>
        </FadeIn>
      </BGScene>

      {/* ── SCENE 5: What You Get (40-48s, frames 1200-1440) ── */}
      <BGScene from={1200} dur={240} bg="bg-data.png" overlay="rgba(0,0,0,0.75)">
        <FadeIn delay={5}>
          <div style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: 6, color: CYAN, marginBottom: 16 }}>
            Full Stack
          </div>
        </FadeIn>
        <FadeIn delay={15}>
          <div style={{ fontSize: 48, fontWeight: 900, color: WHITE, textAlign: "center",
            textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
            25 Commands. Zero Dependencies.
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginTop: 40, width: "100%", maxWidth: 800 }}>
          {[
            { icon: "⌨", name: "CLI Scanner", desc: "npm install -g thuban", color: CYAN, delay: 30 },
            { icon: "🔮", name: "The Crucible", desc: "515 adversarial patterns", color: FIRE, delay: 45 },
            { icon: "🧬", name: "Mother Code", desc: "Self-documenting DNA", color: GREEN, delay: 60 },
            { icon: "🔌", name: "VS Code", desc: "Scan on save", color: CYAN, delay: 75 },
            { icon: "🤖", name: "MCP Server", desc: "AI agent verification", color: AMBER, delay: 90 },
            { icon: "⚡", name: "GitHub Action", desc: "CI/CD integration", color: GREEN, delay: 105 },
          ].map((item, i) => (
            <FadeIn key={i} delay={item.delay}>
              <div style={{
                background: "rgba(255,255,255,0.04)", border: `1px solid ${item.color}22`,
                borderRadius: 12, padding: "20px 16px", textAlign: "center",
                backdropFilter: "blur(10px)",
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: WHITE, marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontSize: 13, color: DIM }}>{item.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={120}>
          <div style={{ marginTop: 30, fontSize: 18, color: "#aaa", textAlign: "center" }}>
            10 languages · 69 rules · Works on any codebase
          </div>
        </FadeIn>
      </BGScene>

      {/* ── SCENE 6: The Mercia Offer (48-55s, frames 1440-1650) ── */}
      <BGScene from={1440} dur={210} bg="bg-constellation.png" overlay="rgba(0,0,0,0.6)">
        <FadeIn delay={5}>
          <div style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: 6, color: AMBER, marginBottom: 20 }}>
            Exclusive Offer
          </div>
        </FadeIn>
        <FadeIn delay={20}>
          <div style={{ fontSize: 56, fontWeight: 900, color: WHITE, textAlign: "center", lineHeight: 1.2,
            textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
            Mercia Portfolio Companies
          </div>
        </FadeIn>
        <FadeIn delay={40}>
          <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ fontSize: 72, fontWeight: 900, color: GREEN, fontFamily: MONO,
              textShadow: `0 0 40px ${GREEN}44` }}>
              12
            </div>
            <div>
              <div style={{ fontSize: 36, fontWeight: 800, color: WHITE }}>Months Pro</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: GREEN }}>Free</div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={65}>
          <div style={{ marginTop: 30, fontSize: 20, color: "#ccc", textAlign: "center", maxWidth: 600, lineHeight: 1.6 }}>
            Every scan. Every fix. Every Crucible run.
            CLI, VS Code, MCP, GitHub Action — the full stack.
            No strings. No credit card.
          </div>
        </FadeIn>
      </BGScene>

      {/* ── SCENE 7: CTA (55-60s, frames 1650-1800) ── */}
      <BGScene from={1650} dur={150} bg="bg-cityscape.png" overlay="rgba(0,0,0,0.7)">
        <FadeIn delay={5}>
          <div style={{
            background: TERM_BG, borderRadius: 12, border: `1px solid ${CYAN}33`,
            padding: "20px 40px", backdropFilter: "blur(20px)", marginBottom: 30,
          }}>
            <div style={{ fontFamily: MONO, fontSize: 28, color: CYAN, textAlign: "center",
              textShadow: `0 0 20px ${CYAN}44` }}>
              $ npx thuban scan .
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={25}>
          <div style={{ fontSize: 32, fontWeight: 800, color: WHITE, textAlign: "center",
            textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
            One command. Know everything.
          </div>
        </FadeIn>
        <FadeIn delay={45}>
          <div style={{ fontSize: 18, color: "#aaa", textAlign: "center", marginTop: 16 }}>
            Scan your code. Then prove the scan worked.
          </div>
        </FadeIn>
        <FadeIn delay={65}>
          <div style={{ marginTop: 40, display: "flex", gap: 30, alignItems: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: WHITE }}>Thuban</div>
            <div style={{ width: 1, height: 24, background: DIM }} />
            <div style={{ fontSize: 16, color: DIM }}>by Orionos.ai</div>
          </div>
        </FadeIn>
      </BGScene>

    </AbsoluteFill>
  );
};
