import React, { useMemo } from "react";
import { Shape, Vector2, DoubleSide } from "three";

export const Extrude = (props) => {
  const points = props.points || [];
  const color = props.color || "white";

  const vectorPoints = useMemo(
    () => new Shape().setFromPoints(points.map((p) => new Vector2(p[0], p[1]))),
    [points]
  );

  const settings = { curveSegments: 12 };

  return (
    <mesh {...props}>
      <extrudeGeometry attach="geometry" args={[vectorPoints, settings]} />
      <meshBasicMaterial attach="material" color={color} side={DoubleSide} />
    </mesh>
  );
};
