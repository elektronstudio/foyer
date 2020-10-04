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
  const [offset, setOffset] = useState(0);
  const [text, setText] = useState(defaultText);

  //const panels = useRef();
  //useFrame(() => (panels.current.position.y = offset));

  return (
    <>
      <Music />
      <div
        style={{ width: "100vw", height: "100vh", background: backgroundColor }}
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
            color={panelColor}
            lineColor={lineColor}
          />
          <group position-y={offset}>
            <Panels color={panelColor} text={text} lineColor={lineColor} />
          </group>
          <Message color="white" position={[-1, 1.5, 0]}>
            Live
          </Message>
          {/* <Video position={[0, 1, 7]} scale={[2, 2, 2]} /> */}
          <Avatars />
          <OrbitControls />
          <Lights />
          <Effects />
        </Canvas>
      </div>
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "200px",
          color: "white",
          padding: "16px",
          background: "rgba(50,50,50,0.5)",
          display: "grid",
          gap: "16px",
          fontFamily: "sans-serif",
        }}
      >
        <h4>Color</h4>
        <div>Background color: {backgroundColor}</div>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          style={{ display: "block", width: "100%" }}
        />
        <div>Panel color: {panelColor}</div>
        <input
          type="color"
          value={panelColor}
          onChange={(e) => setPanelColor(e.target.value)}
          style={{ display: "block", width: "100%" }}
        />
        <div>Line color: {lineColor}</div>
        <input
          type="color"
          value={lineColor}
          onChange={(e) => setLineColor(e.target.value)}
          style={{ display: "block", width: "100%" }}
        />
        <div>Offset: {offset}</div>
        <input
          type="range"
          min="-3"
          max="3"
          step="0.01"
          value={offset}
          onChange={(e) => setOffset(e.target.value)}
          style={{ display: "block", width: "100%" }}
        />
        <div>Text:</div>
        <input
          style={{
            padding: "5px",
            outline: "none",
            background: "black",
            color: "white",
            border: "1px solid gray",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
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
