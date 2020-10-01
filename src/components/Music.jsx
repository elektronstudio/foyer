import React, { useEffect } from "react";
import { useAudio } from "react-use";

export const Music = () => {
  const [audio, state, controls, ref] = useAudio({
    src: "./what_about_people_our_age.mp3",
    autoPlay: false,
    loop: true,
  });
  //useEffect(() => controls.play(), []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          right: 0,
          bottom: 0,
          padding: "10px",
          color: "white",
          fontFamily: "sans-serif",
          cursor: "pointer",
          zIndex: 1000,
        }}
        onClick={() => (state.paused ? controls.play() : controls.pause())}
      >
        {state.paused ? "▶" : "❚❚"}
      </div>
      {audio}
    </>
  );
};
