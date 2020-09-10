import React, { useRef } from "react";
import { Text } from "drei";

export const MessageSmall = (props) => {
  const ref = useRef();
  return (
    <Text
      color="#626262"
      fontSize={0.2}
      maxWidth={3}
      lineHeight={1.3}
      letterSpacing={-0.01}
      textAlign={"left"}
      font="/font-medium.woff"
      anchorX="left"
      anchorY="top"
      {...props}
    >
      {props.children}
    </Text>
  );
};
