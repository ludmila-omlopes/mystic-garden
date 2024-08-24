'use client';

import { HeroParallax } from "./ui/hero-parallax";

export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "/images/background-image.webp",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "/images/background-image.webp",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "/images/background-image.webp",
  },
 
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "/images/background-image.webp",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "/images/background-image.webp",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "/images/background-image.webp",
  },
 
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "/images/background-image.webp",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "/images/background-image.webp",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "/images/background-image.webp",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "/images/background-image.webp",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "/images/background-image.webp",
  },
 
  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "/images/background-image.webp",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "/images/background-image.webp",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "/images/background-image.webp",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "/images/background-image.webp",
  },
];

export default function HeroSection() {
  return (
    <section>
      <HeroParallax products={products} />
    </section>
  );
}
