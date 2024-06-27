import Divider from "@/components/global/Divider";
import { Typography } from "@/components/ui";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import React from "react";
import { StyleSheet, View } from "react-native";
import EachAnswer from "./EachAnswer";

type EachQuizProps = {
  index: number;
  question: string;
  answers: string[];
};

export default function EachQuiz({ index, question, answers }: EachQuizProps) {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();
  return (
    <View>
      <Typography size="base" weight="semiBold" color="gray900">
        প্রশ্ন {numberToDigitFormat(index + 1)}। {question}
      </Typography>
      {answers.map((item, idx) => (
        <EachAnswer key={idx} index={idx} title={item} />
      ))}
      <Divider style={{ marginVertical: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({});
