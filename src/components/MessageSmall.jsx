import React, { useRef } from "react";
import { Text } from "drei";

export const MessageSmall = (props) => {
  return (
    <Text
      color={props.color || "#fff"}
      fontSize={2}
      maxWidth={3.5}
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
