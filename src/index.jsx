import React, { Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { OrbitControls, Box } from "drei";
import { EffectComposer, Bloom, Glitch } from "react-postprocessing";
import { GlitchMode } from "postprocessing";
import { useAudio } from "react-use";
import { PCFSoftShadowMap } from "three";

import { SettingsProvider, useSettings } from "./settings";

import {
  Grid,
  Image,
  Line,
  Message,
  Music,
  Polygon,
  Schedule,
  Avatar,
  MessageSmall,
} from "./components";

import {
  range,
  degToRad,
  pointsMidpoint,
  pointsAngle,
  pointsDistance,
  rectPoints,
  pointsTransforms,
  random,
} from "./utils";
import "./styles.css";

const text = `
e_lektron on poolenisti virtuaalne, poolenisti füüsiline platvorm, mis liidab etenduskunstide ja teaduse otsingulisi tegevusi. e_lektroni sisu on kunstnike ja teadlaste koostöö.`;

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
        {i === 8 && (
          <MessageSmall
            position={[-1.8, -0.1, 2.8]}
            rotation={[degToRad(90), 0, 0]}
          >
            {text}
          </MessageSmall>
        )}
        {i === 7 && (
          <Suspense fallback={null}>
            <Image
              src="/hexacoralia.jpg"
              position={[0, -0.1, 1.5]}
              rotation={[degToRad(90), 0, 0]}
              scale={[1, 1, 1]}
              opacity={0}
            />
          </Suspense>
        )}
      </group>
    ))}
  </group>
);

const spheres = Array.from({ length: 100 }).map((_) => [
  random(-3, 3),
  random(1, 2),
  random(3, 10),
]);

const App = () => {
  const [showSchedule, setShowSchedule] = useState(false);

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
    [9, -6],
  ];

  const { first, second } = useSettings();

  return (
    <>
      <Music />
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          invalidateFrameloop={true}
          camera={{ position: [0, 2, 8], fov: 100 }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = PCFSoftShadowMap;
          }}
        >
          <ambientLight />
          <pointLight position={[-40, 40, 40]} />
          <pointLight position={[40, 40, 40]} />
          <Polygon
            points={rectPoints(50, 50)}
            position={[0, -0.1, 0]}
            rotation={[degToRad(-90), 0, 0]}
            color="#090909"
          />
          <Panels points={points} />
          <Message
            color="white"
            position={[-1, 1.5, 0]}
            onClick={() => setShowSchedule(true)}
          >
            Live
          </Message>
          <pointLight position={[-1, 2, 0]} color="green" />
          {spheres.map((s, i) => (
            <Avatar key={i} position={s} radius={0.01} color="yellow" />
          ))}
          {/* <Sphere position={spheres[0]} radius={0.1} color="yellow" />} */}
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
      </div>
    </>
  );
};

ReactDOM.render(
  <SettingsProvider>
    <App />
  </SettingsProvider>,
  document.getElementById("root")
);
