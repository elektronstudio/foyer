import React from "react";
import Hls from "hls.js";

export const Video = (props) => {
  //const url = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const url = `https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8`;

  const video = document.createElement("video");
  video.loop = true;
  video.autoplay = true;
  video.playsinline = true;
  video.crossOrigin = "anonymous";
  video.muted = true;
  //video.style = "display: none";

  if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = url;
    video.onerror = (e) => {
      video.src = url;
    };
  } else if (Hls.isSupported()) {
    const hls = new Hls({
      manifestLoadingRetryDelay: 5000,
      manifestLoadingMaxRetry: Infinity,
    });
    hls.attachMedia(video);
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      hls.loadSource(url);
    });
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      console.log("a");
      video.play();
    });
  }

  const width = props.width || 1;
  return (
    <mesh {...props}>
      <planeGeometry attach="geometry" args={[width, (9 / 16) * width]} />
      <meshBasicMaterial attach="material">
        <videoTexture attach="map" args={[video]} />
      </meshBasicMaterial>
    </mesh>
  );
};
