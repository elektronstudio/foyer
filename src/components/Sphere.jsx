import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Color } from "three";

export const Sphere = (props) => {
  const material = useRef();
  useFrame(
    () => (material.current.color = new Color(props.color || "#ffffff"))
  );

  return (
    <mesh {...props}>
      <sphereGeometry attach="geometry" args={[props.radius || 1, 32, 32]} />
      <meshBasicMaterial ref={material} attach="material" />
    </mesh>
  );
};
