'use client';
import { BankTheme } from '@/utils/bins';
import { motion } from 'framer-motion';

interface CardProps {
  bank: BankTheme;
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  balance?: string;
}

export default function VerveCardFront({ bank, number, name, expiry, cvv, balance }: CardProps) {
  const bankName = bank.id === 'firstbank' ? 'FIRST BANK' : bank.name.toUpperCase();
  const textColor = bank.textColor;

  return (
    <div className="relative w-full max-w-md aspect-[1.586/1] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl p-8 overflow-hidden select-none"
      style={{ backgroundColor: bank.primaryColor || '#013D5A' }}
    >
      {/* Texture & Gloss Layers */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />

      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-black italic tracking-tighter leading-none" style={{ color: textColor }}>
            {bankName}
          </h2>
          <div className="text-right">
            <p className="text-xl font-black italic text-red-600 drop-shadow-md">Verve</p>
            <p className="text-[8px] uppercase tracking-widest font-black opacity-80" style={{ color: textColor }}>Debit</p>
          </div>
        </div>

        {/* Balance Display */}
        {balance && balance !== '₦0.00' && (
          <div className="absolute top-16 right-8 text-right opacity-80">
            <p className="text-[8px] font-black uppercase tracking-widest" style={{ color: textColor }}>Available Balance</p>
            <p className="text-sm font-mono font-bold" style={{ color: textColor }}>{balance}</p>
          </div>
        )}

        {/* Chip & Card Number */}
        <div className="flex items-end gap-6">
          <div className="w-14 h-10 bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-700 rounded shadow-inner relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 border-[0.5px] border-black/30" />
          </div>
          
          <motion.p 
            key={number}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[clamp(1.1rem,4.5vw,1.875rem)] font-mono tracking-[0.12em] drop-shadow-lg leading-none whitespace-nowrap overflow-hidden" 
            style={{ color: textColor }}
          >
            {number || "0000 0000 0000 0000"}
          </motion.p>
        </div>
        
        {/* Bottom Section: Name, Expiry, CVV */}
        <div className="flex justify-between items-end uppercase tracking-widest" style={{ color: textColor }}>
          <div className="space-y-1">
            <p className="opacity-60 text-[7px] font-black leading-none">Card Holder</p>
            <p className="text-sm font-black tracking-tighter leading-none min-h-[1.25rem]">{name || "NAME ON CARD"}</p>
          </div>
          
          <div className="flex items-end gap-5">
             <div className="text-right space-y-1">
                <p className="opacity-60 text-[7px] font-black leading-none">Expires</p>
                <p className="text-sm font-black tracking-tight leading-none">{expiry || '00/00'}</p>
             </div>
             
             {/* CVV DISPLAY ON FRONT */}
             <div className="flex flex-col items-center">
                <div 
                  className="px-3 py-1.5 border rounded-lg bg-black/10 backdrop-blur-sm min-w-[45px] flex items-center justify-center"
                  style={{ borderColor: `${textColor}40` }} // Sets border color to 40% opacity of text color
                >
                  <p className="font-mono italic font-bold text-sm tracking-[0.15em] leading-none drop-shadow-md" style={{ color: textColor }}>
                    {cvv}
                  </p>
                </div>
                <p className="opacity-60 text-[6px] font-black mt-1">CVV</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}