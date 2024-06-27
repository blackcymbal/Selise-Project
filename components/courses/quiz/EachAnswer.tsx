import { CancelSquare, CheckmarkSquare } from "@/assets/icons/icons";
import { Container, Typography } from "@/components/ui";
import theme from "@/constants/theme";
import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";
import React from "react";

type EachAnswerProps = {
  index: number;
  title: string;
  isRight?: true;
  isWrong?: true;
};

export default function EachAnswer({
  index,
  title,
  isRight = true,
  isWrong = true,
}: EachAnswerProps) {
  const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();
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
        borderColor:
          index % 2 === 0
            ? theme.colors.error300
            : index % 3 === 0
            ? theme.colors.success300
            : theme.colors.gray200,
        backgroundColor:
          index % 2 === 0
            ? theme.colors.error50
            : index % 3 === 0
            ? theme.colors.success50
            : theme.colors.gray25,
      }}
    >
      <Typography>
        {numberToDigitFormat(index + 1)}। {title}
      </Typography>

      {index % 2 === 0 ? (
        <CancelSquare height={20} color={theme.colors.error600} />
      ) : index % 3 === 0 ? (
        <CheckmarkSquare height={20} color={theme.colors.success600} />
      ) : null}
    </Container>
  );
}
