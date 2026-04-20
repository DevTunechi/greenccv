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
  
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const [showCopyNote, setShowCopyNote] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [expiryInput, setExpiryInput] = useState('2031-11'); 
  const [cvv, setCvv] = useState('443');
  const [balance, setBalance] = useState('₦3,200,000.00');

  const {
    selectedBank,
    setSelectedBank,
    cardHolder,
    setCardHolder,
    cardNumber,
    handleGenerate
  } = useCardGenerator();

  useEffect(() => {
    setCvv(Math.floor(Math.random() * 899 + 100).toString());
  }, [cardNumber]);

  useEffect(() => { setCardHolder(""); }, [setCardHolder]);

  // Countdown timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCapturing && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0) {
      router.push('/download');
    }
    return () => clearInterval(timer);
  }, [isCapturing, countdown, router]);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setShowCopyNote(true);
    setTimeout(() => setShowCopyNote(false), 2000);
  };

  const handleAdClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadInitiate = async () => {
    if (cardRef.current === null) return;
    setIsCapturing(true);
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#10b981'] });

    try {
      const [year, month] = expiryInput.split('-');
      const displayExpiry = `${month}/${year.slice(-2)}`;
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 4, backgroundColor: 'transparent' });
      localStorage.setItem('pending_download', dataUrl);
      await copyToClipboard(`Bank: ${selectedBank.name}\nCard: ${cardNumber}\nHolder: ${cardHolder}\nExp: ${displayExpiry}\nCVV: ${cvv}\nBalance: ${balance}`);
    } catch (err) {
      console.error(err);
      setIsCapturing(false);
    }
  };

  return (
    <main className="bg-white min-h-screen relative">
      
      {/* 15s COUNTDOWN AD OVERLAY */}
      <AnimatePresence>
        {isCapturing && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-zinc-950/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="max-w-md w-full space-y-8">
              <div className="space-y-2">
                <p className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em]">Rendering High-Res Asset</p>
                <h2 className="text-6xl font-black text-white tabular-nums">{countdown}s</h2>
              </div>

              {/* Countdown Ad Space */}
              <div 
                onClick={() => handleAdClick('https://your-ad-link.com')}
                className="w-full aspect-video bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col items-center justify-center p-8 cursor-pointer hover:border-emerald-500/50 transition-all group"
              >
                <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest mb-4">Sponsored Content</p>
                <div className="w-16 h-16 bg-zinc-800 rounded-2xl mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold uppercase tracking-tighter">Premium Crypto Wallet</h3>
                <p className="text-zinc-400 text-xs mt-2">Secure your assets with the world's most trusted cold storage.</p>
                <span className="mt-6 text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 px-4 py-2 rounded-full">Learn More</span>
              </div>
              
              <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">Please do not close this window</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCopyNote && (
          <motion.div initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl flex items-center space-x-2"
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span>Asset Data Copied</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUPPORT MODAL */}
      <AnimatePresence>
        {showSupportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-[2rem] max-w-sm w-full shadow-2xl text-center space-y-6"
            >
              <h3 className="text-xl font-black tracking-tight uppercase">Buy me mobile data</h3>
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

      {/* TOP AD SLOT */}
      <div 
        onClick={() => handleAdClick('https://advertiser-link.com')}
        className="w-full h-14 bg-zinc-50 border-b flex items-center justify-center text-[9px] text-zinc-400 font-black uppercase tracking-[0.4em] cursor-pointer hover:bg-zinc-100 transition-colors"
      >
        ADVERTISEMENT: GET 50% OFF CLOUD HOSTING →
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pb-20">
        
        {/* LEFT: PREVIEW */}
        <section className="flex flex-col items-center space-y-12">
          <div ref={cardRef} className="w-full overflow-hidden rounded-2xl">
            <VerveCard 
              bank={selectedBank} 
              number={cardNumber || "4022 3733 1234 3601"} 
              name={cardHolder || "DUDU IFAKO"} 
              expiry={expiryInput.split('-').reverse().join('/')} 
              cvv={cvv} 
              balance={balance} 
            />
          </div>

          <div className="w-full max-sm:max-w-full max-w-sm space-y-3">
            <div className="flex space-x-2 mb-4">
              <button onClick={() => copyToClipboard(cardNumber)} className="flex-1 py-3 bg-zinc-100 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2">Copy Number</button>
              <button onClick={() => setCvv(Math.floor(Math.random() * 899 + 100).toString())} className="flex-1 py-3 bg-zinc-900 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-600 transition-all">Shuffle CVV</button>
            </div>
            <button onClick={handleDownloadInitiate} disabled={isCapturing} className={`w-full py-5 rounded-2xl font-black text-xs tracking-[0.2em] shadow-2xl uppercase transition-all ${isCapturing ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
              {isCapturing ? `Generating Asset (${countdown}s)...` : 'Download Card'}
            </button>
            <button onClick={handleGenerate} className="w-full py-4 bg-white text-zinc-400 rounded-2xl font-bold text-[10px] tracking-widest hover:text-zinc-600 border border-zinc-100 uppercase transition-all">Generate New Card</button>
            <button onClick={() => setShowSupportModal(true)} className="w-full py-4 text-emerald-600 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-50 rounded-2xl transition-all">Support Dev (Buy Data)</button>
          </div>
        </section>

        {/* RIGHT: CONFIGURATOR */}
        <section className="space-y-10">
          <header className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none text-zinc-900">GREENCCV<span className="text-emerald-600">.</span></h1>
            <p className="text-zinc-400 font-black text-[10px] uppercase tracking-widest text-emerald-600">Advanced Asset Engine</p>
          </header>

          <div className="space-y-6 bg-white p-2 rounded-3xl">
            {/* IN-CONFIG AD */}
            <div 
              onClick={() => handleAdClick('https://another-ad.com')}
              className="w-full p-4 bg-zinc-900 rounded-2xl flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-zinc-800 rounded-lg group-hover:bg-emerald-500 transition-colors" />
                <div>
                  <p className="text-white font-bold text-[10px] uppercase tracking-tighter">Host with SwitchMail</p>
                  <p className="text-zinc-500 text-[9px] uppercase tracking-widest">Sponsored</p>
                </div>
              </div>
              <span className="text-zinc-400 text-[18px]">→</span>
            </div>

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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 px-2">Expiry Date</label>
                <input type="month" value={expiryInput} onChange={(e) => setExpiryInput(e.target.value)} className="w-full p-5 rounded-2xl border border-zinc-100 bg-zinc-50 font-sans font-bold text-sm outline-none cursor-pointer"/>
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
            </div>
          </div>
        </section>
      </div>

      <FAQ />

      {/* AD PLACEHOLDER */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div 
          onClick={() => handleAdClick('https://advertiser-link.com')}
          className="w-full h-32 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-[2rem] flex flex-col items-center justify-center space-y-2 hover:bg-zinc-100 transition-colors cursor-pointer group"
        >
          <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.4em] group-hover:text-emerald-500 transition-colors">Sponsored Ad Space</p>
          <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Click to view partner offers</p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-zinc-100 bg-zinc-50/50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-50 border border-amber-100 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">Compliance & Safety</span>
          </div>
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