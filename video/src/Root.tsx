import React from "react";
import { Composition } from "remotion";
import { GlobalExpansion } from "./GlobalExpansion";
import { Constellation } from "./Constellation";
import { KennyDarrenBriefing } from "./KennyDarrenBriefing";
import { MerciaPitch } from "./MerciaPitch";
import { PayPalPitch } from "./PayPalPitch";
import { IrenePitch } from "./IrenePitch";
import { MerciaThuban } from "./MerciaThuban";

export const Root: React.FC = () => (
  <>
    <Composition
      id="MerciaThuban"
      component={MerciaThuban}
      durationInFrames={1800}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="GlobalExpansion"
      component={GlobalExpansion}
      durationInFrames={3600}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="Constellation"
      component={Constellation}
      durationInFrames={5100}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="KennyDarrenBriefing"
      component={KennyDarrenBriefing}
      durationInFrames={3600}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="MerciaPitch"
      component={MerciaPitch}
      durationInFrames={3090}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="PayPalPitch"
      component={PayPalPitch}
      durationInFrames={2610}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="IrenePitch"
      component={IrenePitch}
      durationInFrames={6150}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
