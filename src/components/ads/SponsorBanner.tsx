export default function SponsorBanner() {
  return (
    <a href="https://your-sponsor-link.com" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
       <img src="/sponsor-logo.png" alt="Sponsor" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" />
    </a>
  );
}