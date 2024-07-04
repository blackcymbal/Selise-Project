import OngoingCourses from "@/components/home/OngoingCourses";
import RecommendedCourses from "@/components/home/RecommendedCourses";
import TopBarHome from "@/components/home/TopBarHome";
import theme from "@/constants/theme";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TopBarHome />
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
