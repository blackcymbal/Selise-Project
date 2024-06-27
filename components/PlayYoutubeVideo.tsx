import { createActivityForLesson } from "@/services/ActivityService";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import YoutubePlayer from "react-native-youtube-iframe";

type PlayYoutubeVideoProps = {
  videoId: string;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  courseId: number | undefined;
  moduleId: number | undefined;
  lessonId: number | undefined;
};

const PlayYoutubeVideo = ({
  videoId,
  playing,
  setPlaying,
  courseId,
  moduleId,
  lessonId,
}: PlayYoutubeVideoProps) => {
  const [activityId, setActivityId] = useState<number>();
  const activityForLesson = createActivityForLesson();

  console.log("player", courseId, moduleId, lessonId);

  const onStateChange = useCallback(
    (state: string) => {
      if (state === "playing") {
        if (courseId && moduleId && lessonId) {
          activityForLesson.mutate(
            {
              moduleId,
              lessonId,
              courseId,
              type: "LESSON",
            },
            {
              onSuccess: (response) => {
                console.log(response);
                setActivityId(response.data?.id);
              },
              onError: (error) => {
                console.log("error >>>>>>>>>", error);
              },
            }
          );
        }
      } else if (state === "ended") {
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
