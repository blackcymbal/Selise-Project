import { Container, Typography } from "@/components/ui";
import theme from "@/constants/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SvgProps } from "react-native-svg";

type ResultCardProps = {
  Icon: React.FC<SvgProps>;
  title: string;
  subTitle: string;
  iconColor: string;
  backgroundColor: string;
};

export default function ResultCard({
  Icon,
  title,
  subTitle,
  iconColor,
  backgroundColor,
}: ResultCardProps) {
  return (
    <Container flexDirection="row" py={4} gap={2} style={styles.container}>
      <View
        style={[styles.iconContainer, { backgroundColor: backgroundColor }]}
      >
        <Icon height={20} width={20} color={iconColor} />
      </View>
      <View>
        <Typography size="sm">{title}</Typography>
        <Typography size="xl" weight="semiBold" color="gray900">
          {subTitle}{" "}
          {title == "সময় নিয়েছেন" && <Typography size="sm">মিনিট</Typography>}
        </Typography>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexBasis: "47.5%",
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    height: 36,
    width: 36,
    borderRadius: 36,

    alignItems: "center",
    justifyContent: "center",
  },
});
