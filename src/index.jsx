import React, { Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { OrbitControls, Box } from "drei";
import { useAudio } from "react-use";
import { PCFSoftShadowMap } from "three";

import { SettingsProvider, useSettings } from "./settings";

import {
  Avatars,
  Effects,
  Grid,
  Image,
  Lights,
  Line,
  Message,
  MessageSmall,
  Music,
  Panels,
  Polygon,
  Schedule,
  Video,
  VideoEmpty,
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

const defaultText = `
e_lektron on poolenisti virtuaalne, poolenisti füüsiline platvorm, mis liidab etenduskunstide ja teaduse otsingulisi tegevusi. e_lektroni sisu on kunstnike ja teadlaste koostöö.`;

const App = () => {
  const [backgroundColor, setBackgroundColor] = useState("#111111");
  const [panelColor, setPanelColor] = useState("#111111");
  const [lineColor, setLineColor] = useState("#cccccc");
  const [panelsOffset, setPanelsOffset] = useState(0);

  const { settings } = useSettings();

  return (
    <>
      <Music />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: settings.backgroundColor,
        }}
      >
        <Canvas
          invalidateFrameloop={true}
          camera={{ position: [0, 2, 8], fov: 100 }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = PCFSoftShadowMap;
          }}
        >
          <Polygon
            points={rectPoints(50, 50)}
            position={[0, -0.1, 0]}
            rotation={[degToRad(-90), 0, 0]}
            color={settings.panelColor}
            lineColor={settings.lineColor}
          />
          <group position-y={settings.panelOffset}>
            <Panels
              color={settings.panelColor}
              text={settings.text}
              lineColor={settings.lineColor}
            />
            <Message color="white" position={[-1, 1.5, 0]}>
              Live
            </Message>
          </group>
          <VideoEmpty
            position={[-1, settings.videoOffset, 0]}
            scale={[5, 5, 5]}
          />
          <Avatars />
          <OrbitControls />
          <Lights />
          <Effects />
        </Canvas>
      </div>
    </>
  );
};

const settings = [
  {
    key: "backgroundColor",
    title: "Background color",
    type: "color",
    value: "#111111",
  },
  {
    key: "panelColor",
    title: "Panel color",
    type: "color",
    value: "#111111",
  },
  {
    key: "lineColor",
    title: "Line color",
    type: "color",
    value: "#cccccc",
  },
  {
    key: "panelOffset",
    title: "Panel offset",
    type: "range",
    value: 0,
    min: -3.2,
    max: 0,
    step: 0.1,
  },
  {
    key: "videoOffset",
    title: "Video offset",
    type: "range",
    value: -3.1,
    min: -3.1,
    max: 1.5,
    step: 0.1,
  },
  { key: "text", title: "Text", type: "textarea", rows: 5, value: "what" },
];

ReactDOM.render(
  <SettingsProvider settings={settings}>
    <App />
  </SettingsProvider>,
  document.getElementById("root")
);
