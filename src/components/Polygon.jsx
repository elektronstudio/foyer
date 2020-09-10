import React, { useMemo } from "react";
import { Shape, Vector2, DoubleSide } from "three";
import { Line, MessageSmall } from ".";

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
      <Line points={points} color="#ccc" />
      {/* <MessageSmall position={[-1, 0, -0.1]} scale={[1, -1, 1]}>{`
      Karl Saks
      "Planet Alexithymia"
      @Kanuti Gildi SAAL
      `}</MessageSmall> */}
    </group>
  );
};
