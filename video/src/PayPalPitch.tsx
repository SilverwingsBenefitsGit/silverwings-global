import React from "react";
import {
  AbsoluteFill, Audio, Img, useCurrentFrame,
  interpolate, Sequence, staticFile,
} from "remotion";

/* ─── Palette (PayPal brand) ─── */
const WHITE = "#ffffff";
const PP_BLUE = "#0070ba";
const PP_GOLD = "#ffc439";
const GREEN = "#00ff88";
const CYAN = "#00f6ff";
const DIM = "#64748b";
const RED = "#ff4444";
const GOLD = "#fbbf24";
const PURPLE = "#7c3aed";

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
  <div style={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: PP_BLUE, marginBottom: 24, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{children}</div>
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
        <div style={{ fontSize: 56, fontWeight: 900, color: item.color, textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>{item.value}</div>
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
export const PayPalPitch: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Audio src={staticFile("vo-paypal-pitch.mp3")} volume={1} />

      {/* Scene 1: Title (0-5s) */}
      <BGScene from={0} dur={150} bg="bg-cityscape.png">
        <FadeIn delay={5}>
          <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: PP_GOLD, marginBottom: 30, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>Strategic Partnership Proposal</div>
        </FadeIn>
        <FadeIn delay={15}>
          <Title size={68}>PayPal × Silverwings</Title>
        </FadeIn>
        <FadeIn delay={35}>
          <Sub>The constellation that processes every transaction through Pay in 3</Sub>
        </FadeIn>
        <FadeIn delay={55}>
          <div style={{ marginTop: 40, display: "flex", gap: 30 }}>
            <div style={{ padding: "8px 24px", background: "rgba(0,112,186,0.2)", border: "1px solid rgba(0,112,186,0.4)", borderRadius: 99, color: PP_BLUE, fontSize: 15, fontWeight: 600, backdropFilter: "blur(10px)" }}>
              Exclusive Partnership
            </div>
            <div style={{ padding: "8px 24px", background: "rgba(255,196,57,0.15)", border: "1px solid rgba(255,196,57,0.3)", borderRadius: 99, color: PP_GOLD, fontSize: 15, fontWeight: 600, backdropFilter: "blur(10px)" }}>
              24+ Products
            </div>
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 2: What We Are (5-12s) */}
      <BGScene from={150} dur={210} bg="bg-warm.png">
        <Label>What We Are</Label>
        <FadeIn delay={5}>
          <Title size={48}>Not one company.<br/>A venture foundry.</Title>
        </FadeIn>
        <FadeIn delay={30}>
          <MetricRow items={[
            { label: "Client Revenue (13mo)", value: "£809K", color: GREEN },
            { label: "Working Products", value: "24+", color: CYAN },
            { label: "Monthly Revenue", value: "£120K", color: PP_GOLD },
          ]} />
        </FadeIn>
        <FadeIn delay={55}>
          <Sub>Open banking auto-billing is LIVE: DWP award detected → invoice generated → Pay in 3 link sent. Zero human touch.</Sub>
        </FadeIn>
      </BGScene>

      {/* Scene 3: Silverwings Core (12-20s) */}
      <BGScene from={360} dur={240} bg="bg-data.png" overlay="rgba(0,0,0,0.7)">
        <Label>Revenue Engine 1 — Live Now</Label>
        <FadeIn delay={5}>
          <Title size={52}>Silverwings Benefits</Title>
        </FadeIn>
        <FadeIn delay={15}>
          <Sub>Pay in 3 on every claim. Open banking auto-billing — award to cash, zero human touch. 3.3× cashflow multiplier.</Sub>
        </FadeIn>
        <FadeIn delay={35}>
          <div style={{ marginTop: 40, width: "100%" }}>
            <TableRow cols={["Metric", "Now", "August", "2027"]} colors={[DIM, DIM, DIM, DIM]} bold />
            <TableRow cols={["Claims/month", "250", "600", "3,000+"]} colors={[WHITE, GREEN, CYAN, PP_GOLD]} />
            <TableRow cols={["PayPal volume", "£207K", "£498K", "£2.49M"]} colors={[WHITE, GREEN, CYAN, PP_GOLD]} />
            <TableRow cols={["BNPL usage", "65%", "75%", "80%"]} colors={[WHITE, GREEN, CYAN, PP_GOLD]} />
          </div>
        </FadeIn>
        <FadeIn delay={65}>
          <div style={{ marginTop: 25, fontSize: 20, color: PP_GOLD, fontWeight: 600, textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            ITV matches every £1 we spend on TV. Pay in 3 is on every advert.
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 4: The Cascade (20-27s) */}
      <BGScene from={600} dur={210} bg="bg-ocean.png">
        <Label>The Cascade Effect</Label>
        <FadeIn delay={5}>
          <Title size={44}>One client. Three PayPal transactions.</Title>
        </FadeIn>
        <FadeIn delay={25}>
          <div style={{ marginTop: 40, display: "flex", gap: 30, alignItems: "center" }}>
            {[
              { benefit: "Attendance Allowance", fee: "£830", color: GREEN },
              { benefit: "Pension Credit", fee: "£900", color: CYAN },
              { benefit: "Council Tax", fee: "£150", color: PP_GOLD },
            ].map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={{ fontSize: 36, color: "#aaa" }}>→</div>}
                <div style={{ textAlign: "center", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: "20px 30px", backdropFilter: "blur(10px)" }}>
                  <div style={{ fontSize: 36, fontWeight: 900, color: item.color, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>{item.fee}</div>
                  <div style={{ fontSize: 14, color: "#ccc", marginTop: 6 }}>{item.benefit}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={55}>
          <div style={{ marginTop: 30, fontSize: 24, fontWeight: 700, color: WHITE, textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            = £1,880 per client through PayPal. Zero incremental CAC.
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 5: B2B SaaS (27-35s) */}
      <BGScene from={810} dur={240} bg="bg-data.png" overlay="rgba(0,0,0,0.7)">
        <Label>Revenue Engine 2 — SaaS Subscriptions</Label>
        <FadeIn delay={5}>
          <Title size={48}>Recurring Revenue =<br/>Recurring PayPal Fees</Title>
        </FadeIn>
        <FadeIn delay={25}>
          <div style={{ marginTop: 30, width: "100%" }}>
            <TableRow cols={["Product", "Price Range", "Y2 Volume"]} colors={[DIM, DIM, DIM]} bold />
            <TableRow cols={["Thuban (code verification)", "$9–$299/mo", "£800K"]} colors={[WHITE, GREEN, PP_GOLD]} />
            <TableRow cols={["SickDay.AI (HR compliance)", "£1–5/employee", "£600K"]} colors={[WHITE, GREEN, PP_GOLD]} />
            <TableRow cols={["Navisynth (voice agents)", "£500–5K/mo", "£800K"]} colors={[WHITE, GREEN, PP_GOLD]} />
            <TableRow cols={["Investor reports", "$299–$999 one-off", "£500K"]} colors={[WHITE, GREEN, PP_GOLD]} />
          </div>
        </FadeIn>
        <FadeIn delay={55}>
          <Sub>Every subscription renewal. Every month. Forever. No seasonal dip.</Sub>
        </FadeIn>
      </BGScene>

      {/* Scene 6: Life Events (35-43s) */}
      <BGScene from={1050} dur={240} bg="bg-warm.png">
        <Label>Revenue Engine 3 — High-Value Consumer BNPL</Label>
        <FadeIn delay={5}>
          <Title size={48}>Weddings + Funerals</Title>
        </FadeIn>
        <FadeIn delay={15}>
          <Sub>The highest-value Pay in 3 transactions in consumer markets.</Sub>
        </FadeIn>
        <FadeIn delay={30}>
          <div style={{ display: "flex", gap: 80, marginTop: 50 }}>
            <div style={{ textAlign: "center", background: "rgba(0,0,0,0.3)", borderRadius: 16, padding: "24px 30px", backdropFilter: "blur(10px)" }}>
              <div style={{ fontSize: 52, fontWeight: 900, color: PP_GOLD, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>£22K</div>
              <div style={{ fontSize: 16, color: "#ccc" }}>Average UK wedding</div>
              <div style={{ fontSize: 14, color: GREEN, marginTop: 6 }}>Pay in 3 = £7,333/instalment</div>
            </div>
            <div style={{ textAlign: "center", background: "rgba(0,0,0,0.3)", borderRadius: 16, padding: "24px 30px", backdropFilter: "blur(10px)" }}>
              <div style={{ fontSize: 52, fontWeight: 900, color: CYAN, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>£6.5K</div>
              <div style={{ fontSize: 16, color: "#ccc" }}>Average UK funeral</div>
              <div style={{ fontSize: 14, color: GREEN, marginTop: 6 }}>ZERO BNPL competitors</div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={60}>
          <div style={{ marginTop: 25, fontSize: 18, color: PP_GOLD, fontWeight: 600, textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            Not £50 trainers. Not £200 electronics. £22,000 weddings.
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 7: Volume Projections (43-51s) */}
      <BGScene from={1290} dur={240} bg="bg-cityscape.png" overlay="rgba(0,0,0,0.7)">
        <Label>PayPal Volume Projections</Label>
        <FadeIn delay={5}>
          <Title size={48}>The Compounding Effect</Title>
        </FadeIn>
        <FadeIn delay={20}>
          <div style={{ marginTop: 30, width: "100%" }}>
            <TableRow cols={["Stream", "2027", "2028"]} colors={[DIM, DIM, DIM]} bold />
            <TableRow cols={["Silverwings UK", "£29.9M", "£89.6M"]} colors={[WHITE, GREEN, PP_GOLD]} />
            <TableRow cols={["Silverwings Global", "£15.0M", "£89.6M"]} colors={[WHITE, GREEN, PP_GOLD]} />
            <TableRow cols={["B2B SaaS Stack", "£3.8M", "£11.3M"]} colors={[WHITE, GREEN, PP_GOLD]} />
            <TableRow cols={["Life Events Platform", "£55.6M", "£268M"]} colors={[WHITE, GREEN, PP_GOLD]} />
            <TableRow cols={["TOTAL", "£368M", "£1.49B"]} colors={[WHITE, GREEN, PP_GOLD]} bold bg="rgba(0,112,186,0.15)" />
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 8: PayPal Revenue (51-58s) */}
      <BGScene from={1530} dur={210} bg="bg-data.png">
        <Label>What PayPal Earns</Label>
        <FadeIn delay={5}>
          <Title size={44}>Lower Rate. Higher Revenue.</Title>
        </FadeIn>
        <FadeIn delay={25}>
          <div style={{ display: "flex", gap: 80, marginTop: 50 }}>
            <div style={{ textAlign: "center", background: "rgba(0,0,0,0.3)", borderRadius: 16, padding: "24px 30px", backdropFilter: "blur(10px)" }}>
              <div style={{ fontSize: 18, color: "#aaa", marginBottom: 10 }}>Without Partnership</div>
              <div style={{ fontSize: 48, fontWeight: 900, color: RED, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>£10.7M</div>
              <div style={{ fontSize: 16, color: "#aaa" }}>2027 at standard 2.9%</div>
              <div style={{ fontSize: 14, color: "#aaa" }}>on lower volume</div>
            </div>
            <div style={{ fontSize: 36, color: "#aaa", alignSelf: "center" }}>vs</div>
            <div style={{ textAlign: "center", background: "rgba(0,0,0,0.3)", borderRadius: 16, padding: "24px 30px", backdropFilter: "blur(10px)" }}>
              <div style={{ fontSize: 18, color: "#aaa", marginBottom: 10 }}>With Partnership (1.5%)</div>
              <div style={{ fontSize: 48, fontWeight: 900, color: GREEN, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>£22.4M</div>
              <div style={{ fontSize: 16, color: "#aaa" }}>2028 at partnership rate</div>
              <div style={{ fontSize: 14, color: GREEN }}>on 4.6× the volume</div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={55}>
          <Sub>That's not a discount. That's an investment with a guaranteed return.</Sub>
        </FadeIn>
      </BGScene>

      {/* Scene 9: ITV Co-Fund (58-65s) */}
      <BGScene from={1740} dur={210} bg="bg-cityscape.png">
        <Label>The ITV Multiplier</Label>
        <FadeIn delay={5}>
          <Title size={44}>Pay in 3 on National TV</Title>
        </FadeIn>
        <FadeIn delay={20}>
          <div style={{ display: "flex", gap: 30, marginTop: 50, alignItems: "center" }}>
            {[
              { label: "PayPal Co-Fund", value: "£500K", color: PP_BLUE },
              { label: "ITV Matches", value: "£500K", color: CYAN },
              { label: "Total Airtime", value: "£1M", color: PP_GOLD },
            ].map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={{ fontSize: 36, color: "#aaa" }}>+</div>}
                <div style={{ textAlign: "center", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: "20px 30px", backdropFilter: "blur(10px)" }}>
                  <div style={{ fontSize: 40, fontWeight: 900, color: item.color, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>{item.value}</div>
                  <div style={{ fontSize: 14, color: "#ccc", marginTop: 6 }}>{item.label}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={50}>
          <Sub>6 months of daytime TV. "Pay in 3" in every advert. The PayPal logo on ITV.</Sub>
        </FadeIn>
      </BGScene>

      {/* Scene 10: The Constellation (65-73s) */}
      <BGScene from={1950} dur={240} bg="bg-constellation.png" overlay="rgba(0,0,0,0.55)">
        <Label>Not One Merchant — A Constellation</Label>
        <FadeIn delay={5}>
          <Title size={44}>Every Star Wires PayPal</Title>
        </FadeIn>
        <FadeIn delay={20}>
          <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, width: "100%" }}>
            {[
              { name: "Silverwings", type: "Benefits", color: GREEN },
              { name: "Thuban", type: "Dev Tools", color: CYAN },
              { name: "SickDay.AI", type: "HR Tech", color: PP_BLUE },
              { name: "Navisynth", type: "Voice AI", color: PURPLE },
              { name: "Life Events", type: "Weddings", color: PP_GOLD },
              { name: "Remain", type: "Legacy Tech", color: "#c0c0c0" },
              { name: "Mintaka", type: "Creative AI", color: GREEN },
              { name: "Bellatrix", type: "Business Intel", color: CYAN },
              { name: "Rigel", type: "Analytics", color: PP_BLUE },
            ].map((item, i) => (
              <FadeIn key={i} delay={20 + i * 8}>
                <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "14px 18px", textAlign: "center", backdropFilter: "blur(10px)" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: item.color, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>{item.type}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={80}>
          <div style={{ marginTop: 25, fontSize: 18, color: PP_GOLD, fontWeight: 600, textAlign: "center", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            Saiph auto-wires PayPal into every new venture at machine speed.
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 11: The Ask (73-80s) */}
      <BGScene from={2190} dur={210} bg="bg-earth.png" overlay="rgba(0,0,0,0.55)">
        <Label>The Partnership</Label>
        <FadeIn delay={10}>
          <Title size={56}>Global Exclusivity</Title>
        </FadeIn>
        <FadeIn delay={25}>
          <div style={{ marginTop: 30, width: "100%", maxWidth: 700 }}>
            {[
              { text: "1.5% partnership rate across all constellation brands", color: PP_BLUE },
              { text: "PayPal Pay in 3 as default BNPL on all consumer products", color: GREEN },
              { text: "ITV co-fund: Pay in 3 on national television for 6 months", color: PP_GOLD },
              { text: "Projected volume: £368M (2027) → £1.49B (2028)", color: CYAN },
            ].map((item, i) => (
              <FadeIn key={i} delay={30 + i * 12}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: item.color, flexShrink: 0 }} />
                  <div style={{ fontSize: 20, color: WHITE, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{item.text}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </BGScene>

      {/* Scene 12: Close (80-87s) */}
      <BGScene from={2400} dur={210} bg="bg-ocean.png">
        <FadeIn delay={10}>
          <Title size={52}>PayPal × Silverwings<br/>Venture Foundry</Title>
        </FadeIn>
        <FadeIn delay={30}>
          <MetricRow items={[
            { label: "2027 Volume", value: "£368M", color: GREEN },
            { label: "2028 Volume", value: "£1.49B", color: PP_GOLD },
            { label: "Products", value: "24+", color: PP_BLUE },
          ]} />
        </FadeIn>
        <FadeIn delay={55}>
          <div style={{ marginTop: 50, fontSize: 20, fontStyle: "italic", color: "#c0c0c0", letterSpacing: 1, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            No food, no dream. No dream, no food.
          </div>
        </FadeIn>
      </BGScene>
    </AbsoluteFill>
  );
};
