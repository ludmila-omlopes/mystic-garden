'use client';

import Link from "next/link";

export default function HeroSection() {
    const backgroundImageUrl = "/images/background-image.webp";
    
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url(" + backgroundImageUrl + ")",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex h-full w-full flex-col items-start justify-center px-8 text-left">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
          Mystic Garden
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-gray-300">
          Experience the enchantment of the Mystic Garden NFT gallery, where art and nature intertwine in a digital oasis.
        </p>
        <Link
          className="inline-flex h-14 items-center justify-center bg-green-600 px-8 text-lg font-semibold text-white shadow-md transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          href="#"
        >
          Explore the Gallery
        </Link>
      </div>
    </section>
  );
}
