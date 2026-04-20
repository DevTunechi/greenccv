# 💳 greenccv

**A high-performance, mobile-first Virtual Card visualizer & generator.** Built for developers and UI/UX designers to create mathematically valid-format card mockups for testing Nigerian payment gateways.

---

## 📱 Mobile-First Experience
`greenccv` is designed with a "Thumb-Zone" focus:
- **Zero-Zoom UI**: All controls are oversized for easy tapping.
- **Instant Flip**: 3D animations optimized for mobile GPUs (Framer Motion).
- **Download-to-Device**: Seamlessly export high-quality card mockups as PNGs.

## 🚀 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS (Minimalist / Clean Gallery)
- **Animations**: Framer Motion
- **Export Engine**: html-to-image
- **Logic**: Custom Luhn Algorithm implementation

## 🛠️ Project Structure
```text
src/
├── app/          # Static routes (Home, Download)
├── components/   # UI Atoms & Bento Tiles
├── hooks/        # Generator logic
└── utils/        # Luhn Math & Bank BINs