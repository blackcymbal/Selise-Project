import { FailIcon, PassIcon } from "@/assets/icons/icons";
import { Button, Container, Typography } from "@/components/ui";
import theme from "@/constants/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function ResultSummery({ isFailed = true }) {
  return (
    <Container>
      <Container py={6} my={4} style={styles.container}>
        <View style={{ alignItems: "center" }}>
          {isFailed ? <FailIcon height={56} /> : <PassIcon height={56} />}
          <Typography
            size="lg"
            weight="semiBold"
            color={isFailed ? "error600" : "successDefault"}
            mt={6}
          >
            {isFailed
              ? "দুঃখিত, আপনি পাশ করেন নি"
              : "অভিনন্দন, আপনি পাশ করেছেন"}
          </Typography>
          <Typography size="sm" color="gray700">
            আপনি ৩০% স্কোর অর্জন করেছেন
          </Typography>
        </View>
      </Container>
      <View style={styles.divider} />
      <Container py={6} flexDirection="row" gap={4} style={styles.container2}>
        <View style={styles.buttonContainer}>
          <Button
            active={true}
            style={{ backgroundColor: theme.colors.primary50 }}
            onPress={() => {}}
          >
            কুইজটি আবার দিন
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button active={true} buttonStyle="inline" onPress={() => {}}>
            নেক্সট
          </Button>
        </View>
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray50,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray100,
  },
  container2: {
    backgroundColor: theme.colors.gray50,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray100,
    overflow: "hidden",
  },
  divider: { height: 1, backgroundColor: theme.colors.gray200 },
  buttonContainer: {
    flex: 1,
  },
});
