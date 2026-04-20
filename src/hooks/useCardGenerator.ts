'use client';

import { useState, useEffect } from 'react';
import { generateLuhnNumber, formatCardNumber } from '@/utils/luhn';
import { NIGERIAN_BANKS, BankTheme } from '@/utils/bins';

export const useCardGenerator = () => {
  // Default to the first bank in our list (usually First Bank or GTB)
  const [selectedBank, setSelectedBank] = useState<BankTheme>(NIGERIAN_BANKS[0]);
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('***');

  // Helper to generate card number and CVV
  const generateCardDetails = () => {
    const randomBin = selectedBank.bins[Math.floor(Math.random() * selectedBank.bins.length)];
    const newNumber = generateLuhnNumber(randomBin);
    const formattedNumber = formatCardNumber(newNumber);
    const newCvv = Math.floor(100 + Math.random() * 900).toString();
    return { formattedNumber, newCvv };
  };

  // Generate a fresh number whenever the bank changes or user hits 'Generate'
  const handleGenerate = () => {
    const { formattedNumber, newCvv } = generateCardDetails();
    setCardNumber(formattedNumber);
    setCvv(newCvv);
  };

  // Auto-generate on first load or when selectedBank changes
  useEffect(() => {
    const { formattedNumber, newCvv } = generateCardDetails();
    setCardNumber(formattedNumber);
    setCvv(newCvv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBank]);

  return {
    selectedBank,
    setSelectedBank,
    cardHolder,
    setCardHolder,
    cardNumber,
    expiryDate,
    setExpiryDate,
    cvv,
    handleGenerate
  };
};