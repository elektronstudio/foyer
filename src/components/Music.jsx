import React, { useEffect } from "react";
import { useAudio } from "react-use";

// From https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Blue_Dressed_Man/Voidland_EP/Blue_Dressed_Man_-_01_-_welcome.mp3

export const Music = () => {
  const [audio, state, controls, ref] = useAudio({
    src: "./music.mp3",
    autoplay: true,
  });
  useEffect(() => {
    controls.volume(0.2);
  }, []);

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
        }}
        onClick={() => (state.paused ? controls.play() : controls.pause())}
      >
        {state.paused ? "▶" : "❚❚"}
      </div>
      {audio}
    </>
  );
};
