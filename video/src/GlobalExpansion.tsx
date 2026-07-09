import React from "react";
import {
  AbsoluteFill, Audio, Img, useCurrentFrame, useVideoConfig,
  interpolate, Sequence, staticFile,
} from "remotion";

/* ─── Palette ─── */
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

/* ─── Main Composition ─── */
export const GlobalExpansion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Audio src={staticFile("vo-global-expansion.mp3")} />

      {/* Scene 1: 0-240 — Opening hook */}
      <BGScene from={0} dur={240} bg="bg-earth.png" overlay="rgba(0,0,0,0.55)">
        <FadeIn>
          <div style={{ fontSize: 28, color: "#ccc", letterSpacing: 6, textTransform: "uppercase", marginBottom: 20, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            Unclaimed Government Benefits
          </div>
        </FadeIn>
        <FadeIn delay={20}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span style={{ fontSize: 140, fontWeight: 900, color: GOLD, textShadow: `0 0 80px ${GOLD}44`, lineHeight: 1 }}>$1</span>
            <span style={{ fontSize: 80, fontWeight: 900, color: GOLD, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>TRILLION</span>
          </div>
        </FadeIn>
        <FadeIn delay={50}>
          <div style={{ fontSize: 32, color: WHITE, marginTop: 20, fontWeight: 300, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>Every year. Not a typo.</div>
        </FadeIn>
      </BGScene>

      {/* Scene 2: 240-540 — The problem */}
      <BGScene from={240} dur={300} bg="bg-warm.png" overlay="rgba(0,0,0,0.65)">
        <FadeIn>
          <div style={{ fontSize: 42, fontWeight: 800, color: WHITE, textAlign: "center", lineHeight: 1.3, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
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
                  padding: "24px 32px", background: "rgba(255,68,68,0.1)", border: "1px solid rgba(255,68,68,0.3)",
                  borderRadius: 16, textAlign: "center", minWidth: 200, backdropFilter: "blur(10px)",
                }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontSize: 20, color: WHITE, fontWeight: 600, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{item.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={140}>
          <div style={{ fontSize: 28, color: GREEN, fontWeight: 700, marginTop: 30, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            We built Silverwings to fix that.
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 3: 540-960 — UK model */}
      <BGScene from={540} dur={420} bg="bg-cityscape.png" overlay="rgba(0,0,0,0.65)">
        <FadeIn>
          <div style={{ fontSize: 20, color: CYAN, letterSpacing: 4, marginBottom: 16, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>THE PROVEN MODEL</div>
        </FadeIn>
        <FadeIn delay={15}>
          <div style={{ fontSize: 38, fontWeight: 800, color: WHITE, marginBottom: 30, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
            🇬🇧 UK &mdash; Attendance Allowance
          </div>
        </FadeIn>
        <FadeIn delay={30}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {[
              { label: "Voice AI\nInterview", bg: `${PURPLE}33`, border: PURPLE },
              { label: "AI-Enhanced\nAnswers", bg: `${BLUE}33`, border: BLUE },
              { label: "Online Form\nSubmission", bg: `${CYAN}33`, border: CYAN },
              { label: "94% Success\nRate", bg: `${GREEN}33`, border: GREEN },
              { label: "15% + VAT\nFee", bg: `${GOLD}33`, border: GOLD },
            ].map((step, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={{ fontSize: 24, color: "#aaa" }}>→</div>}
                <FadeIn delay={40 + i * 20}>
                  <div style={{
                    padding: "18px 20px", background: step.bg, border: `2px solid ${step.border}`,
                    borderRadius: 12, textAlign: "center", minWidth: 140, backdropFilter: "blur(10px)",
                  }}>
                    <div style={{ fontSize: 15, color: WHITE, fontWeight: 600, whiteSpace: "pre-line", lineHeight: 1.3, textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>{step.label}</div>
                  </div>
                </FadeIn>
              </React.Fragment>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={160}>
          <div style={{ display: "flex", gap: 60, marginTop: 36 }}>
            {[
              { value: "£40", label: "Customer acquisition cost", color: GREEN },
              { value: "£3", label: "Compute cost per claim", color: GREEN },
              { value: "£1,073", label: "Revenue per claim", color: GOLD },
              { value: "24:1", label: "LTV : CAC", color: CYAN },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 44, fontWeight: 900, color: stat.color, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>{stat.value}</div>
                <div style={{ fontSize: 14, color: "#ccc", textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 4: 960-1320 — The insight */}
      <BGScene from={960} dur={360} bg="bg-ocean.png">
        <FadeIn>
          <div style={{ fontSize: 48, fontWeight: 900, color: WHITE, textAlign: "center", lineHeight: 1.3, maxWidth: 900, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
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
                  width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.1)",
                  border: "2px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 40, backdropFilter: "blur(10px)",
                }}>{flag}</div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 5: 1320-1740 — Australia */}
      <BGScene from={1320} dur={420} bg="bg-ocean.png" overlay="rgba(0,0,0,0.65)">
        <FadeIn>
          <div style={{ fontSize: 64, marginBottom: 8 }}>🇦🇺</div>
        </FadeIn>
        <FadeIn delay={10}>
          <div style={{ fontSize: 48, fontWeight: 900, color: WHITE, marginBottom: 24, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>Australia</div>
        </FadeIn>
        <FadeIn delay={25}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 700 }}>
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
                  padding: "16px 20px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 10, display: "flex", justifyContent: "space-between", backdropFilter: "blur(10px)",
                }}>
                  <span style={{ fontSize: 16, color: "#ccc", textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>{item.label}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: item.color, textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>{item.value}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={140}>
          <div style={{ marginTop: 24, padding: "14px 32px", background: `${GREEN}20`, border: `2px solid ${GREEN}`, borderRadius: 10, backdropFilter: "blur(10px)" }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: GREEN, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>Y1 Projection: A$2.8M</span>
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 6: 1740-2100 — Canada */}
      <BGScene from={1740} dur={360} bg="bg-earth.png" overlay="rgba(0,0,0,0.6)">
        <FadeIn>
          <div style={{ fontSize: 64, marginBottom: 8 }}>🇨🇦</div>
        </FadeIn>
        <FadeIn delay={10}>
          <div style={{ fontSize: 48, fontWeight: 900, color: WHITE, marginBottom: 24, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>Canada</div>
        </FadeIn>
        <FadeIn delay={25}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 700 }}>
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
                  padding: "16px 20px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 10, display: "flex", justifyContent: "space-between", backdropFilter: "blur(10px)",
                }}>
                  <span style={{ fontSize: 16, color: "#ccc", textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>{item.label}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: item.color, textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>{item.value}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={130}>
          <div style={{ marginTop: 24, padding: "14px 32px", background: `${GREEN}20`, border: `2px solid ${GREEN}`, borderRadius: 10, backdropFilter: "blur(10px)" }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: GREEN, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>Y1 Projection: C$1.08M</span>
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 7: 2100-2400 — USA */}
      <BGScene from={2100} dur={300} bg="bg-cityscape.png">
        <FadeIn>
          <div style={{ fontSize: 64, marginBottom: 8 }}>🇺🇸</div>
        </FadeIn>
        <FadeIn delay={10}>
          <div style={{ fontSize: 48, fontWeight: 900, color: WHITE, marginBottom: 24, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>United States</div>
        </FadeIn>
        <FadeIn delay={25}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 700 }}>
            {[
              { label: "Portal", value: "SSA.gov", color: CYAN },
              { label: "Avg SSDI award", value: "$21,000/yr", color: GOLD },
              { label: "Families helped/yr", value: "2,000,000+", color: ORANGE },
              { label: "Fee model", value: "Flat $500", color: GREEN },
            ].map((item, i) => (
              <FadeIn key={i} delay={40 + i * 15}>
                <div style={{
                  padding: "16px 20px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 10, display: "flex", justifyContent: "space-between", minWidth: 320, backdropFilter: "blur(10px)",
                }}>
                  <span style={{ fontSize: 16, color: "#ccc", textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>{item.label}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: item.color, textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>{item.value}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={110}>
          <div style={{ fontSize: 18, color: "#ccc", marginTop: 20, fontStyle: "italic", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>Volume play. TurboTax for disability benefits.</div>
        </FadeIn>
      </BGScene>

      {/* Scene 8: 2400-2820 — Blockers destroyed */}
      <BGScene from={2400} dur={420} bg="bg-data.png" overlay="rgba(0,0,0,0.7)">
        <FadeIn>
          <div style={{ fontSize: 36, fontWeight: 800, color: WHITE, marginBottom: 30, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
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
              padding: "12px 24px", background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)",
              borderRadius: 10, maxWidth: 800, width: "100%", backdropFilter: "blur(10px)",
            }}>
              <span style={{ color: RED, fontSize: 22, fontWeight: 700, minWidth: 200, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{item.blocker}</span>
              <span style={{ color: GREEN, fontSize: 18, fontWeight: 600, flex: 1, textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>{item.answer}</span>
              <span style={{ color: "#aaa", fontSize: 13, fontStyle: "italic" }}>{item.ref}</span>
            </div>
          </FadeIn>
        ))}
      </BGScene>

      {/* Scene 9: 2820-3240 — Financial projections */}
      <BGScene from={2820} dur={420} bg="bg-data.png" overlay="rgba(0,0,0,0.65)">
        <FadeIn>
          <div style={{ fontSize: 20, color: CYAN, letterSpacing: 4, marginBottom: 12, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>COMBINED PROJECTIONS</div>
        </FadeIn>
        <div style={{ display: "flex", gap: 40, marginTop: 10 }}>
          {[
            { year: "Year 1", amount: 12.7, color: BLUE, height: 80 },
            { year: "Year 2", amount: 52.0, color: PURPLE, height: 160 },
            { year: "Year 3", amount: 122.9, color: GREEN, height: 250 },
          ].map((yr, i) => (
            <FadeIn key={i} delay={30 + i * 20}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: yr.color, marginBottom: 12, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
                  ${yr.amount}M
                </div>
                <div style={{
                  width: 120, height: yr.height,
                  background: `linear-gradient(180deg, ${yr.color}, ${yr.color}66)`,
                  borderRadius: "8px 8px 0 0", boxShadow: `0 0 30px ${yr.color}33`,
                }} />
                <div style={{ fontSize: 18, color: "#ccc", marginTop: 12, fontWeight: 600 }}>{yr.year}</div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={120}>
          <div style={{ display: "flex", gap: 40, marginTop: 30 }}>
            {[
              { value: "5", label: "Person team", color: GREEN },
              { value: "86%", label: "Net margin", color: GREEN },
              { value: "Proven", label: "UK unit economics", color: GOLD },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: stat.color, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>{stat.value}</div>
                <div style={{ fontSize: 14, color: "#ccc" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 10: 3240-3600 — CTA */}
      <BGScene from={3240} dur={360} bg="bg-constellation.png" overlay="rgba(0,0,0,0.5)" fadeOut={30}>
        <FadeIn>
          <div style={{ fontSize: 56, fontWeight: 900, color: WHITE, textAlign: "center", lineHeight: 1.2, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
            The question isn&rsquo;t<br /><span style={{ color: CYAN }}>&ldquo;can we?&rdquo;</span>
          </div>
        </FadeIn>
        <FadeIn delay={30}>
          <div style={{ fontSize: 56, fontWeight: 900, color: WHITE, textAlign: "center", marginTop: 8, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
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
          <div style={{ fontSize: 22, color: "#ccc", marginTop: 24, fontFamily: "'JetBrains Mono', monospace", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            SILVERWINGS GLOBAL
          </div>
        </FadeIn>
      </BGScene>
    </AbsoluteFill>
  );
};
