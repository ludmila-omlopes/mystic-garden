'use client';

import Link from "next/link";
import { cinzelDecor } from "@/app/fonts";
import ShineBorder from "@/components/magicui/shine-border";

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}

export default function HeroSection() {
  const backgroundImageUrl = "/images/background-image.webp";
  const videoUrl = "/images/featured-are-you-ready.gif";

  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url(" + backgroundImageUrl + ")",
      }}
    >
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative z-10 flex h-full w-full flex-col md:flex-row items-start md:items-center justify-between px-8 text-left">
        <div className="flex flex-col md:w-1/2">
          <h1 className={`mb-4 text-3xl font-extrabold tracking-tight text-white md:text-3xl lg:text-5xl ${cinzelDecor.className}`}>
            Mystic Unveiled
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-gray-300">
            Our first curated collection invites you to step into the world of Mystic Garden, where talented Lens artists summon magic and mystery. Prepare to experience the enchantment.
          </p>
          <div className="mb-8 flex items-center text-lg text-gray-300">
            <CalendarIcon className="h-6 w-6 mr-2 text-gray-300" />
            <span>JULY 20th - 2024</span>
          </div>
          <ShineBorder className="text-center uppercase" color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
            <Link href={'/drops/mystic'}>
              ENDED
            </Link>
          </ShineBorder>
        </div>
        <div className="mt-8 md:mt-0 md:w-1/2 flex items-center justify-left">
          <img
            src={videoUrl}
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
