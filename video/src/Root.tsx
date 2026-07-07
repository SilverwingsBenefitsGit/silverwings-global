import React from "react";
import { Composition } from "remotion";
import { GlobalExpansion } from "./GlobalExpansion";

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
  </>
);
