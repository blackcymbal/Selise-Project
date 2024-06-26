import OngoingCourses from "@/components/home/OngoingCourses";
import RecommendedCourses from "@/components/home/RecommendedCourses";
import TopBarHome from "@/components/home/TopBarHome";
import { Button } from "@/components/ui";
import theme from "@/constants/theme";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TopBarHome />
      <Button
        active={true}
        onPress={() => router.navigate("/screens/quizResult/1")}
      >
        Goto Quiz Result
      </Button>
      <ScrollView>
        <OngoingCourses />
        <RecommendedCourses />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray50,
  },
});
