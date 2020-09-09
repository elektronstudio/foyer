import React, { Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { OrbitControls } from "drei";
import { EffectComposer, Bloom, Glitch } from "react-postprocessing";
import { GlitchMode } from "postprocessing";
import { useAudio } from "react-use";

import {
  Grid,
  Image,
  Line,
  Message,
  Polygon,
  Schedule,
  Music,
} from "./components";
import { range, degToRad } from "./utils";
import "./styles.css";

const rectPoints = (w = 1, h = 1) => [
  [w / -2, h / 2, 0],
  [w / 2, h / 2, 0],
  [w / 2, h / -2, 0],
  [w / -2, h / -2, 0],
  [w / -2, h / 2, 0],
];

//const extrudePoints = (points, depth) => points.map(p => [[p[0],p[1],0],[p[0],p[1],0])

const App = () => {
  const [showSchedule, setShowSchedule] = useState(false);
  const numbers = range(-5, 5);

  // const { scene, renderer } = useThree();
  // if (typeof __THREE_DEVTOOLS__ !== "undefined") {
  //   __THREE_DEVTOOLS__.dispatchEvent(
  //     new CustomEvent("observe", { detail: scene })
  //   );
  //   __THREE_DEVTOOLS__.dispatchEvent(
  //     new CustomEvent("observe", { detail: renderer })
  //   );
  // }

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          shadowMap={true}
          invalidateFrameloop={true}
          camera={{ position: [0, 3, 10] }}
        >
          <ambientLight />
          <pointLight position={[-40, 40, 40]} />
          <pointLight position={[40, 40, 40]} />
          <fog color="white" near={0.1} />
          <Polygon
            points={rectPoints(10, 10)}
            rotation={[degToRad(-90), 0, 0]}
            color="#111"
          />
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9}
              height={300}
            />
            <Glitch
              delay={[3, 6]}
              duration={[0.1, 0.2]}
              strength={[0.1, 0.2]}
              mode={GlitchMode.SPORADIC}
              active
              ratio={0.85}
            />
          </EffectComposer>
          <OrbitControls />
        </Canvas>
        {showSchedule && (
          <Schedule onClick={() => setShowSchedule(!showSchedule)} />
        )}
        <Music />
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
