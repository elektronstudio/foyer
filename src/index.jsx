import React, { Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { OrbitControls } from "drei";
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
  Box,
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
              fontColor={settings.fontColor}
              fontSize={settings.fontSize}
            />
            <Message position={[-1, 1.5, 0]} color={settings.fontColor}>
              Live
            </Message>
          </group>
          <VideoEmpty
            position={[-1, settings.videoOffset, 0]}
            scale={[5, 5, 5]}
          />
          <Avatars type={settings.avatarType} color={settings.avatarColor} />
          <OrbitControls />
          <Lights color={settings.lightColor} />
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
    key: "lightColor",
    title: "Light color",
    type: "color",
    value: "#ffffff",
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
    value: -3.2,
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
  {
    key: "fontSize",
    title: "Font size",
    type: "range",
    value: 0.2,
    min: 0.2,
    max: 1.8,
    step: 0.05,
  },
  {
    key: "fontColor",
    title: "Font color",
    type: "color",
    value: "#ffffff",
  },
  {
    key: "avatarType",
    title: "Avatar type",
    type: "range",
    value: 0,
    max: 2,
  },
  {
    key: "avatarColor",
    title: "Avatar color",
    type: "color",
    value: "#ffff00",
  },
];

ReactDOM.render(
  <SettingsProvider settings={settings}>
    <App />
  </SettingsProvider>,
  document.getElementById("root")
);
