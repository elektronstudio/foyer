import React, { useRef } from "react";
import { DoubleSide } from "three";
import { useFrame } from "react-three-fiber";
import { Color } from "three";

export const VideoEmpty = (props) => {
  const material = useRef();
  useFrame(() => (material.current.color = new Color(props.color)));

  const width = props.width || 1;
  return (
    <mesh {...props}>
      <planeGeometry attach="geometry" args={[width, (9 / 16) * width]} />
      <meshBasicMaterial
        ref={material}
        attach="material"
        color="white"
        side={DoubleSide}
      />
    </mesh>
  );
};
