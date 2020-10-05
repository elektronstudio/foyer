import React, { Suspense, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { OrbitControls } from "drei";
import { useAudio } from "react-use";
import { PCFSoftShadowMap } from "three";
import { useKey } from "react-use";

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

const Camera = (props) => {
  const ref = useRef();
  const { setDefaultCamera } = useThree();
  useEffect(() => void setDefaultCamera(ref.current), []);
  useFrame(() => {
    ref.current.updateMatrixWorld();
    ref.current.lookAt(props.position[0] / 1, 0, props.position[2] - 10);
  });
  return <perspectiveCamera ref={ref} {...props} />;
};

const App = () => {
  const { settings } = useSettings();

  const [c, setC] = useState({ x: 0, y: 0, z: 0 });
  useKey("ArrowUp", () => setC({ ...c, z: --c.z }));
  useKey("ArrowDown", () => setC({ ...c, z: ++c.z }));
  useKey("ArrowLeft", () => setC({ ...c, x: --c.x }));
  useKey("ArrowRight", () => setC({ ...c, x: ++c.x }));
  useKey("q", () => setC({ ...c, y: ++c.y }));
  useKey("a", () => setC({ ...c, y: --c.y }));

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
          <group
            position-y={settings.panelOffset}
            scale={[
              settings.panelScale,
              settings.panelScale,
              settings.panelScale,
            ]}
          >
            <Panels
              color={settings.panelColor}
              text={settings.text}
              lineColor={settings.lineColor}
              fontColor={settings.fontColor}
              fontSize={settings.fontSize}
            />
            <Message position={[-1, 1.5, -1]} color={settings.fontColor}>
              {settings.text2}
            </Message>
          </group>

          <group
            scale={[
              settings.panelScale,
              settings.panelScale,
              settings.panelScale,
            ]}
          >
            <VideoEmpty
              position={[-1, settings.videoOffset, 0]}
              scale={[5, 5, 5]}
            />
          </group>

          <group position-y={settings.avatarOffset}>
            <Avatars type={settings.avatarType} color={settings.avatarColor} />
          </group>
          <OrbitControls enablePan={false} />
          <Camera position={[0 + c.x / 2, 2 + c.y / 2, 15 + c.z / 2]} />
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
    value: 0,
    min: -10,
    max: 0,
    step: 0.1,
  },
  {
    key: "videoOffset",
    title: "Video offset",
    type: "range",
    value: -3.1,
    min: -10,
    max: 1.5,
    step: 0.1,
  },
  {
    key: "avatarOffset",
    title: "Avatar offset",
    type: "range",
    value: -3.2,
    min: -10,
    max: 0,
    step: 0.1,
  },
  {
    key: "text2",
    title: "Title",
    type: "text",
    value: "elektron",
  },
  {
    key: "text",
    title: "Text",
    type: "textarea",
    rows: 5,
    value:
      "elektron.live is virtual performative space. It brings performers and audiences together while minimizing the restrictions to access since any number of audience members is possible.",
  },
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
  {
    key: "panelScale",
    title: "Panel scale",
    type: "range",
    value: 1,
    min: 1,
    max: 3,
    step: 0.01,
  },
];

ReactDOM.render(
  <SettingsProvider settings={settings}>
    <App />
  </SettingsProvider>,
  document.getElementById("root")
);
