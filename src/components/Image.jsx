import React from "react";
import { useLoader } from "react-three-fiber";
import { TextureLoader, DoubleSide } from "three";

export const Image = (props) => {
  const width = props.width || 1;
  const texture = useLoader(TextureLoader, props.src);
  const ratio = texture.image.height / texture.image.width;
  return (
    <mesh {...props}>
      <planeGeometry attach="geometry" args={[width, width * ratio]} />
      <meshBasicMaterial attach="material" map={texture} side={DoubleSide} />
    </mesh>
  );
};
