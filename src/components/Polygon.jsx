import React, { useMemo } from "react";
import { Shape, Vector2 } from "three";

export const Polygon = (props) => {
  const points = props.points || [];
  const color = props.color || "white";

  const vectorPoints = useMemo(
    () => new Shape().setFromPoints(points.map((p) => new Vector2(p[0], p[1]))),
    [points]
  );

  return (
    <mesh {...props}>
      <shapeGeometry attach="geometry" args={[vectorPoints]} />
      <meshBasicMaterial attach="material" color={color} />
    </mesh>
  );
};
