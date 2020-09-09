import React, { useRef } from "react";
import { Text } from "drei";

export const Message = (props) => {
  const ref = useRef();
  return (
    <Text
      color="white"
      fontSize={1.75}
      maxWidth={100}
      lineHeight={1}
      letterSpacing={-0.01}
      textAlign={"left"}
      font="/font-medium.woff"
      anchorX="center"
      anchorY="middle"
      {...props}
    >
      {props.children}
    </Text>
  );
};
