/**
 * greenccv - Luhn Algorithm Utility
 * Generates valid-format card numbers for testing.
 */

export const generateLuhnNumber = (prefix: string, length: number = 16): string => {
  let cardNum = prefix;

  // Generate random digits up to length - 1
  while (cardNum.length < length - 1) {
    cardNum += Math.floor(Math.random() * 10).toString();
  }

  // Calculate Checksum
  let sum = 0;
  let shouldDouble = true;

  for (let i = cardNum.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNum.charAt(i));

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  return cardNum + checkDigit.toString();
};

export const formatCardNumber = (num: string): string => {
  return num.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim();
};