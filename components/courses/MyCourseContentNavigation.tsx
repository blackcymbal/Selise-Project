import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Container, Typography } from "../ui";
import theme from "@/constants/theme";
import { ArrowLeft, ArrowRight } from "@/assets/icons/icons";

type MyCourseContentNavigationProps = {
  previousTitle?: string;
  nextTitle?: string;
};

export default function MyCourseContentNavigation({
  previousTitle = "পূর্ববর্তী",
  nextTitle = "পরবর্তী",
}: MyCourseContentNavigationProps) {
  return (
    <View>
      <Container py={4} flexDirection="row" gap={4} style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.previousButton}>
            <ArrowLeft color={theme.colors.gray700} />
            <Typography weight="semiBold" color="gray700">
              {" "}
              {previousTitle}
            </Typography>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.nextButton}>
            <Typography weight="semiBold" color="white">
              {" "}
              {nextTitle}
            </Typography>
            <ArrowRight color={theme.colors.white} />
          </TouchableOpacity>
        </View>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: theme.colors.gray100,
    overflow: "hidden",
  },
  buttonContainer: {
    flex: 1,
  },
  previousButton: {
    paddingVertical: 12,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  nextButton: {
    paddingVertical: 12,
    backgroundColor: theme.colors.primary600,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
});
