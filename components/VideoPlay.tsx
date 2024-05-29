import React, { Dispatch, SetStateAction } from "react";
import { Vimeo } from "react-native-vimeo-iframe";

type PlayVimeoVideoProps = {
  videoId: string;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
};

const PlayVimeoVideo = ({
  videoId,
  playing,
  setPlaying,
}: PlayVimeoVideoProps) => {
  console.log(videoId);
  const videoCallbacks = {
    play: (data: object) => console.log("play: ", data),
    pause: () => setPlaying(!playing),
    fullscreenchange: (data: object) => console.log("fullscreenchange: ", data),
    ended: (data: object) => console.log("ended: ", data),
    controlschange: (data: object) => console.log("controlschange: ", data),
  };

  return (
    <Vimeo
      videoId={"712158285"}
      params={"api=1&autoplay=0"}
      handlers={videoCallbacks}
      style={{ height: 250 }}
    />
  );
};

export default PlayVimeoVideo;
