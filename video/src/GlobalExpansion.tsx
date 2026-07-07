import React from "react";
import {
  AbsoluteFill, Audio, useCurrentFrame, useVideoConfig,
  interpolate, spring, Sequence, staticFile,
} from "remotion";

/* ─── Palette ─── */
const BG = "#0a0a1a";
const NAVY = "#0f172a";
const CYAN = "#00f6ff";
const GREEN = "#00ff88";
const RED = "#ff4444";
const PURPLE = "#7c3aed";
const BLUE = "#3b82f6";
const ORANGE = "#f97316";
const WHITE = "#ffffff";
const DIM = "#64748b";
const GOLD = "#fbbf24";

/* ─── Helpers ─── */
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; dur?: number }> = ({
  children, delay = 0, dur = 20,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(frame - delay, [0, dur], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ opacity, transform: `translateY(${y}px)` }}>{children}</div>;
};

const Counter: React.FC<{
  value: number; start: number; dur?: number; prefix?: string; suffix?: string;
  color: string; size?: number;
}> = ({ value, start, dur = 45, prefix = "", suffix = "", color, size = 64 }) => {
  const frame = useCurrentFrame();
  const n = Math.floor(interpolate(frame - start, [0, dur], [0, value], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return <span style={{ fontSize: size, fontWeight: 900, color, fontFamily: "'Inter',sans-serif" }}>{prefix}{n.toLocaleString()}{suffix}</span>;
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

/* ─── Main Composition ─── */
export const GlobalExpansion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /*
   * 2-min VO timing (3600 frames @ 30fps):
   * 0-8s    (0-240):     Opening hook — $1 trillion
   * 8-18s   (240-540):   The problem — forms confusing, nobody helping
   * 18-32s  (540-960):   UK model — how Silverwings works
   * 32-44s  (960-1320):  The insight — same tech works everywhere
   * 44-58s  (1320-1740): Australia deep dive
   * 58-70s  (1740-2100): Canada deep dive
   * 70-80s  (2100-2400): USA deep dive
   * 80-94s  (2400-2820): Blockers destroyed
   * 94-108s (2820-3240): Financial projections
   * 108-120s(3240-3600): CTA — "Two weeks. Then we go."
   */

  /* Pulsing globe background */
  const pulse = Math.sin(frame * 0.02) * 0.15 + 0.85;

  return (
    <AbsoluteFill style={{ backgroundColor: BG, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Audio src={staticFile("vo-global-expansion.mp3")} />

      {/* Subtle grid background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(0,246,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,246,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* ═══ Scene 1: 0-240 — Opening hook ═══ */}
      <SceneWrap from={0} dur={240}>
        <FadeIn>
          <div style={{ fontSize: 28, color: DIM, letterSpacing: 6, textTransform: "uppercase", marginBottom: 20 }}>
            Unclaimed Government Benefits
          </div>
        </FadeIn>
        <FadeIn delay={20}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span style={{ fontSize: 140, fontWeight: 900, color: GOLD, textShadow: `0 0 80px ${GOLD}44`, lineHeight: 1 }}>$1</span>
            <span style={{ fontSize: 80, fontWeight: 900, color: GOLD }}>TRILLION</span>
          </div>
        </FadeIn>
        <FadeIn delay={50}>
          <div style={{ fontSize: 32, color: WHITE, marginTop: 20, fontWeight: 300 }}>Every year. Not a typo.</div>
        </FadeIn>
      </SceneWrap>

      {/* ═══ Scene 2: 240-540 — The problem ═══ */}
      <SceneWrap from={240} dur={300}>
        <FadeIn>
          <div style={{ fontSize: 42, fontWeight: 800, color: WHITE, textAlign: "center", lineHeight: 1.3 }}>
            Tens of millions of people<br />
            <span style={{ color: RED }}>entitled but not claiming</span>
          </div>
        </FadeIn>
        <FadeIn delay={40}>
          <div style={{ display: "flex", gap: 40, marginTop: 40 }}>
            {[
              { icon: "📋", label: "Forms are confusing" },
              { icon: "😰", label: "Process is intimidating" },
              { icon: "🚫", label: "Nobody is helping" },
            ].map((item, i) => (
              <FadeIn key={i} delay={60 + i * 25}>
                <div style={{
                  padding: "24px 32px", background: `${RED}0a`, border: `1px solid ${RED}33`,
                  borderRadius: 16, textAlign: "center", minWidth: 200,
                }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontSize: 20, color: WHITE, fontWeight: 600 }}>{item.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={140}>
          <div style={{ fontSize: 28, color: GREEN, fontWeight: 700, marginTop: 30 }}>
            We built Silverwings to fix that.
          </div>
        </FadeIn>
      </SceneWrap>

      {/* ═══ Scene 3: 540-960 — UK model ═══ */}
      <SceneWrap from={540} dur={420}>
        <FadeIn>
          <div style={{ fontSize: 20, color: CYAN, letterSpacing: 4, marginBottom: 16 }}>THE PROVEN MODEL</div>
        </FadeIn>
        <FadeIn delay={15}>
          <div style={{ fontSize: 38, fontWeight: 800, color: WHITE, marginBottom: 30 }}>
            🇬🇧 UK &mdash; Attendance Allowance
          </div>
        </FadeIn>
        {/* Flow */}
        <FadeIn delay={30}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {[
              { label: "Voice AI\nInterview", bg: `${PURPLE}22`, border: PURPLE },
              { label: "AI-Enhanced\nAnswers", bg: `${BLUE}22`, border: BLUE },
              { label: "Online Form\nSubmission", bg: `${CYAN}22`, border: CYAN },
              { label: "94% Success\nRate", bg: `${GREEN}22`, border: GREEN },
              { label: "15% + VAT\nFee", bg: `${GOLD}22`, border: GOLD },
            ].map((step, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={{ fontSize: 24, color: DIM }}>→</div>}
                <FadeIn delay={40 + i * 20}>
                  <div style={{
                    padding: "18px 20px", background: step.bg, border: `2px solid ${step.border}`,
                    borderRadius: 12, textAlign: "center", minWidth: 140,
                  }}>
                    <div style={{ fontSize: 15, color: WHITE, fontWeight: 600, whiteSpace: "pre-line", lineHeight: 1.3 }}>{step.label}</div>
                  </div>
                </FadeIn>
              </React.Fragment>
            ))}
          </div>
        </FadeIn>
        {/* Stats */}
        <FadeIn delay={160}>
          <div style={{ display: "flex", gap: 60, marginTop: 36 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: GREEN }}>£40</div>
              <div style={{ fontSize: 14, color: DIM }}>Customer acquisition cost</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: GREEN }}>£3</div>
              <div style={{ fontSize: 14, color: DIM }}>Compute cost per claim</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: GOLD }}>£1,073</div>
              <div style={{ fontSize: 14, color: DIM }}>Revenue per claim</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: CYAN }}>24:1</div>
              <div style={{ fontSize: 14, color: DIM }}>LTV : CAC</div>
            </div>
          </div>
        </FadeIn>
      </SceneWrap>

      {/* ═══ Scene 4: 960-1320 — The insight ═══ */}
      <SceneWrap from={960} dur={360}>
        <FadeIn>
          <div style={{ fontSize: 48, fontWeight: 900, color: WHITE, textAlign: "center", lineHeight: 1.3, maxWidth: 900 }}>
            The same tech stack works for<br />
            <span style={{
              background: `linear-gradient(135deg, ${CYAN}, ${GREEN})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>every online benefits form<br />in every English-speaking country</span>
          </div>
        </FadeIn>
        <FadeIn delay={60}>
          <div style={{ display: "flex", gap: 24, marginTop: 40 }}>
            {["🇦🇺", "🇨🇦", "🇺🇸", "🇳🇿", "🇮🇪"].map((flag, i) => (
              <FadeIn key={i} delay={80 + i * 15}>
                <div style={{
                  width: 80, height: 80, borderRadius: "50%", background: `${WHITE}08`,
                  border: `2px solid ${WHITE}22`, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 40,
                }}>{flag}</div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </SceneWrap>

      {/* ═══ Scene 5: 1320-1740 — Australia ═══ */}
      <SceneWrap from={1320} dur={420}>
        <FadeIn>
          <div style={{ fontSize: 64, marginBottom: 8 }}>🇦🇺</div>
        </FadeIn>
        <FadeIn delay={10}>
          <div style={{ fontSize: 48, fontWeight: 900, color: WHITE, marginBottom: 24 }}>Australia</div>
        </FadeIn>
        <FadeIn delay={25}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 700,
          }}>
            {[
              { label: "Portal", value: "MyGov / Centrelink", color: CYAN },
              { label: "Language", value: "English ✓", color: GREEN },
              { label: "Age Pension", value: "A$31,223/yr", color: GOLD },
              { label: "Fee per claim", value: "A$4,683", color: GREEN },
              { label: "Unclaimed", value: "250,000+", color: ORANGE },
              { label: "Nominee system", value: "Built in ✓", color: GREEN },
            ].map((item, i) => (
              <FadeIn key={i} delay={40 + i * 15}>
                <div style={{
                  padding: "16px 20px", background: `${WHITE}06`, border: `1px solid ${WHITE}12`,
                  borderRadius: 10, display: "flex", justifyContent: "space-between",
                }}>
                  <span style={{ fontSize: 16, color: DIM }}>{item.label}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: item.color }}>{item.value}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={140}>
          <div style={{ marginTop: 24, padding: "14px 32px", background: `${GREEN}15`, border: `2px solid ${GREEN}`, borderRadius: 10 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: GREEN }}>Y1 Projection: A$2.8M</span>
          </div>
        </FadeIn>
      </SceneWrap>

      {/* ═══ Scene 6: 1740-2100 — Canada ═══ */}
      <SceneWrap from={1740} dur={360}>
        <FadeIn>
          <div style={{ fontSize: 64, marginBottom: 8 }}>🇨🇦</div>
        </FadeIn>
        <FadeIn delay={10}>
          <div style={{ fontSize: 48, fontWeight: 900, color: WHITE, marginBottom: 24 }}>Canada</div>
        </FadeIn>
        <FadeIn delay={25}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 700,
          }}>
            {[
              { label: "Portal", value: "My Service Canada", color: CYAN },
              { label: "Language", value: "English + French ✓", color: GREEN },
              { label: "GIS Award", value: "C$13,095/yr", color: GOLD },
              { label: "Fee per claim", value: "C$1,964", color: GREEN },
              { label: "Unclaimed", value: "290,000+", color: ORANGE },
              { label: "Rep system", value: "ISP-1603 ✓", color: GREEN },
            ].map((item, i) => (
              <FadeIn key={i} delay={40 + i * 15}>
                <div style={{
                  padding: "16px 20px", background: `${WHITE}06`, border: `1px solid ${WHITE}12`,
                  borderRadius: 10, display: "flex", justifyContent: "space-between",
                }}>
                  <span style={{ fontSize: 16, color: DIM }}>{item.label}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: item.color }}>{item.value}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={130}>
          <div style={{ marginTop: 24, padding: "14px 32px", background: `${GREEN}15`, border: `2px solid ${GREEN}`, borderRadius: 10 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: GREEN }}>Y1 Projection: C$1.08M</span>
          </div>
        </FadeIn>
      </SceneWrap>

      {/* ═══ Scene 7: 2100-2400 — USA ═══ */}
      <SceneWrap from={2100} dur={300}>
        <FadeIn>
          <div style={{ fontSize: 64, marginBottom: 8 }}>🇺🇸</div>
        </FadeIn>
        <FadeIn delay={10}>
          <div style={{ fontSize: 48, fontWeight: 900, color: WHITE, marginBottom: 24 }}>United States</div>
        </FadeIn>
        <FadeIn delay={25}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 700,
          }}>
            {[
              { label: "Portal", value: "SSA.gov", color: CYAN },
              { label: "Avg SSDI award", value: "$21,000/yr", color: GOLD },
              { label: "Applications/yr", value: "2,000,000+", color: ORANGE },
              { label: "Fee model", value: "Flat $500", color: GREEN },
            ].map((item, i) => (
              <FadeIn key={i} delay={40 + i * 15}>
                <div style={{
                  padding: "16px 20px", background: `${WHITE}06`, border: `1px solid ${WHITE}12`,
                  borderRadius: 10, display: "flex", justifyContent: "space-between", minWidth: 320,
                }}>
                  <span style={{ fontSize: 16, color: DIM }}>{item.label}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: item.color }}>{item.value}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={110}>
          <div style={{ fontSize: 18, color: DIM, marginTop: 20, fontStyle: "italic" }}>Volume play. TurboTax for disability benefits.</div>
        </FadeIn>
      </SceneWrap>

      {/* ═══ Scene 8: 2400-2820 — Blockers destroyed ═══ */}
      <SceneWrap from={2400} dur={420}>
        <FadeIn>
          <div style={{ fontSize: 36, fontWeight: 800, color: WHITE, marginBottom: 30 }}>
            Every blocker. <span style={{ color: GREEN }}>Solved.</span>
          </div>
        </FadeIn>
        {[
          { blocker: "Power of Attorney?", answer: "Form preparation service. Client submits.", ref: "TurboTax" },
          { blocker: "Data protection?", answer: "Recorded consent. UK has EU adequacy.", ref: "Every SaaS" },
          { blocker: "Licensing?", answer: "Unregulated in every target market.", ref: "Fightback4Justice" },
          { blocker: "Fee caps?", answer: "Only for registered representatives. We're not.", ref: "H&R Block" },
          { blocker: "Non-English forms?", answer: "Map fields once. Browser fills selectors.", ref: "Automation" },
        ].map((item, i) => (
          <FadeIn key={i} delay={20 + i * 30}>
            <div style={{
              display: "flex", alignItems: "center", gap: 16, marginBottom: 12,
              padding: "12px 24px", background: `${GREEN}08`, border: `1px solid ${GREEN}22`,
              borderRadius: 10, maxWidth: 800, width: "100%",
            }}>
              <span style={{ color: RED, fontSize: 22, fontWeight: 700, minWidth: 200 }}>{item.blocker}</span>
              <span style={{ color: GREEN, fontSize: 18, fontWeight: 600, flex: 1 }}>{item.answer}</span>
              <span style={{ color: DIM, fontSize: 13, fontStyle: "italic" }}>{item.ref}</span>
            </div>
          </FadeIn>
        ))}
      </SceneWrap>

      {/* ═══ Scene 9: 2820-3240 — Financial projections ═══ */}
      <SceneWrap from={2820} dur={420}>
        <FadeIn>
          <div style={{ fontSize: 20, color: CYAN, letterSpacing: 4, marginBottom: 12 }}>COMBINED PROJECTIONS</div>
        </FadeIn>
        <div style={{ display: "flex", gap: 40, marginTop: 10 }}>
          {[
            { year: "Year 1", amount: 12.7, color: BLUE },
            { year: "Year 2", amount: 52.0, color: PURPLE },
            { year: "Year 3", amount: 122.9, color: GREEN },
          ].map((yr, i) => {
            const barH = interpolate(frame - 2880 - i * 20, [0, 50], [0, yr.amount * 1.8], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });
            return (
              <FadeIn key={i} delay={30 + i * 20}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: yr.color, marginBottom: 12 }}>
                    ${yr.amount}M
                  </div>
                  <div style={{
                    width: 120, height: barH, minHeight: 4,
                    background: `linear-gradient(180deg, ${yr.color}, ${yr.color}66)`,
                    borderRadius: "8px 8px 0 0", boxShadow: `0 0 30px ${yr.color}33`,
                    transition: "height 0.5s",
                  }} />
                  <div style={{ fontSize: 18, color: DIM, marginTop: 12, fontWeight: 600 }}>{yr.year}</div>
                </div>
              </FadeIn>
            );
          })}
        </div>
        <FadeIn delay={120}>
          <div style={{ display: "flex", gap: 40, marginTop: 30 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: GREEN }}>5</div>
              <div style={{ fontSize: 14, color: DIM }}>Person team</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: GREEN }}>86%</div>
              <div style={{ fontSize: 14, color: DIM }}>Net margin</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: GOLD }}>Proven</div>
              <div style={{ fontSize: 14, color: DIM }}>UK unit economics</div>
            </div>
          </div>
        </FadeIn>
      </SceneWrap>

      {/* ═══ Scene 10: 3240-3600 — CTA ═══ */}
      <SceneWrap from={3240} dur={360} fadeOut={30}>
        <FadeIn>
          <div style={{ fontSize: 56, fontWeight: 900, color: WHITE, textAlign: "center", lineHeight: 1.2 }}>
            The question isn&rsquo;t<br /><span style={{ color: CYAN }}>&ldquo;can we?&rdquo;</span>
          </div>
        </FadeIn>
        <FadeIn delay={30}>
          <div style={{ fontSize: 56, fontWeight: 900, color: WHITE, textAlign: "center", marginTop: 8 }}>
            It&rsquo;s <span style={{ color: GREEN }}>&ldquo;how fast?&rdquo;</span>
          </div>
        </FadeIn>
        <FadeIn delay={70}>
          <div style={{
            marginTop: 40, padding: "20px 48px",
            background: `linear-gradient(135deg, ${PURPLE}, ${BLUE})`,
            borderRadius: 16, boxShadow: `0 0 40px ${BLUE}44`,
          }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: WHITE, letterSpacing: 2 }}>
              TWO WEEKS. SOLID PLAN. THEN WE GO.
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={110}>
          <div style={{ fontSize: 22, color: DIM, marginTop: 24, fontFamily: "'JetBrains Mono', monospace" }}>
            SILVERWINGS GLOBAL
          </div>
        </FadeIn>
      </SceneWrap>
    </AbsoluteFill>
  );
};
