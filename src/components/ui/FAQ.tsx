export default function FAQ() {
  const faqs = [
    { q: "Are these real bank cards?", a: "No. All numbers are mathematically generated using the Luhn Algorithm for development testing. They hold no balance and cannot be used for purchases." },
    { q: "Is my data secure?", a: "100%. GREENCCV processes everything locally in your browser. We never see, store, or transmit your data to any server." },
    { q: "Which banks are supported?", a: "We support major Nigerian institutions including GTBank, Zenith, Kuda, Moniepoint, and more, specifically for Verve card layouts." }
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 py-20 border-t border-zinc-100">
      <h2 className="text-2xl font-black tracking-tighter mb-12 uppercase text-center">Frequently Asked Questions</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {faqs.map((faq, i) => (
          <div key={i} className="space-y-3">
            <h3 className="font-black text-[10px] uppercase tracking-widest text-emerald-600">{faq.q}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}