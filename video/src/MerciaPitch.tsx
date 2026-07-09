import React from "react";
import {
  AbsoluteFill, Audio, Img, useCurrentFrame,
  interpolate, Sequence, staticFile,
} from "remotion";

/* ─── Palette ─── */
const WHITE = "#ffffff";
const CYAN = "#00f6ff";
const GREEN = "#00ff88";
const PURPLE = "#7c3aed";
const BLUE = "#3b82f6";
const GOLD = "#fbbf24";
const DIM = "#64748b";
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
          fontFamily: "'Inter', -apple-system, sans-serif", padding: "80px 120px",
        }}>
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
    </Sequence>
  );
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: CYAN, marginBottom: 24, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{children}</div>
);

const Title: React.FC<{ children: React.ReactNode; size?: number }> = ({ children, size = 64 }) => (
  <div style={{ fontSize: size, fontWeight: 800, color: WHITE, textAlign: "center", lineHeight: 1.15, letterSpacing: -1, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>{children}</div>
);

const Sub: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 24, color: "#ccc", textAlign: "center", marginTop: 20, maxWidth: 800, lineHeight: 1.5, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>{children}</div>
);

const MetricRow: React.FC<{ items: { label: string; value: string; color: string }[] }> = ({ items }) => (
  <div style={{ display: "flex", gap: 60, marginTop: 50 }}>
    {items.map((item, i) => (
      <div key={i} style={{ textAlign: "center" }}>
        <div style={{ fontSize: 56, fontWeight: 900, color: item.color, textShadow: `0 4px 30px rgba(0,0,0,0.5)` }}>{item.value}</div>
        <div style={{ fontSize: 16, color: "#aaa", marginTop: 8, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{item.label}</div>
      </div>
    ))}
  </div>
);

const TableRow: React.FC<{
  cols: string[]; colors?: string[]; bold?: boolean; bg?: string;
}> = ({ cols, colors, bold = false, bg = "rgba(0,0,0,0.3)" }) => (
  <div style={{
    display: "flex", background: bg, borderBottom: "1px solid rgba(255,255,255,0.1)",
    padding: "14px 0", backdropFilter: "blur(4px)",
  }}>
    {cols.map((col, i) => (
      <div key={i} style={{
        flex: i === 0 ? 2 : 1, fontSize: 20, fontWeight: bold ? 700 : 400,
        color: colors?.[i] || (i === 0 ? WHITE : "#aaa"),
        textAlign: i === 0 ? "left" : "center",
        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
      }}>{col}</div>
    ))}
  </div>
);

/* ─── MAIN COMPOSITION ─── */
export const MerciaPitch: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Audio src={staticFile("vo-mercia-pitch.mp3")} volume={1} />

      {/* Scene 1: Title (0-4s) */}
      <BGScene from={0} dur={120} bg="bg-cityscape.png">
        <Label>Confidential Investment Memo</Label>
        <FadeIn delay={10}>
          <Title size={72}>Silverwings<br/>Venture Foundry</Title>
        </FadeIn>
        <FadeIn delay={30}>
          <Sub>AI-powered SaaS spin-out engine backed by cashflow-positive benefits operation</Sub>
        </FadeIn>
        <FadeIn delay={50}>
          <div style={{ marginTop: 40, padding: "8px 24px", background: "rgba(0,102,255,0.15)", border: "1px solid rgba(0,102,255,0.3)", borderRadius: 99, color: CYAN, fontSize: 16, fontWeight: 600, backdropFilter: "blur(10px)" }}>
            North East Accelerate Fund — Mercia
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 2: The Origin (4-10s) */}
      <BGScene from={120} dur={180} bg="bg-warm.png">
        <Label>The Origin</Label>
        <FadeIn delay={5}>
          <Title size={52}>We built a benefits business.</Title>
        </FadeIn>
        <FadeIn delay={25}>
          <Sub>Voice AI interview → AI-enhanced answers → open banking auto-billing. Award detected → invoice sent → PayPal Pay in 3 collected. Zero human touch.</Sub>
        </FadeIn>
        <FadeIn delay={45}>
          <MetricRow items={[
            { label: "Client Revenue (13mo)", value: "£809K", color: GREEN },
            { label: "Success Rate", value: "94%", color: CYAN },
            { label: "CAC", value: "£40", color: GOLD },
          ]} />
        </FadeIn>
      </BGScene>

      {/* Scene 3: The Insight (10-16s) */}
      <BGScene from={300} dur={180} bg="bg-ocean.png">
        <Label>The Insight</Label>
        <FadeIn delay={5}>
          <Title size={48}>But the real value isn't the claims.</Title>
        </FadeIn>
        <FadeIn delay={25}>
          <Title size={48}>It's the technology we built<br/>to automate them.</Title>
        </FadeIn>
        <FadeIn delay={50}>
          <Sub>Every tool we built to run Silverwings faster turns out to be a standalone SaaS product that other businesses need.</Sub>
        </FadeIn>
      </BGScene>

      {/* Scene 4: EBITDA → ARR (16-24s) */}
      <BGScene from={480} dur={240} bg="bg-data.png">
        <Label>The Valuation Shift</Label>
        <FadeIn delay={5}>
          <Title size={44}>EBITDA → ARR Multiples</Title>
        </FadeIn>
        <FadeIn delay={25}>
          <div style={{ display: "flex", gap: 80, marginTop: 50, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, color: "#aaa", marginBottom: 10, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>Services Business</div>
              <div style={{ fontSize: 56, fontWeight: 900, color: RED, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>3-5x</div>
              <div style={{ fontSize: 16, color: "#aaa", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>EBITDA</div>
            </div>
            <div style={{ fontSize: 48, color: "#aaa" }}>→</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, color: "#aaa", marginBottom: 10, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>SaaS Business</div>
              <div style={{ fontSize: 56, fontWeight: 900, color: GREEN, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>10-15x</div>
              <div style={{ fontSize: 16, color: "#aaa", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>ARR</div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={60}>
          <Sub>Same company. Same team. Same technology. Different valuation framework.</Sub>
        </FadeIn>
      </BGScene>

      {/* Scene 5: Thuban (24-34s) */}
      <BGScene from={720} dur={300} bg="bg-data.png" overlay="rgba(0,0,0,0.7)">
        <Label>Spin-Out 1 — Already Live</Label>
        <FadeIn delay={5}>
          <Title size={56}>Thuban</Title>
        </FadeIn>
        <FadeIn delay={15}>
          <Sub>AI code verification. The only scanner purpose-built for AI-generated code.</Sub>
        </FadeIn>
        <FadeIn delay={35}>
          <div style={{ marginTop: 40, width: "100%" }}>
            <TableRow cols={["", "Status"]} colors={[DIM, CYAN]} bold />
            <TableRow cols={["Live on npm", "✓ Published"]} colors={[WHITE, GREEN]} />
            <TableRow cols={["Stripe payments", "✓ Wired"]} colors={[WHITE, GREEN]} />
            <TableRow cols={["10 languages, 69 rules", "✓ Shipping"]} colors={[WHITE, GREEN]} />
            <TableRow cols={["MCP + GitHub Action", "✓ Live"]} colors={[WHITE, GREEN]} />
            <TableRow cols={["Investor code reports", "$299–$999"]} colors={[WHITE, GOLD]} />
          </div>
        </FadeIn>
        <FadeIn delay={70}>
          <div style={{ marginTop: 30, fontSize: 20, color: GOLD, fontWeight: 600, textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            Mercia paid for code due diligence yesterday. Thuban does it in minutes.
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 6: AI Sales Agents (34-44s) */}
      <BGScene from={1020} dur={300} bg="bg-cityscape.png">
        <Label>Spin-Out 2 — Production Ready</Label>
        <FadeIn delay={5}>
          <Title size={56}>AI Sales Agents</Title>
        </FadeIn>
        <FadeIn delay={15}>
          <Sub>The SDR that never quits. Qualifies leads at machine speed, 24/7.</Sub>
        </FadeIn>
        <FadeIn delay={35}>
          <div style={{ display: "flex", gap: 80, marginTop: 50 }}>
            <div style={{ textAlign: "center", background: "rgba(0,0,0,0.3)", borderRadius: 16, padding: "24px 30px", backdropFilter: "blur(10px)" }}>
              <div style={{ fontSize: 16, color: "#aaa", marginBottom: 10 }}>Human SDR</div>
              <div style={{ fontSize: 48, fontWeight: 900, color: RED, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>£25-50</div>
              <div style={{ fontSize: 14, color: "#aaa" }}>per conversation</div>
              <div style={{ fontSize: 14, color: RED, marginTop: 8 }}>14-month avg tenure</div>
            </div>
            <div style={{ fontSize: 36, color: "#aaa", alignSelf: "center" }}>vs</div>
            <div style={{ textAlign: "center", background: "rgba(0,0,0,0.3)", borderRadius: 16, padding: "24px 30px", backdropFilter: "blur(10px)" }}>
              <div style={{ fontSize: 16, color: "#aaa", marginBottom: 10 }}>AI Agent</div>
              <div style={{ fontSize: 48, fontWeight: 900, color: GREEN, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>£0.30</div>
              <div style={{ fontSize: 14, color: "#aaa" }}>per conversation</div>
              <div style={{ fontSize: 14, color: GREEN, marginTop: 8 }}>Never quits. Never sleeps.</div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={70}>
          <div style={{ marginTop: 30, fontSize: 20, color: GOLD, fontWeight: 600, textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            Mercia's portfolio companies burn through SDRs in 14 months. We fix that.
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 7: SickDay.AI (44-52s) */}
      <BGScene from={1320} dur={240} bg="bg-ocean.png">
        <Label>Spin-Out 3 — MVP in 6 Weeks</Label>
        <FadeIn delay={5}>
          <Title size={56}>SickDay.AI</Title>
        </FadeIn>
        <FadeIn delay={15}>
          <Sub>UK absence compliance engine. Bradford Factor + SSP + Equality Act automation.</Sub>
        </FadeIn>
        <FadeIn delay={35}>
          <MetricRow items={[
            { label: "UK SMBs with 10+ staff", value: "1.3M", color: CYAN },
            { label: "Price per employee", value: "£1/mo", color: GREEN },
            { label: "Competitors with compliance", value: "0", color: GOLD },
          ]} />
        </FadeIn>
        <FadeIn delay={60}>
          <Sub>Nobody else does compliance automation. The moat is the Equality Act logic.</Sub>
        </FadeIn>
      </BGScene>

      {/* Scene 8: Full Portfolio (52-62s) */}
      <BGScene from={1560} dur={300} bg="bg-constellation.png" overlay="rgba(0,0,0,0.55)">
        <Label>The Full Portfolio</Label>
        <FadeIn delay={5}>
          <Title size={44}>7 SaaS Products. One Foundry.</Title>
        </FadeIn>
        <FadeIn delay={20}>
          <div style={{ marginTop: 30, width: "100%" }}>
            <TableRow cols={["Product", "Market", "Status", "Y3 ARR"]} colors={[DIM, DIM, DIM, DIM]} bold />
            <TableRow cols={["Thuban", "Dev tools", "LIVE", "£2M"]} colors={[WHITE, "#aaa", GREEN, GOLD]} />
            <TableRow cols={["AI Sales Agents", "B2B Sales", "Production", "£3M"]} colors={[WHITE, "#aaa", GREEN, GOLD]} />
            <TableRow cols={["SickDay.AI", "HR Compliance", "6 weeks", "£2M"]} colors={[WHITE, "#aaa", CYAN, GOLD]} />
            <TableRow cols={["Navisynth", "Voice AI", "Beta 3 wks", "£3M"]} colors={[WHITE, "#aaa", CYAN, GOLD]} />
            <TableRow cols={["Bellatrix", "Business Intel", "Building", "£1M"]} colors={[WHITE, "#aaa", BLUE, GOLD]} />
          </div>
        </FadeIn>
        <FadeIn delay={60}>
          <div style={{ marginTop: 30, display: "flex", gap: 60 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: GREEN, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>£8M</div>
              <div style={{ fontSize: 14, color: "#aaa" }}>Year 3 Combined SaaS ARR</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: GOLD, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>£80-120M</div>
              <div style={{ fontSize: 14, color: "#aaa" }}>Implied Valuation (10-15x)</div>
            </div>
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 9: Use of Funds (62-72s) */}
      <BGScene from={1860} dur={300} bg="bg-warm.png" overlay="rgba(0,0,0,0.7)">
        <Label>Use of £1M</Label>
        <FadeIn delay={5}>
          <Title size={48}>From Built to Selling</Title>
        </FadeIn>
        <FadeIn delay={20}>
          <div style={{ marginTop: 40, width: "100%" }}>
            <TableRow cols={["Category", "Amount", "Impact"]} colors={[DIM, DIM, DIM]} bold />
            <TableRow cols={["Software Development", "£450K", "4 developers × 12 months"]} colors={[WHITE, GREEN, "#aaa"]} />
            <TableRow cols={["Go-to-Market", "£250K", "Launch campaigns + B2B sales"]} colors={[WHITE, GREEN, "#aaa"]} />
            <TableRow cols={["Infrastructure", "£150K", "Cloud, CI/CD, security certs"]} colors={[WHITE, GREEN, "#aaa"]} />
            <TableRow cols={["Working Capital", "£150K", "ITV marketing bridge"]} colors={[WHITE, GREEN, "#aaa"]} />
          </div>
        </FadeIn>
        <FadeIn delay={50}>
          <div style={{ marginTop: 20, fontSize: 18, color: GOLD, fontWeight: 600, textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            + 12 months free Thuban code audits across the entire Mercia portfolio
          </div>
        </FadeIn>
        <FadeIn delay={65}>
          <div style={{ marginTop: 12, fontSize: 20, color: CYAN, fontWeight: 600, textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            Benefits cashflow covers operating costs. Every pound of investment goes to growth.
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 10: Portfolio Synergy (72-80s) */}
      <BGScene from={2160} dur={240} bg="bg-earth.png" overlay="rgba(0,0,0,0.55)">
        <Label>Why Mercia</Label>
        <FadeIn delay={5}>
          <Title size={48}>Portfolio Synergies</Title>
        </FadeIn>
        <FadeIn delay={20}>
          <div style={{ marginTop: 30, width: "100%", maxWidth: 700 }}>
            {[
              { text: "Thuban provides code due diligence on every Mercia investment", color: GREEN },
              { text: "AI agents deploy to any portfolio company with SDR problems", color: CYAN },
              { text: "SickDay.AI serves every portfolio company with UK employees", color: BLUE },
              { text: "North East based — jobs in North Tyneside", color: GOLD },
            ].map((item, i) => (
              <FadeIn key={i} delay={25 + i * 15}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: item.color, flexShrink: 0 }} />
                  <div style={{ fontSize: 22, color: WHITE, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{item.text}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 11: The Ask (80-90s) */}
      <BGScene from={2400} dur={300} bg="bg-cityscape.png" overlay="rgba(0,0,0,0.65)">
        <Label>The Ask</Label>
        <FadeIn delay={10}>
          <Title size={72}>£1,000,000</Title>
        </FadeIn>
        <FadeIn delay={25}>
          <Sub>Equity in Silverwings Venture Foundry</Sub>
        </FadeIn>
        <FadeIn delay={45}>
          <div style={{ display: "flex", gap: 60, marginTop: 50 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: GREEN, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>£500K</div>
              <div style={{ fontSize: 14, color: "#aaa" }}>Year 1 SaaS ARR</div>
            </div>
            <div style={{ fontSize: 30, color: "#aaa", alignSelf: "center" }}>→</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: CYAN, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>£2.5M</div>
              <div style={{ fontSize: 14, color: "#aaa" }}>Year 2 SaaS ARR</div>
            </div>
            <div style={{ fontSize: 30, color: "#aaa", alignSelf: "center" }}>→</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: GOLD, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>£8M</div>
              <div style={{ fontSize: 14, color: "#aaa" }}>Year 3 SaaS ARR</div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={70}>
          <div style={{ marginTop: 40, fontSize: 22, color: PURPLE, fontWeight: 600, textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            De-risked by £809K client revenue. £120K first-year survival capital — 30% repaid, no equity given. 12 staff roles replaced by AI.
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 12: Close (90-97s) */}
      <BGScene from={2700} dur={210} bg="bg-constellation.png" overlay="rgba(0,0,0,0.5)">
        <FadeIn delay={10}>
          <Title size={56}>Silverwings<br/>Venture Foundry</Title>
        </FadeIn>
        <FadeIn delay={30}>
          <div style={{ marginTop: 30, fontSize: 22, color: "#ccc", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            Craig Lowther — CEO & Technical Founder
          </div>
          <div style={{ fontSize: 22, color: "#ccc", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            Darren Cleugh — Managing Director
          </div>
        </FadeIn>
        <FadeIn delay={50}>
          <div style={{ marginTop: 50, fontSize: 20, fontStyle: "italic", color: "#c0c0c0", letterSpacing: 1, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            No food, no dream. No dream, no food.
          </div>
        </FadeIn>
      </BGScene>
    </AbsoluteFill>
  );
};
