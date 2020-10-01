import React from "react";
import * as THREE from "three";

export const Video = (props) => {
  const url =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const video = document.createElement("video");
  video.loop = true;
  video.autoplay = true;
  video.playsinline = true;
  video.crossOrigin = "anonymous";
  video.muted = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.style = "display: none";
  video.src = url;
  video.play();

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
