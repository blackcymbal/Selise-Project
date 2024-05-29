import React, { Dispatch, SetStateAction, useCallback } from "react";
import YoutubePlayer from "react-native-youtube-iframe";

type PlayYoutubeVideoProps = {
  videoId: string;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
};

const PlayYoutubeVideo = ({
  videoId,
  playing,
  setPlaying,
}: PlayYoutubeVideoProps) => {
  const onStateChange = useCallback(
    (state: string) => {
      if (state === "ended") {
        setPlaying(false);
      }
    },
    [setPlaying]
  );

  return (
    <YoutubePlayer
      height={250}
      play={playing}
      videoId={videoId}
      onChangeState={onStateChange}
    />
  );
};

export default PlayYoutubeVideo;
