import React from "react";
import { Composition } from "remotion";
import { GlobalExpansion } from "./GlobalExpansion";
import { Constellation } from "./Constellation";
import { KennyDarrenBriefing } from "./KennyDarrenBriefing";
import { MerciaPitch } from "./MerciaPitch";

export const Root: React.FC = () => (
  <>
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
      durationInFrames={2910}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
