import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  FlatList,
} from "react-native";
import CourseDetailsReviewItem, {
  ReviewItemProps,
} from "./CourseDetailsReviewItem";
import { Typography } from "@/components/ui";
import { SquareArrowLeft, SquareArrowRight } from "@/assets/icons/icons";
import theme from "@/constants/theme";

const { width: screenWidth } = Dimensions.get("window");

const reviews = [
  {
    id: 1,
    name: "আবু ওবায়দা যায়েদ",
    image:
      "https://dev.tajdidacademy.com/_next/image?url=%2FImages%2Freview%2Fzayed.png&w=96&q=75",
    position: "ম্যানেজার",
    content:
      "ইসলামে আধ্যাত্মিক দিকনির্দেশনা ও নৈতিক বিকাশের জন্য কুরআন শিক্ষা অত্যন্ত গুরুত্বপূর্ণ । এটি ব্যক্তিগত বিকাশে একটি গুরুত্বপূর্ণ ভূমিকা পালন করে। ",
  },
  {
    id: 2,
    name: "মো: সোয়েব চন্দনী",
    image:
      "https://dev.tajdidacademy.com/_next/image?url=%2FImages%2Freview%2Fsoyeb.jfif&w=96&q=75",
    position: "ওয়েব ডেভেলপার",
    content:
      "ইসলামে আধ্যাত্মিক দিকনির্দেশনা ও নৈতিক বিকাশের জন্য কুরআন শিক্ষা অত্যন্ত গুরুত্বপূর্ণ । এটি ব্যক্তিগত বিকাশে একটি গুরুত্বপূর্ণ ভূমিকা পালন করে, ব্যক্তিদের একটি সৎ ও পরিপূর্ণ জীবনের দিকে পরিচালিত করে।",
  },
  {
    id: 3,
    name: "মো: সাঈম মিয়া",
    image:
      "https://dev.tajdidacademy.com/_next/image?url=%2FImages%2Freview%2Fsayem.png&w=96&q=75",
    position: "ওয়েব ডেভেলপার",
    content:
      "ইসলামে আধ্যাত্মিক দিকনির্দেশনা ও নৈতিক বিকাশের জন্য কুরআন শিক্ষা অত্যন্ত গুরুত্বপূর্ণ । এটি ব্যক্তিগত বিকাশে একটি গুরুত্বপূর্ণ ভূমিকা পালন করে, ব্যক্তিদের একটি সৎ ও পরিপূর্ণ জীবনের দিকে পরিচালিত করে।",
  },
  {
    id: 4,
    name: "মো: সোয়েব চন্দনী",
    image:
      "https://dev.tajdidacademy.com/_next/image?url=%2FImages%2Freview%2Fsoyeb.jfif&w=96&q=75",
    position: "ওয়েব ডেভেলপার",
    content:
      "ইসলামে আধ্যাত্মিক দিকনির্দেশনা ও নৈতিক বিকাশের জন্য কুরআন শিক্ষা অত্যন্ত গুরুত্বপূর্ণ । এটি ব্যক্তিগত বিকাশে একটি গুরুত্বপূর্ণ ভূমিকা পালন করে, ব্যক্তিদের একটি সৎ ও পরিপূর্ণ জীবনের দিকে পরিচালিত করে।",
  },
];

export default function CourseDetailsReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<FlatList>(null);

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollToIndex({
      index: index,
      animated: true,
    });
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? reviews.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === reviews.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={{ gap: 24, flexDirection: "row", alignItems: "flex-start" }}>
        <Typography
          weight="semiBold"
          size="lg"
          color="gray900"
          style={{ flex: 1 }}
        >
          আমাদের লার্নারদের কাছে শুনুন
        </Typography>

        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <TouchableOpacity
              onPress={prevSlide}
              style={styles.navigationButton}
              disabled={currentIndex < 1}
            >
              <SquareArrowLeft
                width={32}
                height={32}
                color={
                  currentIndex < 1
                    ? theme.colors.gray400
                    : theme.colors.primary600
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={nextSlide}
              style={styles.navigationButton}
              disabled={currentIndex === reviews.length - 1}
            >
              <SquareArrowRight
                width={32}
                height={32}
                color={
                  currentIndex === reviews.length - 1
                    ? theme.colors.gray400
                    : theme.colors.primary600
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.slider}>
        <FlatList
          data={reviews}
          renderItem={({ item }: ReviewItemProps) => (
            <CourseDetailsReviewItem item={item} />
          )}
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          getItemLayout={(_, index) => ({
            length: screenWidth,
            offset: (screenWidth - 32) * index,
            index,
          })}
          onScroll={handleScroll}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  slider: {
    flexDirection: "row",
    alignItems: "center",
  },
  navigationButton: {
    padding: 4,
  },
});
