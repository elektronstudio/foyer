import React, { Suspense } from "react";

import {
  range,
  degToRad,
  pointsMidpoint,
  pointsAngle,
  pointsDistance,
  rectPoints,
  pointsTransforms,
  random,
} from "../utils";

import { Polygon, MessageSmall, Image } from ".";

const points = [
  [-8, -8],
  [-4, -5],
  [-3, -2],
  [-4, 1],
  [-2, 4],
  [1, 4],
  [3, 1],
  [0, -1],
  [1, -3],
  [5, -5],
  [9, -6],
];

export const Panels = ({ color, lineColor, text, fontSize, fontColor }) => (
  <group rotation={[degToRad(-90), 0, 0]}>
    {pointsTransforms(points).map((p, i) => (
      <group key={i} position={p.position} rotation={[0, 0, p.angle]}>
        <Polygon
          position={[0, 0, 1.5]}
          rotation={[degToRad(-90), 0, 0]}
          points={rectPoints(p.width - 0.01, 3)}
          color={color}
          lineColor={lineColor}
        />
        {i === 8 && (
          <MessageSmall
            position={[-1.8, -0.1, 2.7]}
            rotation={[degToRad(90), 0, 0]}
            fontSize={fontSize}
            color={fontColor}
          >
            {text}
          </MessageSmall>
        )}
      </group>
    ))}
  </group>
);
