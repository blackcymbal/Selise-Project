import OngoingCourses from "@/components/home/OngoingCourses";
import RecommendedCourses from "@/components/home/RecommendedCourses";
import TopBarHome from "@/components/home/TopBarHome";
import { Button } from "@/components/ui";
import theme from "@/constants/theme";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [initialUrl, setInitialUrl] = useState(null);

  useEffect(() => {
    Linking.canOpenURL("tajdidacademy://screens/coursedetails/64")
      .then((res) => console.log("res: ", res))
      .catch((err) => console.log(err));
    const getInitialUrl = async () => {
      const url = await Linking.createURL("");
      if (url) {
        console.log("from home", url);
        setInitialUrl(url);
      }
    };

    getInitialUrl();
  }, []);

  return (
    <View style={styles.container}>
      <TopBarHome />
      <Button active={true} onPress={() => Linking.openURL("tajdidacademy://")}>
        Click
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
