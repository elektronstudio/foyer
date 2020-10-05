import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Color } from "three";

export const Box = (props) => {
  const material = useRef();
  useFrame(() => (material.current.color = new Color(props.color)));

  return (
    <mesh {...props}>
      <boxGeometry
        attach="geometry"
        args={[props.width || 1, props.height || 1, props.depth || 1]}
      />
      <meshPhongMaterial
        ref={material}
        attach="material"
        color={props.color || "#ffffff"}
      />
    </mesh>
  );
};
