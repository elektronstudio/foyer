import React, { useMemo, useCallback } from "react";
import { useThree, useResource } from "react-three-fiber";
import { Vector3 } from "three";

export const Line = (props) => {
  const [ref] = useResource();
  const points = props.points || [];

  const vectorPoints = useMemo(() => points.map((p) => new Vector3(...p)), []);

  const onUpdate = useCallback((self) => self.setFromPoints(vectorPoints), [
    vectorPoints,
  ]);

  console.log(props.color);

  return (
    <>
      <line ref={ref} {...props}>
        <bufferGeometry attach="geometry" onUpdate={onUpdate} />
        <lineBasicMaterial
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
