import React from "react";
import {
  AbsoluteFill, Audio, useCurrentFrame, useVideoConfig,
  interpolate, Sequence, staticFile,
} from "remotion";

/* ─── Palette (warm, personal, purple-accented) ─── */
const BG = "#0a0a1a";
const WHITE = "#ffffff";
const PURPLE = "#7c3aed";
const LIGHT_PURPLE = "#a78bfa";
const GREEN = "#00ff88";
const CYAN = "#00f6ff";
const DIM = "#64748b";
const GOLD = "#fbbf24";
const SILVER = "#c0c0c0";
const RED = "#ff4444";

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
  const opacity = interpolate(frame, [0, fadeIn, dur - fadeOut, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Sequence from={from} durationInFrames={dur}>
      <AbsoluteFill style={{
        opacity, background: BG, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        fontFamily: "'Inter', -apple-system, sans-serif", padding: "80px 120px",
      }}>
        {children}
      </AbsoluteFill>
    </Sequence>
  );
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: LIGHT_PURPLE, marginBottom: 24 }}>{children}</div>
);

const Title: React.FC<{ children: React.ReactNode; size?: number }> = ({ children, size = 64 }) => (
  <div style={{ fontSize: size, fontWeight: 800, color: WHITE, textAlign: "center", lineHeight: 1.15, letterSpacing: -1 }}>{children}</div>
);

const Sub: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 24, color: DIM, textAlign: "center", marginTop: 20, maxWidth: 800, lineHeight: 1.5 }}>{children}</div>
);

const MetricRow: React.FC<{ items: { label: string; value: string; color: string }[] }> = ({ items }) => (
  <div style={{ display: "flex", gap: 60, marginTop: 50 }}>
    {items.map((item, i) => (
      <div key={i} style={{ textAlign: "center" }}>
        <div style={{ fontSize: 56, fontWeight: 900, color: item.color }}>{item.value}</div>
        <div style={{ fontSize: 16, color: DIM, marginTop: 8 }}>{item.label}</div>
      </div>
    ))}
  </div>
);

const TableRow: React.FC<{
  cols: string[]; colors?: string[]; bold?: boolean; bg?: string;
}> = ({ cols, colors, bold = false, bg = "transparent" }) => (
  <div style={{
    display: "flex", background: bg, borderBottom: "1px solid #1e1e3a",
    padding: "14px 0",
  }}>
    {cols.map((col, i) => (
      <div key={i} style={{
        flex: i === 0 ? 2 : 1, fontSize: 20, fontWeight: bold ? 700 : 400,
        color: colors?.[i] || (i === 0 ? WHITE : DIM),
        textAlign: i === 0 ? "left" : "center",
      }}>{col}</div>
    ))}
  </div>
);

