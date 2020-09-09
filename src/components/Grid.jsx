import React from "react";
import { Line } from ".";
import { range } from "../utils";

export const Grid = (props) => {
  const from = props.from || -5;
  const to = props.to || 5;
  const numbers = range(from, to);
  return (
    <>
      {numbers.map((n, i) => (
        <group key={i} {...props}>
          <Line
            points={[
              [n, from, 0],
              [n, to, 0],
            ]}
            color={props.color}
          />
          <Line
            points={[
              [from, n, 0],
              [to, n, 0],
            ]}
            color={props.color}
          />
        </group>
      ))}
    </>
  );
};
