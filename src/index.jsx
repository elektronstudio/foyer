import ReactDOM from "react-dom";
import React, { Suspense, useRef, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { EffectComposer, Bloom } from "react-postprocessing";
import { Plane, OrbitControls, Text, Sphere } from "drei";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";
import { useThree, useResource } from "react-three-fiber";

import "./styles.css";
import { range, random, useFetch } from "./utils";
//import { GLTFLoader } from './loaders/GLTFLoader';

const Message = (props) => {
  const ref = useRef();
  return (
    <Text
      color="white"
      fontSize={1.75}
      maxWidth={100}
      lineHeight={1}
      letterSpacing={-0.05}
      textAlign={"left"}
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      anchorX="center"
      anchorY="middle"
      {...props}
    >
      {props.children}
    </Text>
  );
};

const Polygon = (props) => {
  const points = props.points || [];
  const color = props.color || "white";

  const vectorPoints = useMemo(
    () =>
      new THREE.Shape().setFromPoints(
        points.map((p) => new THREE.Vector2(p[0], p[1]))
      ),
    [points]
  );

  return (
    <>
      <mesh>
        <shapeGeometry attach="geometry" args={[vectorPoints]} />
        <meshBasicMaterial attach="material" color={color} />
      </mesh>
    </>
  );
};

const Line = (props) => {
  const [ref] = useResource();
  const points = props.points || [];
  const color = props.color || "white";

  const vectorPoints = useMemo(
    () => points.map((p) => new THREE.Vector3(...p)),
    []
  );

  const onUpdate = useCallback((self) => self.setFromPoints(vectorPoints), [
    vectorPoints,
  ]);
  return (
    <>
      <line ref={ref}>
        <bufferGeometry attach="geometry" onUpdate={onUpdate} />
        <lineBasicMaterial
          attach="material"
          color={color}
          linewidth={100}
          linecap={"round"}
          linejoin={"round"}
        />
      </line>
    </>
  );
};

const Grid = (props) => {
  const from = props.from || -5;
  const to = props.to || 5;
  const numbers = range(from, to);
  return (
    <>
      {numbers.map((n, i) => (
        <group key={i} {...props}>
          <Line
            points={[
              [n, from, 0],
              [n, to, 0],
            ]}
            color={props.color}
          />
          <Line
            points={[
              [from, n, 0],
              [to, n, 0],
            ]}
            color={props.color}
          />
        </group>
      ))}
    </>
  );
};

const Schedule = (props) => {
  const url =
    "https://www.googleapis.com/calendar/v3/calendars/mkr5k66b069hve1f7aa77m4bsc@group.calendar.google.com/events?key=AIzaSyAkeDHwQgc22TWxi4-2r9_5yMWVnLQNMXc";
  const { response } = useFetch(url);
  return (
    <div
      {...props}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: "50vw",
        border: "1px solid white",
        background: "rgba(20, 20, 20, 1)",
        margin: "10px",
        overflow: "auto",
        color: "white",
        fontFamily: "sans-serif",
        padding: "20px",
      }}
    >
      {response
        ? response.items.map((item, i) => (
            <div
              style={{
                borderTop: i !== 0 ? "1px solid #aaa" : "",
                padding: "10px 0",
              }}
            >
              {item.summary}
            </div>
          ))
        : null}
    </div>
  );
};

const App = () => {
  const [showSchedule, setShowSchedule] = useState(false);
  const numbers = range(-5, 5);
  const mesh = useRef();
  const points = [
    [0, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];
  const points2 = [
    [0.1, 0, 0],
    [0.9, 0, 0],
    [0.9, 0.9, 0],
    [0.1, 0.9, 0],
    [0.1, 0.1, 0],
  ];
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas invalidateFrameloop>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Grid
            from={-25}
            to={25}
            position={[0, 5, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            color="gray"
          />
          <Grid
            from={-25}
            to={25}
            position={[0, -5, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            color="gray"
          />
          <group
            rotation={[0, Math.PI / 4, 0]}
            onClick={() => setShowSchedule(!showSchedule)}
          >
            <Message position={[0, 0, -10]}>SCHEDULE</Message>
          </group>
          <Message position={[0, 0, -10]}>LIVE</Message>
          <group rotation={[0, -Math.PI / 4, 0]}>
            <Message position={[0, 0, -10]}>DEMO</Message>
          </group>
          <Sphere
            scale={[0.1, 0.1, 0.1]}
            position={[0, -5, 0]}
            color="yellow"
          />
          <Polygon points={points} color="#333" />
          <Line points={points} color="white" />
          {/* <group position-z="0.01">
            <Polygon points={points2} color="black" />
          </group> */}
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9}
              height={300}
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

ReactDOM.render(<App />, document.getElementById("root"));

if (import.meta.hot) {
  //import.meta.hot.accept();
}

//https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Blue_Dressed_Man/Voidland_EP/Blue_Dressed_Man_-_01_-_welcome.mp3
