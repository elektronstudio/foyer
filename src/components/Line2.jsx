import { useMemo } from "react";
import * as meshline from "threejs-meshline";
import { extend, Canvas, useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
//extend(meshline);

export const Line2 = ({ points }) => {
  const vertices = useMemo(() => points.map((p) => new Vector3(...p)), []);
  return (
    <mesh>
      <meshLine attach="geometry" vertices={vertices} />
      <meshLineMaterial
        attach="material"
        transparent
        depthTest={false}
        lineWidth={width}
        color={color}
        dashArray={0.1}
        dashRatio={0.9}
      />
    </mesh>
  );
};

// export const Line2 = ({ points, width = 10, color = "red" }) => {
//   const vertices = useMemo(() => points.map((p) => new Vector3(...p)), []);

//   return (
//     <mesh raycast={MeshLineRaycast}>
//       <meshLine attach="geometry" vertices={vertices} />
//       <meshLineMaterial
//         attach="material"
//         transparent
//         depthTest={false}
//         lineWidth={width}
//         color={color}
//         dashArray={0.05}
//         dashRatio={0.95}
//       />
//     </mesh>
//   );
// };
