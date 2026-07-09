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
  // Slow zoom on background
  const scale = interpolate(frame, [0, dur], [1.0, 1.08], { extrapolateRight: "clamp" });
  return (
    <Sequence from={from} durationInFrames={dur}>
      <AbsoluteFill style={{ opacity }}>
        {/* Background image with slow zoom */}
        <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
          <Img src={staticFile(bg)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </AbsoluteFill>
        {/* Dark overlay for text readability */}
        <AbsoluteFill style={{ background: overlay }} />
        {/* Content */}
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

const Stat: React.FC<{ value: string; label: string; color: string }> = ({ value, label, color }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ fontSize: 56, fontWeight: 900, color, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>{value}</div>
    <div style={{ fontSize: 15, color: "#ccc", marginTop: 8, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{label}</div>
  </div>
);

/* ─── MAIN COMPOSITION ─── */
export const IrenePitch: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Audio src={staticFile("vo-irene-presentation.mp3")} volume={1} />

      {/* Scene 1: For Irene (0–12s) — cityscape */}
      <BGScene from={0} dur={360} bg="bg-cityscape.png" overlay="rgba(0,0,0,0.6)">
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

      {/* Scene 2: Dad & The £15K (12–34s) — warm light */}
      <BGScene from={360} dur={660} bg="bg-warm.png" overlay="rgba(0,0,0,0.65)">
        <FadeIn delay={10}>
          <div style={{ maxWidth: 700, fontSize: 28, color: WARM, textAlign: "center", lineHeight: 1.8, fontStyle: "italic", textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}>
            "Two years ago, Dad got his diagnosis.<br/>
            Dementia and bladder cancer.<br/><br/>
            You handed me £15,000<br/>
            and said keep going."
          </div>
        </FadeIn>
        <FadeIn delay={80}>
          <div style={{ marginTop: 50, fontSize: 22, color: WHITE, textAlign: "center" }}>
            This is what that £15,000 became.
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 3: What It Became (34–56s) — cityscape */}
      <BGScene from={1020} dur={660} bg="bg-cityscape.png" overlay="rgba(0,0,0,0.7)">
        <FadeIn delay={5}>
          <div style={{ display: "flex", gap: 80 }}>
            <Stat value="£809K" label="Client revenue — bank verified" color={GREEN} />
            <Stat value="£120K" label="Coming in every month" color={CYAN} />
          </div>
        </FadeIn>
        <FadeIn delay={30}>
          <div style={{ display: "flex", gap: 80, marginTop: 50 }}>
            <Stat value="1,000" label="Families helped" color={WHITE} />
            <Stat value="94%" label="Success rate" color={GREEN} />
            <Stat value="54×" label="Return on your £15K" color={GOLD} />
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 4: The Honest Picture (56–82s) — warm light */}
      <BGScene from={1680} dur={780} bg="bg-warm.png" overlay="rgba(0,0,0,0.7)">
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
        <FadeIn delay={75}>
          <div style={{ marginTop: 40, display: "flex", gap: 40 }}>
            {[
              { label: "Voice AI runs the interview", color: CYAN },
              { label: "AI enhances every answer", color: GREEN },
              { label: "Open banking auto-bills", color: GOLD },
            ].map((item, i) => (
              <FadeIn key={i} delay={80 + i * 15}>
                <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: "24px 30px", textAlign: "center", width: 220, backdropFilter: "blur(10px)" }}>
                  <div style={{ fontSize: 16, color: item.color, fontWeight: 600 }}>{item.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 5: The Cascade + Open Banking (82–100s) — constellation */}
      <BGScene from={2460} dur={540} bg="bg-constellation.png" overlay="rgba(0,0,0,0.55)">
        <FadeIn delay={5}>
          <Title size={40}>One phone call. Three fees. £1,880.</Title>
        </FadeIn>
        <FadeIn delay={25}>
          <div style={{ marginTop: 40, display: "flex", gap: 20, alignItems: "center" }}>
            {[
              { benefit: "Attendance Allowance", fee: "£830", color: GREEN },
              { benefit: "Pension Credit", fee: "£900", color: CYAN },
              { benefit: "Council Tax", fee: "£150", color: GOLD },
            ].map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={{ fontSize: 30, color: DIM }}>→</div>}
                <div style={{ textAlign: "center", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: "18px 24px", backdropFilter: "blur(10px)" }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: item.color }}>{item.fee}</div>
                  <div style={{ fontSize: 13, color: "#ccc", marginTop: 6 }}>{item.benefit}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={55}>
          <Body color={GREEN}>
            Open banking detects the award. Invoice goes out. PayPal Pay in 3 collects it.<br/>
            Nobody touches it. No chasing. No bad debt.
          </Body>
        </FadeIn>
      </BGScene>

      {/* Scene 6: Growth + ITV (100–122s) — cityscape */}
      <BGScene from={3000} dur={660} bg="bg-cityscape.png" overlay="rgba(0,0,0,0.65)">
        <FadeIn delay={5}>
          <div style={{ display: "flex", gap: 60 }}>
            {[
              { period: "12 months ago", vol: "30/mo", color: DIM },
              { period: "6 months ago", vol: "150/mo", color: CYAN },
              { period: "Last month", vol: "250/mo", color: GREEN },
              { period: "After ITV", vol: "600/mo", color: GOLD },
            ].map((item, i) => (
              <FadeIn key={i} delay={10 + i * 15}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 40, fontWeight: 900, color: item.color, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>{item.vol}</div>
                  <div style={{ fontSize: 13, color: "#aaa", marginTop: 6 }}>{item.period}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={70}>
          <div style={{ marginTop: 50, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, padding: "30px 50px", textAlign: "center", backdropFilter: "blur(10px)" }}>
            <div style={{ fontSize: 22, color: GOLD, fontWeight: 700, marginBottom: 10 }}>ITV — Launching August</div>
            <div style={{ fontSize: 18, color: "#ddd" }}>They match every pound we spend. No cap. Six months of daytime TV.</div>
            <div style={{ fontSize: 16, color: DIM, marginTop: 10, fontStyle: "italic" }}>You know ITV, Irene. You advertise Hays Travel with them.</div>
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 7: The Ask (122–152s) — warm light */}
      <BGScene from={3660} dur={900} bg="bg-warm.png" overlay="rgba(0,0,0,0.7)">
        <FadeIn delay={10}>
          <Title size={64}>£250,000</Title>
        </FadeIn>
        <FadeIn delay={25}>
          <Body>A loan, not equity. You keep no stake. I'll pay it back.</Body>
        </FadeIn>
        <FadeIn delay={40}>
          <div style={{ marginTop: 30, width: "100%" }}>
            {[
              { use: "ITV advertising", amount: "£100K", note: "ITV matches it = £200K airtime", color: GREEN },
              { use: "Operating bridge", amount: "£75K", note: "Bridge while revenue catches up", color: CYAN },
              { use: "Voice AI scaling", amount: "£50K", note: "Handle the volume surge", color: GOLD },
              { use: "International prep", amount: "£25K", note: "38 countries mapped, ready to go", color: LIGHT_PURPLE },
            ].map((item, i) => (
              <FadeIn key={i} delay={45 + i * 12}>
                <div style={{ display: "flex", alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ flex: 2, fontSize: 20, color: WHITE }}>{item.use}</div>
                  <div style={{ flex: 1, fontSize: 20, color: item.color, fontWeight: 700, textAlign: "center" }}>{item.amount}</div>
                  <div style={{ flex: 2, fontSize: 16, color: "#aaa", textAlign: "right" }}>{item.note}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div style={{ display: "flex", gap: 60, marginTop: 40 }}>
            <Stat value="£12.5K" label="Monthly repayment" color={GREEN} />
            <Stat value="20 mo" label="Fully repaid" color={CYAN} />
            <Stat value="20%" label="Of net cashflow" color={GOLD} />
          </div>
        </FadeIn>
        <FadeIn delay={120}>
          <Body color={GREEN}>5,000 families in six months. £4M in revenue. You're repaid from a fraction.</Body>
        </FadeIn>
      </BGScene>

      {/* Scene 8: The Constellation (152–172s) — constellation map */}
      <BGScene from={4560} dur={600} bg="bg-constellation.png" overlay="rgba(0,0,0,0.5)">
        <FadeIn delay={5}>
          <div style={{ fontSize: 16, color: LIGHT_PURPLE, letterSpacing: 4, textTransform: "uppercase", marginBottom: 20 }}>The Orion Constellation</div>
        </FadeIn>
        <FadeIn delay={15}>
          <Title size={40}>24 AI-Powered Products. One Founder.</Title>
        </FadeIn>
        <FadeIn delay={25}>
          <Body color={DIM}>AI builds at 100× speed. That's how one person did all of this.</Body>
        </FadeIn>
        <FadeIn delay={35}>
          <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, width: "100%" }}>
            {[
              { name: "Silverwings", status: "LIVE", color: GREEN },
              { name: "Thuban", status: "LIVE", color: GREEN },
              { name: "NOVA ERP", status: "LIVE", color: GREEN },
              { name: "Orion", status: "LIVE", color: GREEN },
              { name: "Prometheus", status: "LIVE", color: GREEN },
              { name: "Navisynth", status: "BETA", color: CYAN },
              { name: "SickDay.AI", status: "MVP", color: CYAN },
              { name: "Afterlight", status: "BUILD", color: GOLD },
              { name: "Bellatrix", status: "BUILD", color: GOLD },
              { name: "Mintaka", status: "BUILD", color: GOLD },
              { name: "Saiph", status: "BUILD", color: GOLD },
              { name: "Rigel", status: "BUILD", color: GOLD },
            ].map((item, i) => (
              <FadeIn key={i} delay={35 + i * 4}>
                <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 14px", textAlign: "center", backdropFilter: "blur(10px)" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: WHITE }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: item.color, marginTop: 3, fontWeight: 600 }}>{item.status}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={90}>
          <Body color={LIGHT_PURPLE}>I design it. Kenny tests it. The dev team hardens it. Darren sells it.</Body>
        </FadeIn>
      </BGScene>

      {/* Scene 9: Thank You (172–205s) — earth from orbit */}
      <BGScene from={5160} dur={990} bg="bg-earth.png" overlay="rgba(0,0,0,0.5)">
        <FadeIn delay={15}>
          <div style={{ fontSize: 20, color: LIGHT_PURPLE, fontWeight: 600, marginBottom: 30 }}>From your £15,000</div>
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
          <div style={{ marginTop: 50, fontSize: 18, fontStyle: "italic", color: "#c0c0c0", letterSpacing: 1 }}>
            No food, no dream. No dream, no food.
          </div>
        </FadeIn>
      </BGScene>
    </AbsoluteFill>
  );
};