/* ─── MAIN COMPOSITION ─── */
export const IrenePitch: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <Audio src={staticFile("vo-irene-presentation.mp3")} volume={1} />

      {/* Scene 1: Title (0–5s) */}
      <SceneWrap from={0} dur={150}>
        <FadeIn delay={5}>
          <Label>Progress Report — July 2026</Label>
        </FadeIn>
        <FadeIn delay={15}>
          <Title size={72}>Silverwings<br/>Benefits</Title>
        </FadeIn>
        <FadeIn delay={35}>
          <Sub>From £15,000 to £120,000 per month — and what comes next</Sub>
        </FadeIn>
        <FadeIn delay={55}>
          <div style={{ marginTop: 40, padding: "8px 24px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 99, color: LIGHT_PURPLE, fontSize: 15, fontWeight: 600 }}>
            Prepared for Dame Irene Hays
          </div>
        </FadeIn>
      </SceneWrap>

      {/* Scene 2: Thank You (5–12s) */}
      <SceneWrap from={150} dur={210}>
        <FadeIn delay={5}>
          <Title size={48}>Thank You, Irene</Title>
        </FadeIn>
        <FadeIn delay={25}>
          <div style={{ marginTop: 30, maxWidth: 700, fontSize: 22, color: SILVER, textAlign: "center", lineHeight: 1.7, fontStyle: "italic" }}>
            Two years ago, when Dad was diagnosed with dementia and bladder cancer, you gave me £15,000. That money kept the lights on and let me prove the model.
          </div>
        </FadeIn>
        <FadeIn delay={55}>
          <div style={{ marginTop: 30, fontSize: 22, color: WHITE, textAlign: "center", lineHeight: 1.7 }}>
            This is what that £15,000 became.
          </div>
        </FadeIn>
      </SceneWrap>

      {/* Scene 3: Where We Are (12–20s) */}
      <SceneWrap from={360} dur={240}>
        <Label>Where Your £15,000 Got Us</Label>
        <FadeIn delay={5}>
          <MetricRow items={[
            { label: "Client Revenue (Verified)", value: "£809K", color: GREEN },
            { label: "Monthly Revenue", value: "£120K", color: CYAN },
            { label: "Return On Your Seed", value: "54×", color: PURPLE },
          ]} />
        </FadeIn>
        <FadeIn delay={35}>
          <div style={{ display: "flex", gap: 60, marginTop: 50 }}>
            {[
              { label: "Claims Completed", value: "1,000", color: WHITE },
              { label: "Success Rate", value: "94%", color: GREEN },
              { label: "Trustpilot Reviews", value: "120 ★", color: GOLD },
              { label: "Work-in-Progress", value: "£440K", color: CYAN },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: item.color }}>{item.value}</div>
                <div style={{ fontSize: 13, color: DIM, marginTop: 6 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </SceneWrap>

      {/* Scene 4: Growth Curve (20–28s) */}
      <SceneWrap from={600} dur={240}>
        <Label>Growth Trajectory</Label>
        <FadeIn delay={5}>
          <Title size={48}>The Hockey Stick</Title>
        </FadeIn>
        <FadeIn delay={20}>
          <div style={{ marginTop: 30, width: "100%" }}>
            <TableRow cols={["Period", "Claims/mo", "Revenue", "What Changed"]} colors={[DIM, DIM, DIM, DIM]} bold />
            <TableRow cols={["12 months ago", "30-50", "£30K", "Proving the model"]} colors={[WHITE, DIM, DIM, DIM]} />
            <TableRow cols={["6 months ago", "150", "£80K", "Team built, process refined"]} colors={[WHITE, DIM, CYAN, DIM]} />
            <TableRow cols={["Last month", "250", "£120K", "Voice AI deployed"]} colors={[WHITE, GREEN, GREEN, GREEN]} />
            <TableRow cols={["August 2026", "600", "£250K+", "ITV launches"]} colors={[WHITE, GOLD, GOLD, GOLD]} bold />
          </div>
        </FadeIn>
        <FadeIn delay={55}>
          <div style={{ marginTop: 20, fontSize: 18, color: GREEN, fontWeight: 600 }}>
            12 staff roles eliminated by AI automation — £300K/year saved
          </div>
        </FadeIn>
      </SceneWrap>

      {/* Scene 5: The Cascade (28–35s) */}
      <SceneWrap from={840} dur={210}>
        <Label>The Cascade</Label>
        <FadeIn delay={5}>
          <Title size={44}>One client. Three fees. No extra cost.</Title>
        </FadeIn>
        <FadeIn delay={25}>
          <div style={{ marginTop: 40, display: "flex", gap: 30, alignItems: "center" }}>
            {[
              { benefit: "Attendance Allowance", fee: "£830", color: GREEN },
              { benefit: "Pension Credit", fee: "£900", color: CYAN },
              { benefit: "Council Tax Reduction", fee: "£150", color: GOLD },
            ].map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={{ fontSize: 36, color: DIM }}>→</div>}
                <div style={{ textAlign: "center", background: "rgba(255,255,255,0.03)", border: "1px solid #1e1e3a", borderRadius: 16, padding: "20px 30px" }}>
                  <div style={{ fontSize: 36, fontWeight: 900, color: item.color }}>{item.fee}</div>
                  <div style={{ fontSize: 14, color: DIM, marginTop: 6 }}>{item.benefit}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={55}>
          <div style={{ marginTop: 30, fontSize: 24, fontWeight: 700, color: WHITE, textAlign: "center" }}>
            = £1,880 per pensioner. Same voice AI call.
          </div>
        </FadeIn>
      </SceneWrap>

      {/* Scene 6: ITV Deal (35–42s) */}
      <SceneWrap from={1050} dur={210}>
        <Label>The ITV Deal</Label>
        <FadeIn delay={5}>
          <Title size={48}>6 Months on ITV</Title>
        </FadeIn>
        <FadeIn delay={20}>
          <div style={{ marginTop: 30, width: "100%", maxWidth: 700 }}>
            {[
              { text: "ITV matches every pound we spend — no maximum limit", color: GREEN },
              { text: "Advert approved by Clearcast and ready for playout", color: CYAN },
              { text: "ITV Backing Business branding on TV and website", color: GOLD },
              { text: "Daytime TV reaches our exact demographic", color: PURPLE },
            ].map((item, i) => (
              <FadeIn key={i} delay={25 + i * 12}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: "1px solid #1e1e3a" }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: item.color, flexShrink: 0 }} />
                  <div style={{ fontSize: 20, color: WHITE }}>{item.text}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={70}>
          <Sub>You know ITV, Irene. You advertise Hays Travel with them. You know matched funding works.</Sub>
        </FadeIn>
      </SceneWrap>

      {/* Scene 7: Financial Position (42–50s) */}
      <SceneWrap from={1260} dur={240}>
        <Label>Financial Position</Label>
        <FadeIn delay={5}>
          <Title size={48}>Clean. Lean. Growing.</Title>
        </FadeIn>
        <FadeIn delay={20}>
          <div style={{ marginTop: 30, width: "100%" }}>
            <TableRow cols={["", "Detail"]} colors={[DIM, DIM]} bold />
            <TableRow cols={["Client revenue (13 months)", "£809,000 — bank verified"]} colors={[WHITE, GREEN]} />
            <TableRow cols={["First-year survival capital", "£120K — bootstrapped, 30% repaid"]} colors={[WHITE, DIM]} />
            <TableRow cols={["Monthly revenue", "£120,000 and growing"]} colors={[WHITE, GREEN]} />
            <TableRow cols={["Overheads (August)", "£60,000/month"]} colors={[WHITE, CYAN]} />
            <TableRow cols={["Net cashflow", "£60,000+/month"]} colors={[WHITE, GREEN]} />
            <TableRow cols={["Open banking auto-billing", "Zero human touch — award to cash"]} colors={[WHITE, GOLD]} />
            <TableRow cols={["AI staff savings", "£300K/year (12 roles replaced)"]} colors={[WHITE, GOLD]} />
            <TableRow cols={["External investors", "None — only your £15K"]} colors={[WHITE, PURPLE]} />
          </div>
        </FadeIn>
      </SceneWrap>

      {/* Scene 8: The Ask (50–60s) */}
      <SceneWrap from={1500} dur={300}>
        <Label>The Ask</Label>
        <FadeIn delay={10}>
          <Title size={72}>£100,000 Loan</Title>
        </FadeIn>
        <FadeIn delay={30}>
          <div style={{ marginTop: 30, width: "100%" }}>
            <TableRow cols={["Use", "Amount", "Impact"]} colors={[DIM, DIM, DIM]} bold />
            <TableRow cols={["ITV Advertising", "£50,000", "ITV matches = £100K airtime"]} colors={[WHITE, GREEN, GOLD]} />
            <TableRow cols={["Operating Bridge", "£30,000", "Bridge 30-day cash gap"]} colors={[WHITE, GREEN, CYAN]} />
            <TableRow cols={["Voice AI Scaling", "£20,000", "Handle ITV volume surge"]} colors={[WHITE, GREEN, CYAN]} />
          </div>
        </FadeIn>
        <FadeIn delay={55}>
          <div style={{ display: "flex", gap: 60, marginTop: 40 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: GREEN }}>£5K</div>
              <div style={{ fontSize: 14, color: DIM }}>Monthly Repayment</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: CYAN }}>20 mo</div>
              <div style={{ fontSize: 14, color: DIM }}>Repayment Period</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: GOLD }}>Sep 2026</div>
              <div style={{ fontSize: 14, color: DIM }}>First Payment</div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={80}>
          <div style={{ marginTop: 25, fontSize: 18, color: GREEN, fontWeight: 600, textAlign: "center" }}>
            8% of net cashflow. Fully covered. No risk to your capital.
          </div>
        </FadeIn>
      </SceneWrap>

      {/* Scene 9: ROI (60–68s) */}
      <SceneWrap from={1800} dur={240}>
        <Label>What £100K Becomes</Label>
        <FadeIn delay={5}>
          <Title size={56}>30:1 Return</Title>
        </FadeIn>
        <FadeIn delay={20}>
          <div style={{ marginTop: 30, width: "100%" }}>
            <TableRow cols={["From £100K Investment", "Revenue"]} colors={[DIM, DIM]} bold />
            <TableRow cols={["2,500 AA claims × 94% × £830", "£1,950,500"]} colors={[WHITE, GREEN]} />
            <TableRow cols={["1,000 PC claims (40%) × £900", "£900,000"]} colors={[WHITE, CYAN]} />
            <TableRow cols={["1,000 CTR claims × £150", "£150,000"]} colors={[WHITE, GOLD]} />
            <TableRow cols={["TOTAL", "£3,000,000"]} colors={[WHITE, GREEN]} bold bg="rgba(0,255,136,0.05)" />
          </div>
        </FadeIn>
        <FadeIn delay={55}>
          <Sub>Your £100K generates £3M in revenue. You're repaid from a fraction.</Sub>
        </FadeIn>
      </SceneWrap>

      {/* Scene 10: The Constellation (68–76s) */}
      <SceneWrap from={2040} dur={240}>
        <Label>What I Built</Label>
        <FadeIn delay={5}>
          <Title size={44}>24 Products. 400K+ Lines of Code.<br/>Built by One Person.</Title>
        </FadeIn>
        <FadeIn delay={25}>
          <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, width: "100%" }}>
            {[
              { name: "Silverwings", status: "LIVE", color: GREEN },
              { name: "Thuban", status: "LIVE", color: GREEN },
              { name: "NOVA ERP", status: "LIVE", color: GREEN },
              { name: "Orion", status: "LIVE", color: GREEN },
              { name: "Navisynth", status: "BETA", color: CYAN },
              { name: "SickDay.AI", status: "MVP", color: CYAN },
              { name: "Remain", status: "BUILD", color: GOLD },
              { name: "Bellatrix", status: "BUILD", color: GOLD },
              { name: "Mintaka", status: "BUILD", color: GOLD },
              { name: "Saiph", status: "BUILD", color: GOLD },
              { name: "Rigel", status: "BUILD", color: GOLD },
              { name: "Prometheus", status: "LIVE", color: GREEN },
            ].map((item, i) => (
              <FadeIn key={i} delay={25 + i * 5}>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #1e1e3a", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: WHITE }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: item.color, marginTop: 3, fontWeight: 600 }}>{item.status}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={80}>
          <div style={{ marginTop: 25, fontSize: 18, color: LIGHT_PURPLE, fontWeight: 600, textAlign: "center" }}>
            Now we have a method: I build it. Kenny tests it. The dev team hardens it. Darren sells it.
          </div>
        </FadeIn>
      </SceneWrap>

      {/* Scene 11: Global (76–82s) */}
      <SceneWrap from={2280} dur={180}>
        <Label>Where We're Going</Label>
        <FadeIn delay={5}>
          <Title size={48}>38 Countries.<br/>£1 Trillion Unclaimed.</Title>
        </FadeIn>
        <FadeIn delay={25}>
          <MetricRow items={[
            { label: "Countries Mapped", value: "5", color: GREEN },
            { label: "OECD Target", value: "38", color: CYAN },
            { label: "Global Unclaimed", value: "£1T", color: GOLD },
          ]} />
        </FadeIn>
        <FadeIn delay={50}>
          <Sub>UK is the proving ground. The world is the market. Same technology. Same economics.</Sub>
        </FadeIn>
      </SceneWrap>

      {/* Scene 12: Close (82–90s) */}
      <SceneWrap from={2460} dur={240}>
        <FadeIn delay={10}>
          <div style={{ fontSize: 22, color: LIGHT_PURPLE, fontWeight: 600, marginBottom: 20 }}>From your £15,000</div>
        </FadeIn>
        <FadeIn delay={25}>
          <Title size={56}>£809K in Revenue.<br/>1,000 People Helped.<br/>24 Products Built.</Title>
        </FadeIn>
        <FadeIn delay={50}>
          <div style={{ marginTop: 30, fontSize: 22, color: DIM }}>
            Thank you, Irene.
          </div>
        </FadeIn>
        <FadeIn delay={65}>
          <div style={{ marginTop: 20, fontSize: 20, color: DIM }}>
            Craig Lowther — CEO & Founder
          </div>
        </FadeIn>
        <FadeIn delay={80}>
          <div style={{ marginTop: 50, fontSize: 20, fontStyle: "italic", color: SILVER, letterSpacing: 1 }}>
            No food, no dream. No dream, no food.
          </div>
        </FadeIn>
      </SceneWrap>
    </AbsoluteFill>
  );
};
