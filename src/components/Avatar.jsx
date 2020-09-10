import React, { useState } from "react";

import { Sphere } from ".";

export const Avatar = (props) => {
  const color = props.color || "white";
  const [active, setActive] = useState(false);

  return (
    <Sphere
      {...props}
      onPointerOver={() => setActive(true)}
      onPointerOut={() => setActive(false)}
      color={active ? "orange" : "yellow"}
      scale={[active ? 1.5 : 1, active ? 1.5 : 1, active ? 1.5 : 1]}
    />
  );
};
