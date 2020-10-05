import React, { useEffect } from "react";

export const Lights = ({ color = "#ffffff" }) => {
  return (
    <>
      <ambientLight />
      <pointLight position={[-40, 40, 40]} color={color} />
      <pointLight position={[40, 40, 40]} color={color} />
    </>
  );
};
