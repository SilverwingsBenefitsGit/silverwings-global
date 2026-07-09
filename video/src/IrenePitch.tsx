import React from "react";
import {
  AbsoluteFill, Audio, Img, useCurrentFrame,
  interpolate, Sequence, staticFile,
} from "remotion";

/* ─── Palette ─── */
const WHITE = "#ffffff";
const PURPLE = "#7c3aed";
const LIGHT_PURPLE = "#a78bfa";
const GREEN = "#00ff88";
const CYAN = "#00f6ff";
const DIM = "#64748b";
const GOLD = "#fbbf24";
const WARM = "#f5e6d3";
const BLUE = "#3b82f6";
const RED = "#ff4444";
const ORANGE = "#f97316";

/* ─── Helpers ─── */
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; dur?: number }> = ({
  children, delay = 0, dur = 25,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(frame - delay, [0, dur], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ opacity, transform: `translateY(${y}px)` }}>{children}</div>;
};

const BGScene: React.FC<{
  children: React.ReactNode; from: number; dur: number;
  bg: string; overlay?: string; fadeIn?: number; fadeOut?: number;
}> = ({ children, from, dur, bg, overlay = "rgba(0,0,0,0.55)", fadeIn = 20, fadeOut = 20 }) => {
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
          fontFamily: "'Inter', -apple-system, sans-serif",
          padding: "80px 120px",
        }}>
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
    </Sequence>
  );
};

