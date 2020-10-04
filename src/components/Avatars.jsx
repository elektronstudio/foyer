import React, { useState } from "react";

import { Avatar } from ".";

import { random } from "../utils";

const avatars = Array.from({ length: 100 }).map((_) => [
  random(-3, 3),
  random(1, 2),
  random(3, 10),
]);

export const Avatars = () => (
  <>
    {avatars.map((s, i) => (
      <Avatar key={i} position={s} radius={0.01} color="yellow" />
    ))}
  </>
);
