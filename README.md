# Pranav PS | 3D Interactive Portfolio

A high-fidelity, interactive 3D portfolio showcasing my work as a Robotics & Computer Vision Engineer. Built with a focus on immersive WebGL experiences, advanced rendering optimizations, and smooth spatial animations.

![Portfolio Preview](./public/preview.png)

## 🚀 Features

- **Cinematic 3D LiDAR Sweep:** A custom GLSL shader-driven particle system utilizing a high-fidelity 200,000 point-cloud mesh, mimicking professional Gaussian Splatting and 3D reconstruction scans.
- **Scroll-Linked Time Reversal:** The entire 3D intro animation sequence is mathematically bound to scroll position (`window.scrollY`), allowing seamless, native time-reversal when scrolling backwards.
- **Dynamic Magnetic UI:** Premium tactile micro-interactions on call-to-action buttons using Framer Motion physics springs.
- **Optimized Rendering:** Complex 3D sampling is prebaked into raw `Float32Array` buffers with aggressive shader-level culling to ensure smooth 60fps performance across devices.
- **Centralized Data Layer:** Complete separation of concerns. All experience, skills, and project data are dynamically injected from a strictly typed data layer.

## 🛠 Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **3D Graphics:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) & [Three.js](https://threejs.org/)
- **Post-Processing:** `@react-three/postprocessing` (Bloom, Chromatic Aberration)
- **Animations:** [GSAP ScrollTrigger](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scrolling:** [Lenis](https://lenis.studiofreight.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)

## 💻 Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Deployment (Vercel)

This project is fully optimized for zero-config deployment on [Vercel](https://vercel.com/):

1. Push your code to your GitHub repository.
2. Sign in to Vercel and import your repository.
3. Click **Deploy**. Vercel will automatically build the Next.js app and provide a live URL.

---
*Built by Pranav PS - Robotics & Computer Vision Engineer*
