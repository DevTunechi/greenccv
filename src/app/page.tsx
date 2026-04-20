'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { useCardGenerator } from '@/hooks/useCardGenerator';
import { NIGERIAN_BANKS } from '@/utils/bins';
import VerveCard from '@/components/card/VerveCard';
import FAQ from '@/components/ui/FAQ';

export default function GreenCCVPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // States
  const [isCapturing, setIsCapturing] = useState(false);
  const [showCopyNote, setShowCopyNote] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [expiryInput, setExpiryInput] = useState('MM/YY');
  const [cvvInput, setCvvInput] = useState('000');
  const [balance, setBalance] = useState('₦0.00');

  const {
    selectedBank,
    setSelectedBank,
    cardHolder,
    setCardHolder,
    cardNumber,
    handleGenerate
  } = useCardGenerator();

  useEffect(() => { setCardHolder(""); }, [setCardHolder]);

  // Copy Helper
  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setShowCopyNote(true);
    setTimeout(() => setShowCopyNote(false), 2000);
  };

  // Bulk Generation Logic
  const handleBulkExport = () => {
    // Dataset of diverse names for realistic testing
    const fallbackNames = [
      "CHINEDU OKORO", "AMAKA ADEBAYO", "OLUWATOSIN BALOGUN", 
      "EMMANUEL EZE", "NGOZI AFOLAYAN", "BABATUNDE BELLO", 
      "FATIMA MUSA", "IBRAHIM DANJUMA", "CHIDI OPARA", "TITILAYO ADEYEMI",
      "OKOCHA ADENUGA", "ZAINAB SANI", "KOFOWOROLA OLADELE", "MUSA ABDULLAHI",
      "ESTHER NWANKWO", "SAMUEL ONWU", "RAJI LAWAL", "BISI OJO",
      "EMEKA NWOSU", "HALIMA USMAN", "CHUKWUEMEKA IBE", "ADUNNI FALANA",
      "OLUWAKEMI AKINOLA", "YUSUF SALAMI", "AMARACHI NDUKA", "KUNLE AJAYI",
      "FOLAKE OLUWAFEMI", "CHIMA OBASI", "ZUBAIRU GARBA", "MOLLY EZE",
      "TUNDE FALODUN", "KADIR ABDUL", "OKECHUKWU NNAJI", "RAHILA IBRAHIM",
      "CHINONSO NWAFOR", "MARIAM SULEIMAN", "IKECHUKWU MADUKA", "BINTA USMAN",
      "OBINNA OKORIE", "KOFI ANNAN", "AMINA JIBRIL", "CHUKS NWOKO",
      "FATOU JALLOW", "EMEKA ONYEMA", "AISHA MOHAMMED", "CHIDI NWACHUKWU",
      "OLUWATOYIN OLALEKAN", "YAHAYA ABDULRAHMAN", "AMARACHI NWANKWO", "KUNLE AJAYI",
      "FOLAKE OLUWAFEMI", "CHIMA OBASI", "ZUBAIRU GARBA", "MOLLY EZE",
      "TUNDE FALODUN", "KADIR ABDUL", "OKECHUKWU NNAJI", "RAHILA IBRAHIM",
      "CHINONSO NWAFOR", "MARIAM SULEIMAN", "IKECHUKWU MADUKA", "BINTA USMAN", "OBINNA OKORIE", "KOFI ANNAN", "AMINA JIBRIL", "CHUKS NWOKO", "FATOU JALLOW", "EMEKA ONYEMA", "AISHA MOHAMMED", "CHIDI NWACHUKWU",
      "OLUWATOYIN OLALEKAN", "YAHAYA ABDULRAHMAN", "AMARACHI NWANKWO", "KUNLE AJAYI",
      "FOLAKE OLUWAFEMI", "CHIMA OBASI", "ZUBAIRU GARBA", "MOLLY EZE",
      "TUNDE FALODUN", "KADIR ABDUL", "OKECHUKWU NNAJI", "RAHILA IBRAHIM",
      "CHINONSO NWAFOR", "MARIAM SULEIMAN", "IKECHUKWU MADUKA", "BINTA USMAN",
      "OBINNA OKORIE", "KOFI ANNAN", "AMINA JIBRIL", "CHUKS NWOKO",
      "FATOU JALLOW", "EMEKA ONYEMA", "AISHA MOHAMMED", "CHIDI NWACHUKWU",
      "OLUWATOYIN OLALEKAN", "YAHAYA ABDULRAHMAN", "AMARACHI NWANKWO", "KUNLE AJAYI",
      "FOLAKE OLUWAFEMI", "CHIMA OBASI", "ZUBAIRU GARBA", "MOLLY EZE",
      "TUNDE FALODUN", "KADIR ABDUL", "OKECHUKWU NNAJI", "RAHILA IBRAHIM",
      "CHINONSO NWAFOR", "MARIAM SULEIMAN", "IKECHUKWU MADUKA", "BINTA USMAN"
    ];

    const bulkData = Array.from({ length: 10 }, () => {
      // Randomize Expiry: Random month and a year between 2026 and 2031
      const randomMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
      const randomYear = String(Math.floor(Math.random() * 6) + 26); // Results in 26, 27, 28, 29, 30, or 31
      
      return {
        bank: selectedBank.name,
        // Generates a unique 16-digit number for every entry
        number: "5061 " + 
                Math.floor(1000 + Math.random() * 9000) + " " + 
                Math.floor(1000 + Math.random() * 9000) + " " + 
                Math.floor(1000 + Math.random() * 9000),
        // If the name input is empty, pick a random name from our list
        holder: cardHolder || fallbackNames[Math.floor(Math.random() * fallbackNames.length)],
        expiry: `${randomMonth}/${randomYear}`,
        cvv: String(Math.floor(Math.random() * 899) + 100)
      };
    });

    // Create and trigger the download
    const blob = new Blob([JSON.stringify(bulkData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `greenccv_bulk_${selectedBank.id.toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); // Cleanup
    
    // Visual feedback
    setShowCopyNote(true);
    setTimeout(() => setShowCopyNote(false), 2000);
  };
  
  return (
    <main className="bg-white min-h-screen">
      {/* COPY NOTIFICATION */}
      <AnimatePresence>
        {showCopyNote && (
          <motion.div initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl flex items-center space-x-2"
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span>Details Copied to Clipboard</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUPPORT MODAL (MOBILE DATA) */}
      <AnimatePresence>
        {showSupportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-[2rem] max-w-sm w-full shadow-2xl text-center space-y-6"
            >
              <h3 className="text-xl font-black tracking-tight">Buy me mobile data</h3>
              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 text-left space-y-2">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">GTBank</p>
                <p className="text-lg font-mono font-bold tracking-tighter">0014969888</p>
                <p className="text-[11px] font-bold text-zinc-900 uppercase">Olatunji Oluwadare</p>
              </div>
              <button onClick={() => setShowSupportModal(false)} className="w-full py-2 font-black text-[10px] uppercase tracking-widest text-zinc-400">Close</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HEADER AD SLOT */}
      <div className="w-full h-12 bg-white border-b flex items-center justify-center text-[9px] text-zinc-300 font-black uppercase tracking-[0.4em]">Sponsored Placement</div>

      <div className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pb-20">
        
        {/* LEFT: VIEWPORT */}
        <section className="flex flex-col items-center space-y-12">
          <div ref={cardRef} className="w-full">
            <VerveCard bank={selectedBank} number={cardNumber || "0000 0000 0000 0000"} name={cardHolder || "NAME ON CARD"} expiry={expiryInput} cvv={cvvInput} balance={balance} />
          </div>

          <div className="w-full max-w-sm space-y-3">
            {/* QUICK COPY UI */}
            <div className="flex space-x-2 mb-4">
              <button onClick={() => copyToClipboard(cardNumber)} className="flex-1 py-3 bg-zinc-100 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                Copy Number
              </button>
              <button onClick={handleBulkExport} className="flex-1 py-3 bg-zinc-900 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                Bulk JSON
              </button>
            </div>

            <button onClick={handleBulkExport} disabled={isCapturing}
              className={`w-full py-5 rounded-2xl font-black text-xs tracking-[0.2em] transition-all shadow-2xl uppercase ${isCapturing ? 'bg-zinc-100 text-zinc-400' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
            >
              {isCapturing ? 'Processing...' : 'Download Card'}
            </button>
            <button onClick={handleGenerate} className="w-full py-4 bg-white text-zinc-400 rounded-2xl font-bold text-[10px] tracking-widest hover:text-zinc-600 border border-zinc-100 uppercase transition-all">Generate New Card</button>
            <button onClick={() => setShowSupportModal(true)} className="w-full py-4 text-emerald-600 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-50 rounded-2xl transition-all uppercase">Support Dev (Buy Data)</button>
          </div>
        </section>

        {/* RIGHT: CONFIGURATOR */}
        <section className="space-y-10">
          <header className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter uppercase">GREENCCV<span className="text-emerald-600">.</span></h1>
            <p className="text-zinc-400 font-black text-[10px] uppercase tracking-widest text-emerald-600">Advanced Asset Engine</p>
          </header>

          <div className="space-y-6 bg-white p-2 rounded-3xl">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-2">Issuing Authority</label>
              <select value={selectedBank.id} onChange={(e) => { const bank = NIGERIAN_BANKS.find(b => b.id === e.target.value); if (bank) setSelectedBank(bank); }} className="w-full p-5 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold text-sm outline-none cursor-pointer">
                {NIGERIAN_BANKS.map((bank) => ( <option key={bank.id} value={bank.id}>{bank.name}</option> ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-2">Cardholder Name</label>
              <input type="text" value={cardHolder} onChange={(e) => setCardHolder(e.target.value.toUpperCase())} placeholder="ENTER FULL NAME" className="w-full p-5 rounded-2xl border border-zinc-100 bg-zinc-50 font-mono text-sm outline-none"/>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-2">Mock Balance (₦)</label>
              <select onChange={(e) => setBalance(e.target.value)} className="w-full p-5 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold text-sm outline-none cursor-pointer">
                <option value="₦0.00">Nil Balance</option>
                <option value="₦420,000.00">₦100k - ₦500k</option>
                <option value="₦850,000.00">₦600k - ₦1.0m</option>
                <option value="₦3,200,000.00">₦1.1m - ₦5.0m</option>
                <option value="₦9,750,000.00">₦5.1m - ₦9.99m</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-2">Expiry</label>
                <input type="text" value={expiryInput} onChange={(e) => setExpiryInput(e.target.value)} placeholder="MM/YY" maxLength={5} className="w-full p-5 rounded-2xl border border-zinc-100 bg-zinc-50 font-mono text-sm"/>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-2">CVV</label>
                <input type="text" value={cvvInput} onChange={(e) => setCvvInput(e.target.value)} placeholder="000" maxLength={3} className="w-full p-5 rounded-2xl border border-zinc-100 bg-zinc-50 font-mono text-sm"/>
              </div>
            </div>
          </div>
        </section>
      </div>

      <FAQ />

      <footer className="mt-24 border-t border-zinc-100 bg-zinc-50/50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em]">
            <p>© 2026 GREENCCV.IO</p>
            <div className="flex space-x-10">
              <Link href="/privacy" className="hover:text-emerald-600 transition-all">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-emerald-600 transition-all">Developer Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}