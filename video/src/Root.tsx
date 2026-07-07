import React from "react";
import { Composition } from "remotion";
import { GlobalExpansion } from "./GlobalExpansion";
import { Constellation } from "./Constellation";

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
  </>
);
