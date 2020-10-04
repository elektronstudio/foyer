import React, { useMemo, useCallback, useEffect, useRef } from "react";
import { useThree, useResource, useFrame } from "react-three-fiber";
import { Vector3, Color } from "three";

export const Line = (props) => {
  const [ref] = useResource();
  const points = props.points || [];

  const vectorPoints = useMemo(() => points.map((p) => new Vector3(...p)), []);

  const onUpdate = useCallback((self) => self.setFromPoints(vectorPoints), [
    vectorPoints,
  ]);

  const material = useRef();
  useFrame(() => (material.current.color = new Color(props.color)));

  return (
    <>
      <line ref={ref} {...props}>
        <bufferGeometry attach="geometry" onUpdate={onUpdate} />
        <lineBasicMaterial
          ref={material}
          attach="material"
          color={props.color}
          linewidth={1000}
          linecap={"round"}
          linejoin={"round"}
        />
      </line>
    </>
  );
};
