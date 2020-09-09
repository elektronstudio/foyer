import React, { Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { OrbitControls, Box } from "drei";
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
import {
  range,
  degToRad,
  pointsMidpoint,
  pointsAngle,
  pointsDistance,
  rectPoints,
  pointsTransforms,
} from "./utils";
import "./styles.css";

// const pointTransforms = (points) => {
//   let transforms = [];
//   points.forEach((p, i) => {
//     if (!!points[i + 1]) {
//       transforms.push({
//         position: [...pointsMidpoint(points[i], points[i + 1]), 0],
//         angle: pointsAngle(points[i], points[i + 1]),
//         width: pointsDistance(points[i], points[i + 1]),
//       });
//     }
//   });
//   return transforms;
// };

//const extrudePoints = (points, depth) => points.map(p => [[p[0],p[1],0],[p[0],p[1],0])

const Panels = ({ points }) => (
  <group rotation={[degToRad(-90), 0, 0]}>
    {pointsTransforms(points).map((p, i) => (
      <group key={i} position={p.position} rotation={[0, 0, p.angle]}>
        <Polygon
          position={[0, 0, 1.5]}
          rotation={[degToRad(-90), 0, 0]}
          points={rectPoints(p.width - 0.01, 3)}
          color="#111"
        />
      </group>
    ))}
  </group>
);

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

  //return null;

  const points = [
    [-8, -8],
    [-4, -5],
    [-3, -2],
    [-4, 1],
    [-2, 4],
    [1, 4],
    [3, 1],
    [0, -1],
    [1, -3],
    [5, -5],
  ];

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas invalidateFrameloop={true} camera={{ position: [0, 2, 6] }}>
          <ambientLight />
          <pointLight position={[-40, 40, 40]} />
          <pointLight position={[40, 40, 40]} />
          <Polygon
            points={rectPoints(15, 15)}
            position={[0, -0.1, 0]}
            rotation={[degToRad(-90), 0, 0]}
            color="#090909"
          />
          <Polygon
            points={rectPoints(15, 15)}
            position={[0, 3.1, 0]}
            rotation={[degToRad(-90), 0, 0]}
            color="#090909"
          />
          <Panels points={points} />
          <Message color="white" position={[-1, 1.5, 0]}>
            Live
          </Message>
          <pointLight position={[-1, 2, 0]} color="green" />
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
