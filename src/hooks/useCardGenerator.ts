'use client';

import { useState, useEffect } from 'react';
import { generateLuhnNumber, formatCardNumber } from '@/utils/luhn';
import { NIGERIAN_BANKS, BankTheme } from '@/utils/bins';

export const useCardGenerator = () => {
  // Default to the first bank in our list (usually First Bank or GTB)
  const [selectedBank, setSelectedBank] = useState<BankTheme>(NIGERIAN_BANKS[0]);
  const [cardHolder, setCardHolder] = useState<string>('OLATUNJI OLUWADARE');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('12/28');
  const [cvv, setCvv] = useState<string>('***');

  // Generate a fresh number whenever the bank changes or user hits 'Generate'
  const handleGenerate = () => {
    // Pick a random BIN from the selected bank's available BINs
    const randomBin = selectedBank.bins[Math.floor(Math.random() * selectedBank.bins.length)];
    const newNumber = generateLuhnNumber(randomBin);
    setCardNumber(formatCardNumber(newNumber));
    
    // Randomize CVV for realism
    const newCvv = Math.floor(100 + Math.random() * 900).toString();
    setCvv(newCvv);
  };

  // Auto-generate on first load
  useEffect(() => {
    handleGenerate();
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