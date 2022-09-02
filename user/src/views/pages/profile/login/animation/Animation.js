import React from "react";
import Lottie from "react-lottie-player";
// Alternatively:
// import Lottie from 'react-lottie-player/dist/LottiePlayerLight'

import lottieJson from "../../../../../../src/images/lottieJson.json";

export default function Animation() {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      style={{ flex: 1, width: "100%", height: "100%", resizeMode: "contain" }}
    />
  );
}
