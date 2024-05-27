import PlayYoutubeVideo from "@/components/PlayYoutubeVideo";
import PlayVimeoVideo from "@/components/VideoPlay";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const Test = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <PlayVimeoVideo
        videoId="712158285"
        playing={playing}
        setPlaying={setPlaying}
      />
      <PlayYoutubeVideo
        videoId="BgIgKcqPd4k"
        playing={playing}
        setPlaying={setPlaying}
      />
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
