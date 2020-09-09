import React, { useMemo, useCallback } from "react";
import { useThree, useResource } from "react-three-fiber";
import { Vector3 } from "three";

export const Line = (props) => {
  const [ref] = useResource();
  const points = props.points || [];
  const color = props.color || "white";

  const vectorPoints = useMemo(() => points.map((p) => new Vector3(...p)), []);

  const onUpdate = useCallback((self) => self.setFromPoints(vectorPoints), [
    vectorPoints,
  ]);
  return (
    <>
      <line ref={ref}>
        <bufferGeometry attach="geometry" onUpdate={onUpdate} />
        <lineBasicMaterial
          attach="material"
          color={color}
          linewidth={100}
          linecap={"round"}
          linejoin={"round"}
        />
      </line>
    </>
  );
};
