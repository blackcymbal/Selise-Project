import coursePromoPlayIcon from "@/assets/images/promo-play-btn.png";
import theme from "@/constants/theme";
import { FilePathUtils, fallbackImages } from "@/utils";
import { CourseViewModel } from "@tajdid-academy/tajdid-corelib";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import PlayYoutubeVideo from "../PlayYoutubeVideo";
import PlayVimeoVideo from "../VideoPlay";

type CoursePromoProps = {
  courseId: CourseViewModel["id"];
  videoId: string;
  player: "youtube" | "vimeo";
  thumbnail: CourseViewModel["thumbnail"];
};

export default function CoursePromo({
  courseId,
  videoId,
  thumbnail,
  player = "youtube",
}: CoursePromoProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <View style={styles.container}>
      {player === "youtube" ? (
        <PlayYoutubeVideo
          videoId={videoId}
          playing={playing}
          setPlaying={setPlaying}
        />
      ) : (
        <PlayVimeoVideo
          videoId={videoId}
          playing={playing}
          setPlaying={setPlaying}
        />
      )}

      {!playing && (
        <View
          style={{
            position: "absolute",
            zIndex: 10,
            width: "100%",
            backgroundColor: theme.colors.white,
          }}
        >
          <Image
            source={{
              uri: thumbnail
                ? `${FilePathUtils.courseImagePath(courseId)}/${thumbnail}`
                : fallbackImages.course,
            }}
            resizeMode="cover"
            style={styles.promoUrl}
          />
          <View style={styles.promoPlayButton}>
            <TouchableOpacity onPress={() => setPlaying(true)}>
              <Image
                source={coursePromoPlayIcon}
                resizeMode="cover"
                style={styles.promoPlayIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 250, borderRadius: 16, overflow: "hidden", zIndex: 1 },
  promoUrl: {
    width: "100%",
    height: 200,
    borderRadius: 16,
  },
  promoPlayButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -28 }, { translateY: -28 }],
  },
  promoPlayIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
  },
});
