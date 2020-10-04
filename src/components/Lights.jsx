import React from "react";

export const Lights = () => (
  <>
    <ambientLight />
    <pointLight position={[-40, 40, 40]} />
    <pointLight position={[40, 40, 40]} />
    <pointLight position={[-1, 2, 0]} color="green" />
  </>
);