const Title: React.FC<{ children: React.ReactNode; size?: number; color?: string }> = ({ children, size = 64, color = WHITE }) => (
  <div style={{ fontSize: size, fontWeight: 800, color, textAlign: "center", lineHeight: 1.15, letterSpacing: -1, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>{children}</div>
);

const Body: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = "#e0e0e0" }) => (
  <div style={{ fontSize: 24, color, textAlign: "center", marginTop: 24, maxWidth: 800, lineHeight: 1.7, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>{children}</div>
);

/* Animated counter that ticks up */
const Counter: React.FC<{
  value: number; delay: number; dur?: number;
  prefix?: string; suffix?: string; color: string; size?: number;
}> = ({ value, delay, dur = 50, prefix = "", suffix = "", color, size = 56 }) => {
  const frame = useCurrentFrame();
  const n = Math.floor(interpolate(frame - delay, [0, dur], [0, value], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return (
    <span style={{ fontSize: size, fontWeight: 900, color, fontFamily: "'Inter', sans-serif", textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
      {prefix}{n.toLocaleString()}{suffix}
    </span>
  );
};

/* Animated bar that grows upward */
const GrowBar: React.FC<{
  height: number; width?: number; color: string; delay: number; dur?: number;
  label?: string; value?: string;
}> = ({ height, width = 80, color, delay, dur = 40, label, value }) => {
  const frame = useCurrentFrame();
  const h = interpolate(frame - delay, [0, dur], [0, height], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = interpolate(frame - delay, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ opacity, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      {value && <div style={{ fontSize: 20, fontWeight: 800, color, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{value}</div>}
      <div style={{
        width, height: h, minHeight: 2,
        background: `linear-gradient(180deg, ${color}, ${color}66)`,
        borderRadius: "8px 8px 0 0",
        boxShadow: `0 0 20px ${color}44, inset 0 1px 0 rgba(255,255,255,0.2)`,
      }} />
      {label && <div style={{ fontSize: 13, color: "#ccc", textAlign: "center", maxWidth: width + 30 }}>{label}</div>}
    </div>
  );
};

/* Pipeline step with animated connector */
const PipeStep: React.FC<{
  label: string; color: string; delay: number; icon: string;
}> = ({ label, color, delay, icon }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(frame - delay, [0, 15], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ opacity, transform: `scale(${scale})`, textAlign: "center" }}>
      <div style={{
        width: 130, padding: "18px 16px",
        background: `${color}20`, border: `2px solid ${color}`,
        borderRadius: 14, backdropFilter: "blur(10px)",
      }}>
        <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
        <div style={{ fontSize: 14, color: WHITE, fontWeight: 600, lineHeight: 1.3, textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>{label}</div>
      </div>
    </div>
  );
};

/* Product card with status indicator */
const ProductCard: React.FC<{
  name: string; desc: string; status: string; color: string; delay: number;
}> = ({ name, desc, status, color, delay }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow = status === "LAUNCHED" ? Math.sin((frame - delay) * 0.08) * 0.3 + 0.7 : 0;
  return (
    <div style={{
      opacity, padding: "18px 22px",
      background: "rgba(0,0,0,0.4)", border: `1px solid ${color}55`,
      borderRadius: 14, backdropFilter: "blur(10px)",
      boxShadow: status === "LAUNCHED" ? `0 0 ${20 * glow}px ${color}44` : "none",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={{ fontSize: 20, fontWeight: 800, color, textShadow: `0 2px 10px rgba(0,0,0,0.5)` }}>{name}</div>
        <div style={{
          fontSize: 10, fontWeight: 700, color: status === "LAUNCHED" ? "#000" : color,
          background: status === "LAUNCHED" ? color : "transparent",
          border: status === "LAUNCHED" ? "none" : `1px solid ${color}66`,
          borderRadius: 6, padding: "3px 8px", letterSpacing: 1,
        }}>{status}</div>
      </div>
      <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.4 }}>{desc}</div>
    </div>
  );
};

/* ─── MAIN COMPOSITION ─── */
export const IrenePitch: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Audio src={staticFile("vo-irene-presentation.mp3")} volume={1} />

      {/* ═══ Scene 1: For Irene (0-10s) ═══ */}
      <BGScene from={0} dur={300} bg="bg-warm.png" overlay="rgba(0,0,0,0.6)">
        <FadeIn delay={10}>
          <div style={{ fontSize: 16, color: DIM, letterSpacing: 4, textTransform: "uppercase", marginBottom: 30 }}>A Personal Update</div>
        </FadeIn>
        <FadeIn delay={25}>
          <Title size={80}>For Irene</Title>
        </FadeIn>
        <FadeIn delay={50}>
          <Body color={DIM}>From Craig — July 2026</Body>
        </FadeIn>
      </BGScene>

      {/* ═══ Scene 2: The Belief (10-25s) ═══ */}
      <BGScene from={300} dur={450} bg="bg-warm.png" overlay="rgba(0,0,0,0.65)">
        <FadeIn delay={10}>
          <div style={{ maxWidth: 700, fontSize: 28, color: WARM, textAlign: "center", lineHeight: 1.8, fontStyle: "italic", textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}>
            "Two years ago, you believed in me<br/>
            when nobody else would.<br/><br/>
            You handed me fifteen thousand pounds<br/>
            and said keep going."
          </div>
        </FadeIn>
        <FadeIn delay={80}>
          <div style={{ marginTop: 50, fontSize: 22, color: WHITE, textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            This is what that £15,000 became.
          </div>
        </FadeIn>
      </BGScene>

      {/* ═══ Scene 3: Revenue Growth — The Numbers (25-45s) ═══ */}
      <BGScene from={750} dur={600} bg="bg-data.png" overlay="rgba(0,0,0,0.7)">
        <FadeIn delay={5}>
          <div style={{ fontSize: 16, color: CYAN, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>What Your £15,000 Built</div>
        </FadeIn>

        {/* Animated revenue counter */}
        <FadeIn delay={10}>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <Counter value={809} delay={15} dur={60} prefix="£" suffix="K" color={GREEN} size={80} />
            <div style={{ fontSize: 16, color: "#ccc", marginTop: 8 }}>Client revenue — bank verified</div>
          </div>
        </FadeIn>

        {/* Growth bars — monthly volume */}
        <FadeIn delay={40}>
          <div style={{ display: "flex", gap: 30, alignItems: "flex-end", marginTop: 30 }}>
            <GrowBar height={30} color={DIM} delay={50} dur={30} value="30" label="12 months ago" />
            <GrowBar height={75} color={CYAN} delay={60} dur={30} value="150" label="6 months ago" />
            <GrowBar height={125} color={GREEN} delay={70} dur={30} value="250" label="Last month" />
            <GrowBar height={200} color={GOLD} delay={80} dur={40} value="600" label="After ITV" />
          </div>
          <div style={{ fontSize: 14, color: "#aaa", marginTop: 12, textAlign: "center" }}>Families helped per month</div>
        </FadeIn>

        {/* Key metrics row */}
        <FadeIn delay={100}>
          <div style={{ display: "flex", gap: 60, marginTop: 30 }}>
            <div style={{ textAlign: "center" }}>
              <Counter value={1000} delay={105} dur={40} color={WHITE} size={40} />
              <div style={{ fontSize: 13, color: "#ccc", marginTop: 6 }}>Families helped</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <Counter value={94} delay={110} dur={30} suffix="%" color={GREEN} size={40} />
              <div style={{ fontSize: 13, color: "#ccc", marginTop: 6 }}>Success rate</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <Counter value={54} delay={115} dur={30} suffix="×" color={GOLD} size={40} />
              <div style={{ fontSize: 13, color: "#ccc", marginTop: 6 }}>Return on your £15K</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: CYAN, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>£120K</div>
              <div style={{ fontSize: 13, color: "#ccc", marginTop: 6 }}>Coming in every month</div>
            </div>
          </div>
        </FadeIn>
      </BGScene>

      {/* ═══ Scene 4: The Machine (45-65s) ═══ */}
      <BGScene from={1350} dur={600} bg="bg-cityscape.png" overlay="rgba(0,0,0,0.7)">
        <FadeIn delay={5}>
          <div style={{ fontSize: 16, color: CYAN, letterSpacing: 4, textTransform: "uppercase", marginBottom: 20, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>How It Works</div>
        </FadeIn>
        <FadeIn delay={10}>
          <Title size={40}>Zero humans. The machine runs everything.</Title>
        </FadeIn>

        {/* Animated pipeline */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 40 }}>
          <PipeStep icon="🎙" label="Voice AI Interview" color={PURPLE} delay={25} />
          <FadeIn delay={40}><div style={{ fontSize: 24, color: "#666" }}>→</div></FadeIn>
          <PipeStep icon="🧠" label="AI Enhances Answers" color={BLUE} delay={45} />
          <FadeIn delay={60}><div style={{ fontSize: 24, color: "#666" }}>→</div></FadeIn>
          <PipeStep icon="📋" label="Online Submission" color={CYAN} delay={65} />
          <FadeIn delay={80}><div style={{ fontSize: 24, color: "#666" }}>→</div></FadeIn>
          <PipeStep icon="🏦" label="Open Banking Detects Award" color={GREEN} delay={85} />
          <FadeIn delay={100}><div style={{ fontSize: 24, color: "#666" }}>→</div></FadeIn>
          <PipeStep icon="💳" label="PayPal Pay in 3 Collects" color={GOLD} delay={105} />
        </div>

        {/* The cascade */}
        <FadeIn delay={130}>
          <div style={{ marginTop: 40, display: "flex", gap: 16, alignItems: "center" }}>
            {[
              { benefit: "Attendance Allowance", fee: "£830", color: GREEN },
              { benefit: "Pension Credit", fee: "£900", color: CYAN },
              { benefit: "Council Tax", fee: "£150", color: GOLD },
            ].map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={{ fontSize: 24, color: "#666" }}>→</div>}
                <div style={{ textAlign: "center", background: "rgba(0,0,0,0.4)", border: `1px solid ${item.color}55`, borderRadius: 12, padding: "14px 18px", backdropFilter: "blur(10px)" }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: item.color }}>{item.fee}</div>
                  <div style={{ fontSize: 12, color: "#ccc", marginTop: 4 }}>{item.benefit}</div>
                </div>
              </React.Fragment>
            ))}
            <div style={{ fontSize: 24, color: "#666" }}>=</div>
            <div style={{ textAlign: "center", background: `${GREEN}15`, border: `2px solid ${GREEN}`, borderRadius: 12, padding: "14px 22px" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: GREEN }}>£1,880</div>
              <div style={{ fontSize: 12, color: "#ccc", marginTop: 4 }}>per family</div>
            </div>
          </div>
        </FadeIn>
      </BGScene>

      {/* ═══ Scene 5: Going Global (65-80s) ═══ */}
      <BGScene from={1950} dur={450} bg="bg-earth.png" overlay="rgba(0,0,0,0.55)">
        <FadeIn delay={5}>
          <div style={{ fontSize: 16, color: GOLD, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>The Bigger Picture</div>
        </FadeIn>
        <FadeIn delay={10}>
          <Title size={48}>38 Countries. $100 Billion Unclaimed.</Title>
        </FadeIn>
        <FadeIn delay={25}>
          <Body color="#ccc">Same technology. Different form. Every English-speaking country has fully online benefits portals.</Body>
        </FadeIn>

        {/* Country cards with projected revenue */}
        <FadeIn delay={40}>
          <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
            {[
              { flag: "🇬🇧", name: "UK", status: "LIVE", rev: "$72.6M Y3", color: GREEN },
              { flag: "🇦🇺", name: "Australia", status: "NEXT", rev: "$25.9M Y3", color: CYAN },
              { flag: "🇨🇦", name: "Canada", status: "MAPPED", rev: "$14.4M Y3", color: BLUE },
              { flag: "🇺🇸", name: "USA", status: "MAPPED", rev: "$10.0M Y3", color: GOLD },
            ].map((m, i) => (
              <FadeIn key={i} delay={50 + i * 15}>
                <div style={{
                  background: "rgba(0,0,0,0.4)", border: `1px solid ${m.color}55`,
                  borderRadius: 14, padding: "20px 24px", textAlign: "center",
                  backdropFilter: "blur(10px)", minWidth: 170,
                }}>
                  <div style={{ fontSize: 40, marginBottom: 6 }}>{m.flag}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: WHITE, textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>{m.name}</div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: m.status === "LIVE" ? "#000" : m.color,
                    background: m.status === "LIVE" ? m.color : "transparent",
                    border: m.status === "LIVE" ? "none" : `1px solid ${m.color}66`,
                    borderRadius: 6, padding: "2px 8px", marginTop: 6, display: "inline-block",
                    letterSpacing: 1,
                  }}>{m.status}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: m.color, marginTop: 10, textShadow: `0 2px 10px rgba(0,0,0,0.5)` }}>{m.rev}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={120}>
          <div style={{ marginTop: 20, fontSize: 22, fontWeight: 700, color: GREEN, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            Year 3 total: $122.9M across four markets
          </div>
        </FadeIn>
      </BGScene>

      {/* ═══ Scene 6: AI Products — Witness This (80-100s) ═══ */}
      <BGScene from={2400} dur={600} bg="bg-constellation.png" overlay="rgba(0,0,0,0.55)">
        <FadeIn delay={5}>
          <div style={{ fontSize: 16, color: LIGHT_PURPLE, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>What One Person Built With AI</div>
        </FadeIn>
        <FadeIn delay={10}>
          <Title size={40}>24 Products. 400,000 Lines of Code.</Title>
        </FadeIn>

        {/* Product showcase grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 24, width: "100%", maxWidth: 900 }}>
          <ProductCard name="Thuban" desc="AI code scanner. 10 languages, 69 rules. Live on npm. Stripe wired." status="LAUNCHED" color={GREEN} delay={20} />
          <ProductCard name="Silverwings" desc="Voice AI benefits. £809K revenue. 94% success rate." status="LAUNCHED" color={GREEN} delay={30} />
          <ProductCard name="NOVA ERP" desc="Replaced £45K/yr Zoho. Runs all 24 ventures." status="LAUNCHED" color={GREEN} delay={40} />
          <ProductCard name="NaviSynth" desc="Voice agent compiler. Every call makes it smarter." status="BETA" color={CYAN} delay={50} />
          <ProductCard name="SickDay.AI" desc="UK absence compliance. No competitor does this." status="MVP" color={CYAN} delay={60} />
          <ProductCard name="Afterlight" desc="Mobile compilation app. Your voice, preserved." status="BUILDING" color={GOLD} delay={70} />
          <ProductCard name="Bellatrix" desc="Digital COO. Self-assembling dashboards." status="BUILDING" color={GOLD} delay={80} />
          <ProductCard name="Best Mate" desc="Robot Craig. Surfs, codes, gets pints in." status="THE DREAM" color={PURPLE} delay={90} />
          <ProductCard name="The Imaginarium" desc="Human preservation beyond biological failure." status="THE GRAIL" color={GOLD} delay={100} />
        </div>

        <FadeIn delay={115}>
          <Body color={LIGHT_PURPLE}>I design it. Kenny tests it. The dev team hardens it. Darren sells it.</Body>
        </FadeIn>
      </BGScene>

      {/* ═══ Scene 7: ITV + Momentum (100-115s) ═══ */}
      <BGScene from={3000} dur={450} bg="bg-cityscape.png" overlay="rgba(0,0,0,0.65)">
        <FadeIn delay={5}>
          <div style={{ fontSize: 16, color: GOLD, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>What Happens Next</div>
        </FadeIn>
        <FadeIn delay={10}>
          <Title size={44}>ITV — Launching August</Title>
        </FadeIn>

        {/* ITV card */}
        <FadeIn delay={25}>
          <div style={{
            marginTop: 30, background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 20, padding: "30px 50px", textAlign: "center", backdropFilter: "blur(10px)",
            maxWidth: 700,
          }}>
            <div style={{ fontSize: 22, color: GOLD, fontWeight: 700, marginBottom: 10 }}>Six months of daytime TV</div>
            <div style={{ fontSize: 18, color: "#ddd" }}>They match every pound we spend. No cap.</div>
            <div style={{ fontSize: 16, color: "#aaa", marginTop: 10, fontStyle: "italic" }}>You know ITV, Irene. You advertise Hays Travel with them.</div>
          </div>
        </FadeIn>

        {/* Revenue projection bars */}
        <FadeIn delay={50}>
          <div style={{ marginTop: 30, display: "flex", gap: 40, alignItems: "flex-end" }}>
            <GrowBar height={40} color={DIM} delay={55} value="£809K" label="Year 1 (done)" width={100} />
            <GrowBar height={120} color={CYAN} delay={65} value="£3.2M" label="Year 2 (on track)" width={100} />
            <GrowBar height={220} color={GREEN} delay={75} value="£8.4M" label="Year 3 (projected)" width={100} />
          </div>
        </FadeIn>
      </BGScene>

      {/* ═══ Scene 8: The Honest Picture (115-130s) ═══ */}
      <BGScene from={3450} dur={450} bg="bg-warm.png" overlay="rgba(0,0,0,0.7)">
        <FadeIn delay={5}>
          <Title size={44}>The Honest Picture</Title>
        </FadeIn>
        <FadeIn delay={20}>
          <Body>
            Year one, I borrowed £120K from iwoca and BizCap to survive.<br/>
            Revolving facilities to bridge the gaps while we figured it out.<br/>
            30% already repaid. No equity given. No covenants.
          </Body>
        </FadeIn>
        <FadeIn delay={50}>
          <Body color={DIM}>
            First-year survival capital. You'd see it in the bank statement anyway.<br/>
            You deserve the full picture.
          </Body>
        </FadeIn>

        {/* Repayment progress bar */}
        <FadeIn delay={75}>
          <div style={{ marginTop: 40, width: 500 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: "#ccc" }}>£120K borrowed</span>
              <span style={{ fontSize: 14, color: GREEN, fontWeight: 700 }}>30% repaid</span>
            </div>
            <div style={{ width: "100%", height: 12, background: "rgba(255,255,255,0.1)", borderRadius: 6 }}>
              <div style={{ width: "30%", height: "100%", background: `linear-gradient(90deg, ${GREEN}, ${CYAN})`, borderRadius: 6, boxShadow: `0 0 15px ${GREEN}44` }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <span style={{ fontSize: 12, color: "#888" }}>No equity given</span>
              <span style={{ fontSize: 12, color: "#888" }}>No covenants</span>
            </div>
          </div>
        </FadeIn>
      </BGScene>

      {/* ═══ Scene 9: The Ask (130-160s) ═══ */}
      <BGScene from={3900} dur={900} bg="bg-cityscape.png" overlay="rgba(0,0,0,0.7)">
        <FadeIn delay={10}>
          <Title size={72}>£250,000</Title>
        </FadeIn>
        <FadeIn delay={25}>
          <Body>A loan, not equity. You keep no stake. I'll pay it back.</Body>
        </FadeIn>

        {/* Use of funds breakdown with visual bars */}
        <FadeIn delay={40}>
          <div style={{ marginTop: 30, width: "100%", maxWidth: 700 }}>
            {[
              { use: "ITV advertising", amount: "£100K", pct: 40, note: "ITV matches it = £200K airtime", color: GREEN },
              { use: "Operating bridge", amount: "£75K", pct: 30, note: "Bridge while revenue catches up", color: CYAN },
              { use: "Voice AI scaling", amount: "£50K", pct: 20, note: "Handle the volume surge", color: GOLD },
              { use: "International prep", amount: "£25K", pct: 10, note: "38 countries mapped, ready to go", color: LIGHT_PURPLE },
            ].map((item, i) => (
              <FadeIn key={i} delay={45 + i * 12}>
                <div style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", gap: 16 }}>
                  <div style={{ flex: 1.5, fontSize: 18, color: WHITE, textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>{item.use}</div>
                  <div style={{ flex: 0.8, fontSize: 20, color: item.color, fontWeight: 700, textAlign: "center" }}>{item.amount}</div>
                  <div style={{ flex: 2, position: "relative", height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4 }}>
                    <div style={{ width: `${item.pct}%`, height: "100%", background: item.color, borderRadius: 4, boxShadow: `0 0 10px ${item.color}44` }} />
                  </div>
                  <div style={{ flex: 2, fontSize: 14, color: "#aaa", textAlign: "right" }}>{item.note}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>

        {/* Repayment terms */}
        <FadeIn delay={100}>
          <div style={{ display: "flex", gap: 50, marginTop: 36 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: GREEN, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>£12.5K</div>
              <div style={{ fontSize: 13, color: "#ccc" }}>Monthly repayment</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: CYAN, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>20 months</div>
              <div style={{ fontSize: 13, color: "#ccc" }}>Fully repaid</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: GOLD, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>20%</div>
              <div style={{ fontSize: 13, color: "#ccc" }}>Of net cashflow</div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={120}>
          <Body color={GREEN}>5,000 families in six months. £4M in revenue. You're repaid from a fraction.</Body>
        </FadeIn>
      </BGScene>

      {/* ═══ Scene 10: Thank You (160-205s) ═══ */}
      <BGScene from={4800} dur={1350} bg="bg-earth.png" overlay="rgba(0,0,0,0.5)">
        <FadeIn delay={15}>
          <div style={{ fontSize: 20, color: LIGHT_PURPLE, fontWeight: 600, marginBottom: 30, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>From your £15,000</div>
        </FadeIn>
        <FadeIn delay={30}>
          <Title size={52}>£809K in revenue.<br/>1,000 families helped.<br/>24 products built.</Title>
        </FadeIn>
        <FadeIn delay={60}>
          <div style={{ marginTop: 40, fontSize: 26, color: WARM, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            Thank you, Irene. For everything.
          </div>
        </FadeIn>
        <FadeIn delay={80}>
          <div style={{ marginTop: 20, fontSize: 18, color: DIM }}>
            Craig
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div style={{ marginTop: 50, fontSize: 18, fontStyle: "italic", color: "#c0c0c0", letterSpacing: 1, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            No food, no dream. No dream, no food.
          </div>
        </FadeIn>
      </BGScene>
    </AbsoluteFill>
  );
};
