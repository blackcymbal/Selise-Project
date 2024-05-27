function convertNumber(number: number) {
  const digitMappings = {
    en: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    bn: ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'],
  };

  const isNegative = Math.sign(number) === -1;
  const absoluteNumber = Math.abs(number);

  const convertIntegerPart = (integerPart: number) => {
    if (integerPart >= 1 && integerPart <= 9) {
      return digitMappings.bn[integerPart];
    } else {
      const integerDigits = integerPart.toString().split('');
      const convertedIntegerDigits = integerDigits.map(
        digit => digitMappings.bn[parseInt(digit, 10)],
      );
      return convertedIntegerDigits.join('');
    }
  };

  const integerPart = Math.floor(absoluteNumber);
  let decimalPart = absoluteNumber - integerPart;

  // Round the decimal part to a specific number of decimal places (e.g., 2)
  const decimalPlaces = 2;
  decimalPart = parseFloat(decimalPart.toFixed(decimalPlaces));

  const integerPartString = convertIntegerPart(integerPart);

  let formattedNumber = `${isNegative ? '-' : ''}${integerPartString ?? ''}`;

  // Add decimal part, if it exists
  if (decimalPart > 0) {
    const decimalDigits = decimalPart.toString().split('').slice(2); // Remove "0." from the decimal part
    const convertedDecimalDigits = decimalDigits.map(
      digit => digitMappings.bn[parseInt(digit, 10)],
    );
    formattedNumber += `.${convertedDecimalDigits.join('')}`;
  }

  return formattedNumber;
}

export const useNumberToLocalizedDigitFormat = () => {
  const numberToDigitFormat = (number: number) => {
    try {
      return convertNumber(number);
    } catch (err) {
      return '';
    }
  };

  return { numberToDigitFormat };
};
