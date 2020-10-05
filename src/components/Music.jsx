import React, { useEffect } from "react";
import { useAudio } from "react-use";

export const Music = () => {
  const [audio, state, controls, ref] = useAudio({
    src: "./what_about_people_our_age.mp3",
    autoPlay: false,
    loop: true,
  });
  const [audio2, state2, controls2, ref2] = useAudio({
    src: "./crowd.mp3",
    autoPlay: false,
    loop: true,
  });

  useEffect(() => controls2.volume(0.25), []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          right: "left",
          bottom: 0,
          padding: "10px",
          color: "white",
          fontFamily: "sans-serif",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        <div
          onClick={() => (state.paused ? controls.play() : controls.pause())}
        >
          {state.paused ? "▶" : "❚❚"}
        </div>
        <div
          onClick={() => (state2.paused ? controls2.play() : controls2.pause())}
        >
          {state2.paused ? "▶" : "❚❚"}
        </div>
      </div>
      {audio}
      {audio2}
    </>
  );
};
