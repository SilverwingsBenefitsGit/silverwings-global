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

      {/* Scene 1: Title (0-5s) */}
      <BGScene from={0} dur={150} bg="bg-cityscape.png">
        <Label>Confidential Investment Memo</Label>
        <FadeIn delay={10}>
          <Title size={72}>Silverwings<br/>Venture Foundry</Title>
        </FadeIn>
        <FadeIn delay={30}>
          <Sub>AI-powered SaaS spin-out engine helping people apply for complex government benefits at global scale</Sub>
        </FadeIn>
        <FadeIn delay={50}>
          <div style={{ marginTop: 40, padding: "8px 24px", background: "rgba(0,102,255,0.15)", border: "1px solid rgba(0,102,255,0.3)", borderRadius: 99, color: CYAN, fontSize: 16, fontWeight: 600, backdropFilter: "blur(10px)" }}>
            North East Accelerate Fund — Mercia
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 2: The Origin (5-12s) */}
      <BGScene from={150} dur={210} bg="bg-warm.png">
        <Label>The Origin</Label>
        <FadeIn delay={5}>
          <Title size={52}>We support people to apply for and win complex government benefits.</Title>
        </FadeIn>
        <FadeIn delay={25}>
          <Sub>TV/Meta ad → lead → voice AI call → recording → transcript → AI code enhancement → government form auto-completed in seconds → invoice → PayPal Pay in 3. Zero human touch. We can scale at will.</Sub>
        </FadeIn>
        <FadeIn delay={45}>
          <MetricRow items={[
            { label: "Client Revenue (13mo)", value: "£809K", color: GREEN },
            { label: "Success Rate", value: "94%", color: CYAN },
            { label: "Global Unclaimed Benefits", value: "£1T", color: GOLD },
          ]} />
        </FadeIn>
      </BGScene>

      {/* Scene 2b: Pension Credit Breakthrough (12-20s) */}
      <BGScene from={360} dur={240} bg="bg-warm.png" overlay="rgba(0,20,0,0.65)">
        <Label>Breaking News</Label>
        <FadeIn delay={5}>
          <Title size={48}>Pension Credit — First Claim Won</Title>
        </FadeIn>
        <FadeIn delay={20}>
          <Sub>Second benefit line launched. First claim submitted, won, and invoice paid — all in 7 days.</Sub>
        </FadeIn>
        <FadeIn delay={40}>
          <MetricRow items={[
            { label: "Benefits Now Live", value: "3", color: GREEN },
            { label: "Submission to Paid Invoice", value: "7 days", color: CYAN },
            { label: "LTV:CAC Ratio", value: "37:1", color: GOLD },
          ]} />
        </FadeIn>
        <FadeIn delay={60}>
          <div style={{ marginTop: 20, width: "100%", maxWidth: 700 }}>
            <TableRow cols={["Benefit", "Fee", "Eligible"]} colors={[DIM, DIM, DIM]} bold />
            <TableRow cols={["Attendance Allowance", "£830", "100%"]} colors={[WHITE, GREEN, "#aaa"]} />
            <TableRow cols={["Pension Credit", "£900 avg", "40% of AA clients"]} colors={[WHITE, GREEN, "#aaa"]} />
            <TableRow cols={["Council Tax Reduction", "£150", "100% of PC clients"]} colors={[WHITE, GREEN, "#aaa"]} />
            <TableRow cols={["Total per client", "£1,880", "From £50 CAC"]} colors={[WHITE, GOLD, GOLD]} bold />
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 3: The Insight (20-26s) */}
      <BGScene from={600} dur={180} bg="bg-ocean.png">
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

      {/* Scene 4: EBITDA → ARR (26-35s) */}
      <BGScene from={780} dur={270} bg="bg-data.png">
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

      {/* Scene 5: Thuban (35-45s) */}
      <BGScene from={1050} dur={300} bg="bg-data.png" overlay="rgba(0,0,0,0.7)">
        <Label>Spin-Out 1 — Already Live</Label>
        <FadeIn delay={5}>
          <Title size={56}>Thuban</Title>
        </FadeIn>
        <FadeIn delay={15}>
          <Sub>The only code scanner purpose-built for AI-generated code. 92% of development is now AI-assisted. We verify all of it.</Sub>
        </FadeIn>
        <FadeIn delay={35}>
          <div style={{ marginTop: 40, width: "100%" }}>
            <TableRow cols={["", "Status"]} colors={[DIM, CYAN]} bold />
            <TableRow cols={["AI code verification", "Only player in market"]} colors={[WHITE, GREEN]} />
            <TableRow cols={["10 languages, 69 security rules", "✓ Shipping"]} colors={[WHITE, GREEN]} />
            <TableRow cols={["npm + Stripe + VS Code", "✓ Live & Revenue"]} colors={[WHITE, GREEN]} />
            <TableRow cols={["MCP + GitHub Action + CI/CD", "✓ Integrated"]} colors={[WHITE, GREEN]} />
            <TableRow cols={["More coverage than any linter", "Scanner + Verifier"]} colors={[WHITE, GOLD]} />
          </div>
        </FadeIn>
        <FadeIn delay={70}>
          <div style={{ marginTop: 30, fontSize: 20, color: GOLD, fontWeight: 600, textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            Every company building with AI needs this. That's 92% of the market.
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 6: AI Sales Agents (45-55s) */}
      <BGScene from={1350} dur={300} bg="bg-cityscape.png">
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

      {/* Scene 7: SickDay.AI (55-63s) */}
      <BGScene from={1650} dur={240} bg="bg-ocean.png">
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

      {/* Scene 8: Full Portfolio (63-76s) */}
      <BGScene from={1890} dur={390} bg="bg-constellation.png" overlay="rgba(0,0,0,0.55)">
        <Label>The Full Portfolio</Label>
        <FadeIn delay={5}>
          <Title size={44}>8 SaaS Products. One Foundry.</Title>
        </FadeIn>
        <FadeIn delay={20}>
          <div style={{ marginTop: 30, width: "100%" }}>
            <TableRow cols={["Product", "What It Does", "Status", "Y3 ARR"]} colors={[DIM, DIM, DIM, DIM]} bold />
            <TableRow cols={["Thuban", "AI code verification", "LIVE", "£3M"]} colors={[WHITE, "#aaa", GREEN, GOLD]} />
            <TableRow cols={["AI Sales Agents", "Autonomous lead qualification", "Production", "£3M"]} colors={[WHITE, "#aaa", GREEN, GOLD]} />
            <TableRow cols={["SickDay.AI", "Absence compliance engine", "6 weeks", "£2M"]} colors={[WHITE, "#aaa", CYAN, GOLD]} />
            <TableRow cols={["NaviSynth", "Voice AI testing platform", "Beta", "£3M"]} colors={[WHITE, "#aaa", CYAN, GOLD]} />
            <TableRow cols={["Bellatrix", "Autonomous platform cartography", "Building", "£2M"]} colors={[WHITE, "#aaa", BLUE, GOLD]} />
            <TableRow cols={["Rigel", "Self-assembling ERP builder", "Building", "£3M"]} colors={[WHITE, "#aaa", BLUE, GOLD]} />
          </div>
        </FadeIn>
        <FadeIn delay={60}>
          <div style={{ marginTop: 30, display: "flex", gap: 60 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: GREEN, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>£16M</div>
              <div style={{ fontSize: 14, color: "#aaa" }}>Year 3 Combined SaaS ARR</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: GOLD, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>£160-240M</div>
              <div style={{ fontSize: 14, color: "#aaa" }}>Implied Valuation (10-15x)</div>
            </div>
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 9: Use of Funds (76-86s) */}
      <BGScene from={2280} dur={300} bg="bg-warm.png" overlay="rgba(0,0,0,0.7)">
        <Label>Use of £1M</Label>
        <FadeIn delay={5}>
          <Title size={48}>Fuel for the Rocket</Title>
        </FadeIn>
        <FadeIn delay={20}>
          <div style={{ marginTop: 40, width: "100%" }}>
            <TableRow cols={["Category", "Amount", "What It Buys"]} colors={[DIM, DIM, DIM]} bold />
            <TableRow cols={["Marketing & Acquisition", "£500K", "TV, Meta, Google — scale the CAC engine"]} colors={[WHITE, GREEN, "#aaa"]} />
            <TableRow cols={["Dev Team + Technical Lead", "£200K", "Engineers + Kenny — ship SaaS products"]} colors={[WHITE, GREEN, "#aaa"]} />
            <TableRow cols={["Compute & Infrastructure", "£30K", "Voice AI, hosting, CI/CD"]} colors={[WHITE, GREEN, "#aaa"]} />
            <TableRow cols={["Buffer & Expansion", "£270K", "TV transition, overseas launch, SaaS rollout"]} colors={[WHITE, GREEN, "#aaa"]} />
          </div>
        </FadeIn>
        <FadeIn delay={50}>
          <div style={{ marginTop: 20, fontSize: 18, color: GOLD, fontWeight: 600, textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            + 12 months free Thuban code audits across the entire Mercia portfolio
          </div>
        </FadeIn>
        <FadeIn delay={65}>
          <div style={{ marginTop: 12, fontSize: 20, color: CYAN, fontWeight: 600, textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            Platform cashflow covers all operating costs. Every pound of investment goes to growth.
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 10: Portfolio Synergy (86-95s) */}
      <BGScene from={2580} dur={270} bg="bg-earth.png" overlay="rgba(0,0,0,0.55)">
        <Label>Why Mercia</Label>
        <FadeIn delay={5}>
          <Title size={48}>Portfolio Synergies</Title>
        </FadeIn>
        <FadeIn delay={20}>
          <div style={{ marginTop: 30, width: "100%", maxWidth: 700 }}>
            {[
              { text: "Thuban verifies AI-generated code across the entire Mercia portfolio", color: GREEN },
              { text: "AI agents deploy to any portfolio company with SDR churn", color: CYAN },
              { text: "Rigel replaces per-seat SaaS — fractional cost ERP migration", color: BLUE },
              { text: "North East based — creating local software development jobs", color: GOLD },
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

      {/* Scene 11: The Ask (95-109s) */}
      <BGScene from={2850} dur={420} bg="bg-cityscape.png" overlay="rgba(0,0,0,0.65)">
        <Label>The Ask</Label>
        <FadeIn delay={10}>
          <Title size={72}>£1,000,000</Title>
        </FadeIn>
        <FadeIn delay={25}>
          <Sub>Equity in Silverwings Venture Foundry</Sub>
        </FadeIn>
        <FadeIn delay={40}>
          <div style={{ display: "flex", gap: 50, marginTop: 40 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: GREEN, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>£4.5M</div>
              <div style={{ fontSize: 14, color: "#aaa" }}>2026 Revenue</div>
            </div>
            <div style={{ fontSize: 30, color: "#aaa", alignSelf: "center" }}>→</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: CYAN, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>£37M</div>
              <div style={{ fontSize: 14, color: "#aaa" }}>2027 Revenue</div>
            </div>
            <div style={{ fontSize: 30, color: "#aaa", alignSelf: "center" }}>→</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: GOLD, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>£62M</div>
              <div style={{ fontSize: 14, color: "#aaa" }}>2028 Revenue</div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={55}>
          <div style={{ marginTop: 20, fontSize: 20, color: GREEN, fontWeight: 700, textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            £104M cumulative. 89% net margin. 3 benefits. UK only.
          </div>
        </FadeIn>
        <FadeIn delay={68}>
          <div style={{ marginTop: 12, fontSize: 18, color: PURPLE, fontWeight: 600, textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            Before overseas expansion. Before additional benefits. Before SaaS revenue. + £16M SaaS ARR by Year 3.
          </div>
        </FadeIn>
        <FadeIn delay={80}>
          <div style={{ marginTop: 12, fontSize: 18, color: "#ccc", textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            De-risked by £809K existing revenue. £35K/month stripped from overheads by Voice AI and automation.
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 12: Close (109-120s) */}
      <BGScene from={3270} dur={330} bg="bg-constellation.png" overlay="rgba(0,0,0,0.5)">
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
