import React from "react";

export const Sphere = (props) => {
  const radius = props.radius || 1;
  const color = props.color || "white";

  return (
    <mesh {...props}>
      <sphereGeometry attach="geometry" args={[radius, 32, 32]} />
      <meshPhongMaterial attach="material" color={color} />
    </mesh>
  );
};
