'use client';
import { BankTheme } from '@/utils/bins';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface CardProps {
  bank: BankTheme;
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  balance?: string;
}

export default function VerveCard({ bank, number, name, expiry, cvv, balance }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full max-w-md aspect-[1.586/1] cursor-pointer perspective-1000 group select-none"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        className="relative w-full h-full preserve-3d shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl transition-all duration-500"
      >
        {/* FRONT SIDE */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl p-8 overflow-hidden"
          style={{ backgroundColor: bank.primaryColor }}
        >
          {/* Subtle Onyx Texture - Solid, non-transparent feel */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
          
          {/* Internal Glow - Depth only */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />

          <div className="relative z-10 h-full flex flex-col justify-between">
            {balance && (
              <div className="absolute top-6 right-8 text-right opacity-80">
                <p className="text-[8px] font-black uppercase tracking-widest">Available Balance</p>
                <p className="text-sm font-mono font-bold">{balance}</p>
              </div>
            )}
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h2 className="text-xl font-black italic tracking-tighter" style={{ color: bank.textColor }}>
                  {bank.name.toUpperCase()}
                </h2>
                {/* Simulated EMV Chip */}
                <div className="w-12 h-9 bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-700 rounded shadow-inner relative overflow-hidden">
                   <div className="absolute inset-0 opacity-20 border-[0.5px] border-black/30" />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black italic text-red-600 drop-shadow-md">Verve</p>
                <p className="text-[8px] uppercase tracking-widest font-black opacity-80" style={{ color: bank.textColor }}>Debit</p>
              </div>
            </div>

            {/* Card Number */}
            <motion.p 
              key={number}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-mono tracking-[0.15em] drop-shadow-lg" 
              style={{ color: bank.textColor }}
            >
              {number || "0000 0000 0000 0000"}
            </motion.p>
            
            {/* Identity & Expiry */}
            <div className="flex justify-between items-end uppercase text-[9px] font-bold tracking-widest" style={{ color: bank.textColor }}>
              <div className="space-y-1">
                <p className="opacity-60 text-[7px]">Card Holder</p>
                <p className="text-sm font-black tracking-tight">{name || 'NAME ON CARD'}</p>
              </div>
              <div className="text-right space-y-1">
                <p className="opacity-60 text-[7px]">Expires</p>
                <p className="text-sm font-black tracking-tight">{expiry || 'MM/YY'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* BACK SIDE (SOLID DESIGN) */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl rotate-y-180 flex flex-col overflow-hidden transition-colors duration-500"
          style={{ backgroundColor: bank.primaryColor }}
        >
          {/* Magnetic Stripe */}
          <div className="w-full h-12 bg-zinc-900 mt-6 shadow-inner" />
          
          <div className="mt-6 px-8">
            <div className="flex items-center gap-3">
              {/* Signature/CVV Panel */}
              <div className="flex-1 h-10 bg-zinc-100 flex items-center justify-end px-4 shadow-inner">
                <p className="font-mono text-zinc-900 italic font-black text-lg tracking-widest">
                  {cvv}
                </p>
              </div>
              {/* Hologram Placeholder */}
              <div className="w-14 h-10 bg-gradient-to-tr from-zinc-300 via-zinc-100 to-zinc-400 rounded opacity-30 shadow-sm" />
            </div>
            
            <p className="mt-8 text-[7px] leading-tight font-bold opacity-60 italic text-center max-w-[280px] mx-auto" style={{ color: bank.textColor }}>
              Authorized Signature - Not Valid Unless Signed. This card is a mathematically generated visual for development testing purposes only. Property of {bank.name}.
            </p>
          </div>

          <div className="mt-auto mb-6 px-8 flex justify-between items-end">
            <div className="opacity-20 text-[10px] font-black uppercase tracking-tighter" style={{ color: bank.textColor }}>
              {bank.id}
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
               <div className="w-4 h-4 border-2 border-white/20 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Visual Instruction (Mobile First) */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] text-zinc-400 uppercase tracking-[0.3em] font-black whitespace-nowrap">
        Tap to Flip Card
      </div>
    </div>
  );
}