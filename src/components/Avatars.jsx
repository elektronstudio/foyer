import React, { useState } from "react";
import { Html } from "drei";

import { Avatar, Box } from ".";

import { random } from "../utils";

const avatars = Array.from({ length: 25 }).map((_) => [
  random(-3, 3),
  random(3, 10),
  random(1, 1.5),
]);

export const Avatars = ({ type = 0, color = "#ffff00" }) => (
  <>
    {avatars.map(
      (s, i) =>
        [
          <Avatar
            position={[s[0], s[2] / 2 - 0.1 + 0.5, s[1]]}
            key={i}
            radius={0.05}
            color={color}
          />,
          <Box
            key={i}
            position={[s[0], s[2] / 2 - 0.1, s[1]]}
            width={0.02}
            depth={0.02}
            height={s[2]}
            color={color}
          />,
          <Html
            key={i}
            position={[s[0], s[2] / 2 - 0.1 + 0.5, s[1]]}
            center
            scaleFactor={5}
          >
            <div
              style={{
                fontSize: "20px",
                fontFamily: "sans-serif",
                color: "white",
              }}
            >
              😊
            </div>
          </Html>,
        ][type]
    )}
  </>
);
