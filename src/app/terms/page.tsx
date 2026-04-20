'use client';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 font-sans">
      <nav className="border-b border-zinc-100 py-6 px-8">
        <Link href="/" className="text-xl font-black tracking-tighter">
          GREENCCV<span className="text-emerald-600">.</span>
        </Link>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-black tracking-tight mb-4">Developer Terms</h1>
        <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-12">Usage Guidelines</p>

        <div className="space-y-10 text-zinc-600 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-lg font-black text-zinc-950 uppercase tracking-tight">1. Testing Purposes Only</h2>
            <p>
              By using GreenCCV, you acknowledge that all generated numbers are mathematically simulated using the Luhn Algorithm. They are strictly for <strong>testing UI layouts, payment gateways in sandbox mode, and database structures.</strong>
            </p>
          </section>

          <section className="space-y-4 bg-zinc-50 p-6 border-l-4 border-zinc-950">
            <h2 className="text-lg font-black text-zinc-950 uppercase tracking-tight">2. Zero-Transaction Policy</h2>
            <p className="font-bold text-zinc-950">
              These cards hold no monetary value. Any attempt to use these details for real-world financial transactions is fraudulent and technically impossible, as they are not linked to any issuing network or bank account.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-black text-zinc-950 uppercase tracking-tight">3. Prohibited Use</h2>
            <p>
              Users are prohibited from using generated assets to deceive, defraud, or bypass security systems on third-party platforms. GreenCCV is a tool for developers and designers, not for bypassing legitimate KYC processes.
            </p>
          </section>
        </div>

        <div className="mt-20 pt-10 border-t border-zinc-100 text-center">
          <Link href="/" className="text-sm font-black text-emerald-600 hover:underline">
            Return to Generator
          </Link>
        </div>
      </article>
    </main>
  );
}