import {
  ArrowUpRight,
  FileUnknown,
  Medal,
  Policy,
  StopWatch,
} from "@/assets/icons/icons";
import { Container, Typography } from "@/components/ui";
import theme from "@/constants/theme";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import ResultCard from "./ResultCard";

export default function ResultDetails() {
  const data = [
    {
      icon: Policy,
      title: "সঠিক উত্তর",
      subTitle: "৩/১০",
      iconColor: theme.colors.blue600,
      backgroundColor: theme.colors.blue50,
    },
    {
      icon: StopWatch,
      title: "সময় নিয়েছেন",
      subTitle: "৮",
      iconColor: theme.colors.purple600,
      backgroundColor: theme.colors.purple50,
    },
    {
      icon: FileUnknown,
      title: "ভুল উত্তর",
      subTitle: "৭",
      iconColor: theme.colors.error600,
      backgroundColor: theme.colors.error50,
    },
    {
      icon: Medal,
      title: "অর্জিত স্কোর",
      subTitle: "৩০%",
      iconColor: theme.colors.cyan600,
      backgroundColor: theme.colors.cyan50,
    },
  ];
  return (
    <>
      <Container flexDirection="row" gap={4} py={4} style={styles.container}>
        {data.map((item, idx) => (
          <ResultCard
            key={idx}
            Icon={item.icon}
            title={item.title}
            subTitle={item.subTitle}
            iconColor={item.iconColor}
            backgroundColor={item.backgroundColor}
          />
        ))}
      </Container>
      <Container mx={4} style={styles.footer}>
        <Link href={"/screens/(tabs)/myCourses/quizSolution/1"} asChild>
          <TouchableOpacity
            style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
          >
            <Typography weight="semiBold" color="primary700">
              সমাধানের বিস্তারিত দেখুন
            </Typography>
            <ArrowUpRight height={20} color={theme.colors.primary700} />
          </TouchableOpacity>
        </Link>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "space-between", flexWrap: "wrap" },
  footer: {
    height: 84,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
