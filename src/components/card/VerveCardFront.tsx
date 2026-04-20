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
  // Use First Bank branding as the default/reference point
  const bankName = bank.id === 'firstbank' ? 'FIRST BANK' : bank.name.toUpperCase();
  const textColor = bank.textColor;

  return (
    <div className="relative w-full max-w-md aspect-[1.586/1] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl p-8 overflow-hidden select-none"
      style={{ backgroundColor: bank.primaryColor || '#013D5A' }}
    >
      {/* Subtle Texture Layer (Carbon Fiber) */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
      
      {/* Gloss Layer */}
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

        {/* Balance (Visible only if balance is set) */}
        {balance && balance !== '₦0.00' && (
          <div className="absolute top-16 right-8 text-right opacity-80">
            <p className="text-[8px] font-black uppercase tracking-widest" style={{ color: textColor }}>Available Balance</p>
            <p className="text-sm font-mono font-bold" style={{ color: textColor }}>{balance}</p>
          </div>
        )}

        {/* EMV Chip & Number Section */}
        <div className="flex items-end gap-6">
          <div className="w-14 h-10 bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-700 rounded shadow-inner relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 border-[0.5px] border-black/30" />
          </div>
          
          {/* Card Number (Responsive Single Line) */}
          <motion.p 
            key={number}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[clamp(1.1rem,4.5vw,1.875rem)] font-mono tracking-[0.12em] drop-shadow-lg leading-none whitespace-nowrap overflow-hidden text-ellipsis" 
            style={{ color: textColor }}
          >
            {number || "4022 3733 1234 3601"}
          </motion.p>
        </div>
        
        {/* Identity, Expiry & CVV */}
        <div className="flex justify-between items-end uppercase tracking-widest" style={{ color: textColor }}>
          <div className="space-y-1">
            <p className="opacity-60 text-[7px] font-black leading-none">Card Holder</p>
            <p className="text-sm font-black tracking-tighter leading-none">{name || 'DUDU IFAKO'}</p>
          </div>
          
          {/* Expiry and Front CVV */}
          <div className="flex items-end gap-5">
             <div className="text-right space-y-1">
                <p className="opacity-60 text-[7px] font-black leading-none">Expires</p>
                <p className="text-sm font-black tracking-tight leading-none">{expiry || '11/2031'}</p>
             </div>
             
             {/* CVV placed on front */}
             <div className="p-2 border border-dashed border-zinc-200 rounded-lg text-center min-w-10">
                <p className="font-mono italic font-bold text-sm tracking-widest leading-none drop-shadow-md">
                   {cvv}
                </p>
                <p className="opacity-60 text-[6px] font-black mt-1">CVV</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}