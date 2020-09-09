import React, { useMemo } from "react";
import { Shape, Vector2, DoubleSide } from "three";
import { Line } from ".";

export const Polygon = (props) => {
  const points = props.points || [];
  const color = props.color || "white";

  const vectorPoints = useMemo(
    () => new Shape().setFromPoints(points.map((p) => new Vector2(p[0], p[1]))),
    [points]
  );

  return (
    <group {...props}>
      <mesh>
        <shapeGeometry attach="geometry" args={[vectorPoints]} />
        <meshPhongMaterial attach="material" color={color} side={DoubleSide} />
      </mesh>
      <Line points={points} />
    </group>
  );
};
