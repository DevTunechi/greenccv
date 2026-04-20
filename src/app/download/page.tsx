'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DownloadPage() {
  const [image, setImage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem('pending_download');
    if (!data) router.push('/'); // Guard: Send back if no image found
    setImage(data);

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const saveFile = () => {
    const link = document.createElement('a');
    link.download = `greenccv-${Date.now()}.png`;
    link.href = image!;
    link.click();
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      {/* TOP AD SLOT */}
      <div className="w-full max-w-4xl h-32 bg-zinc-50 border border-dashed mb-12 flex items-center justify-center text-[10px] text-zinc-300">
        PREMIUM AD PLACEMENT
      </div>

      <div className="max-w-md w-full space-y-8">
        <h1 className="text-2xl font-black tracking-tighter">PREPARING YOUR ASSET...</h1>
        
        {/* PREVIEW OF THE IMAGE */}
        {image && (
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-zinc-100">
            <img src={image} alt="Preview" className="w-full grayscale opacity-50 blur-[2px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-4xl font-black text-zinc-900">{countdown}s</p>
            </div>
          </div>
        )}

        {countdown > 0 ? (
          <p className="text-zinc-400 font-bold text-xs uppercase tracking-widest animate-pulse">
            Optimizing for High-Resolution Export...
          </p>
        ) : (
          <button 
            onClick={saveFile}
            className="w-full py-5 bg-zinc-950 text-white rounded-2xl font-black animate-bounce shadow-xl"
          >
            CLICK TO SAVE TO DEVICE
          </button>
        )}
      </div>

      {/* BOTTOM AD SLOT (NATIVE STYLE) */}
      <div className="mt-12 w-full max-w-lg aspect-square bg-zinc-50 border border-dashed flex items-center justify-center text-[10px] text-zinc-300">
        NATIVE CONTENT AD UNIT
      </div>
    </main>
  );
}