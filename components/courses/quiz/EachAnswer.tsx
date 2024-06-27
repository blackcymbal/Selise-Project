import { CancelSquare, CheckmarkSquare } from "@/assets/icons/icons";
import { Container, Typography } from "@/components/ui";
import theme from "@/constants/theme";
import React from "react";
import { StyleSheet } from "react-native";

export default function EachAnswer({
  index,
  item,
  isRight = true,
  isWrong = true,
}) {
  return (
    <Container
      flexDirection="row"
      py={2}
      mt={4}
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: theme.colors.gray100,
        backgroundColor:
          index % 2 === 0 ? theme.colors.error50 : theme.colors.success25,
      }}
    >
      <Typography>
        {index + 1}। {item}
      </Typography>

      {index % 2 === 0 ? (
        <CancelSquare height={20} color={theme.colors.error600} />
      ) : (
        <CheckmarkSquare height={20} color={theme.colors.success600} />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({});
