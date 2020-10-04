import React, { useMemo, useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Shape, Vector2, DoubleSide, Color } from "three";
import { Line, MessageSmall } from ".";

export const Polygon = (props) => {
  const points = props.points || [];
  const color = props.color || "white";

  const vectorPoints = useMemo(
    () => new Shape().setFromPoints(points.map((p) => new Vector2(p[0], p[1]))),
    [points]
  );

  const material = useRef();
  useFrame(() => (material.current.color = new Color(props.color)));

  return (
    <group {...props}>
      <mesh>
        <shapeGeometry attach="geometry" args={[vectorPoints]} />
        <meshPhongMaterial
          ref={material}
          attach="material"
          color={color}
          side={DoubleSide}
        />
      </mesh>
      <Line points={points} color="#ccc" />
    </group>
  );
};
