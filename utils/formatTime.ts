import { useNumberToLocalizedDigitFormat } from "@/hooks/useNumberToLocalDigitFormat";

const { numberToDigitFormat } = useNumberToLocalizedDigitFormat();

export const formatTime = (timeInSeconds: number) => {
  const date = new Date(timeInSeconds * 1000);
  const minutes = date.getUTCMinutes();
  const seconds = date.getSeconds();

  const formattedMinutes = numberToDigitFormat(minutes).padStart(
    2,
    numberToDigitFormat(0)
  );
  const formattedSeconds = numberToDigitFormat(seconds).padStart(
    2,
    numberToDigitFormat(0)
  );

  const bengaliTime = `${formattedMinutes}:${formattedSeconds}`;
  return bengaliTime;
};
