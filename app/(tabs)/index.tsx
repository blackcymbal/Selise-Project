import { StyleSheet, View } from "react-native";

import TopBarHome from "@/components/home/TopBarHome";
import theme from "@/constants/theme";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TopBarHome />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray50,
  },
});
