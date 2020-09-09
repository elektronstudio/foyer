import React, { Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { OrbitControls } from "drei";
import { EffectComposer, Bloom, Glitch } from "react-postprocessing";
import { GlitchMode } from "postprocessing";
import { useAudio } from "react-use";

import { Grid, Image, Line, Message, Polygon, Schedule } from "./components";
import { range, degToRad } from "./utils";
import "./styles.css";

const rectPoints = (w = 1, h = 1) => [
  [w / -2, h / 2, 0],
  [w / 2, h / 2, 0],
  [w / 2, h / -2, 0],
  [w / -2, h / -2, 0],
  [w / -2, h / 2, 0],
];

const App = () => {
  const [showSchedule, setShowSchedule] = useState(false);
  const numbers = range(-5, 5);

  const { scene, renderer } = useThree();
  if (typeof __THREE_DEVTOOLS__ !== "undefined") {
    __THREE_DEVTOOLS__.dispatchEvent(
      new CustomEvent("observe", { detail: scene })
    );
    __THREE_DEVTOOLS__.dispatchEvent(
      new CustomEvent("observe", { detail: renderer })
    );
  }

  const [audio, state, controls, ref] = useAudio({
    src:
      "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Blue_Dressed_Man/Voidland_EP/Blue_Dressed_Man_-_01_-_welcome.mp3",
    autoPlay: false,
  });
  useEffect(() => controls.volume(0.2), []);

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
      </div>
      {audio}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

//import { GLTFLoader } from './loaders/GLTFLoader';

/*

const Message = (props) => {
  const ref = useRef();
  return (
    <Text
      color="white"
      fontSize={1.75}
      maxWidth={100}
      lineHeight={1}
      letterSpacing={-0.01}
      textAlign={"left"}
      font="/font-medium.woff"
      anchorX="center"
      anchorY="middle"
      {...props}
    >
      {props.children}
    </Text>
  );
};


const Image = ({ src, width }) => {
  const texture = useLoader(THREE.TextureLoader, src);
  const ratio = texture.image.height / texture.image.width;
  return (
    <mesh>
      <planeGeometry attach="geometry" args={[width, width * ratio]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};



const Polygon = (props) => {
  const points = props.points || [];
  const color = props.color || "white";

  //const texture = useLoader(THREE.TextureLoader, "/hexacoralia.jpg");

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

*/

//https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Blue_Dressed_Man/Voidland_EP/Blue_Dressed_Man_-_01_-_welcome.mp3
