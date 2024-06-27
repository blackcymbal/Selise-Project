import { FileUnknown, Medal, Policy, StopWatch } from "@/assets/icons/icons";
import { Container, Typography } from "@/components/ui";
import theme from "@/constants/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function ResultDetails() {
  const data = [
    { icon: Policy, title: "সঠিক উত্তর", subTitle: "৩/১০" },
    { icon: StopWatch, title: "সময় নিয়েছেন", subTitle: "৮ মিনিট" },
    { icon: FileUnknown, title: "ভুল উত্তর", subTitle: "৭" },
    { icon: Medal, title: "অর্জিত স্কোর", subTitle: "৩০%" },
  ];
  return (
    <Container
      flexDirection="row"
      gap={4}
      style={{ justifyContent: "space-between", flexWrap: "wrap" }}
    >
      {data.map((item, idx) => (
        <ResultCard
          key={idx}
          Icon={item.icon}
          title={item.title}
          subTitle={item.subTitle}
        />
      ))}
    </Container>
  );
}

function ResultCard({ Icon, title, subTitle }) {
  return (
    <Container
      flexDirection="row"
      py={4}
      gap={2}
      style={{
        // flex: 1,
        flexBasis: "47.5%",
        borderWidth: 1,
        borderColor: theme.colors.gray200,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          height: 36,
          width: 36,
          borderRadius: 36,
          backgroundColor: theme.colors.blue50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon height={20} width={20} color={"#D92D20"} />
      </View>
      <View>
        <Typography>{title}</Typography>
        <Typography>{subTitle}</Typography>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({});
