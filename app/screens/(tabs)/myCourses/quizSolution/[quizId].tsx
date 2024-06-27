import { CourseDetailsTopBar } from "@/components/courses";
import EachQuiz from "@/components/courses/quiz/EachQuiz";
import { Container } from "@/components/ui";
import theme from "@/constants/theme";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function QuizSolution() {
  const QuizData = [
    {
      question: "বাংলাদেশের রাজধানীর নাম কি?",
      answers: ["ঢাকা", "রাজশাহী", "খুলনা", "বরিশাল"],
    },
    {
      question: "বাংলাদেশের রাজধানীর নাম কি?",
      answers: ["ঢাকা", "রাজশাহী", "খুলনা", "বরিশাল"],
    },
    {
      question: "বাংলাদেশের রাজধানীর নাম কি?",
      answers: ["ঢাকা", "রাজশাহী", "খুলনা", "বরিশাল"],
    },
    {
      question: "বাংলাদেশের রাজধানীর নাম কি?",
      answers: ["ঢাকা", "রাজশাহী", "খুলনা", "বরিশাল"],
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <CourseDetailsTopBar title={"১.৭ কুইজের বিস্তারিত সমাধান"} />
      <Container py={4}>
        <Container py={4} style={styles.container}>
          <FlatList
            data={QuizData}
            renderItem={({ item, index }) => (
              <EachQuiz
                key={index}
                index={index}
                question={item.question}
                answers={item.answers}
              />
            )}
          />
        </Container>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.gray100,
  },
});
