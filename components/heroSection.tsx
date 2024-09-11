'use client';

import { cinzelDecor } from "@/app/fonts";
import Particles from "./magicui/particles";
import { useState, useEffect } from "react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { HERO_IMAGES_LIGHT, HERO_IMAGES_DARK } from "@/app/constants";
import { useTheme } from "next-themes"; // Assuming you're using next-themes for dark/light mode
import { motion } from "framer-motion";
import AnimatedGradientText from "./magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ShineBorder from "@/components/magicui/shine-border";



export default function HeroSection() {
  const { theme } = useTheme();
  const backgroundImages = theme === 'light' || theme === 'girly' ? HERO_IMAGES_LIGHT : HERO_IMAGES_DARK;
  const [background, setBackground] = useState(backgroundImages[0])

  const [color, setColor] = useState("#f3bb6c");
  
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length)
    setBackground(backgroundImages[randomIndex])
  }, [theme])

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${background.url})`, backgroundAttachment: "fixed" }} // Ensuring background stays fixed
      >
        {theme === 'light' && (
          <div className="absolute inset-0 bg-white bg-opacity-20" />
        )}
         {theme === 'dark' && (
          <div className="absolute inset-0 bg-black bg-opacity-30" />
        )}
        <div className={theme === 'light' ? "absolute inset-0 brightness-110" : "absolute inset-0"} />
      </motion.div>

      {/* Particles */}
      <Particles
        className="absolute inset-0 z-10"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />

      {/* Content Grid */}
      <div className="relative z-10 h-full">
        <div className="container mx-auto h-full">
          <div className="grid grid-cols-12 grid-rows-6 gap-4 h-full p-8">
            {/* Heading, Subheading, and Navigation Links */}
            <div className="col-span-12 lg:col-span-8 col-start-1 row-start-2 flex flex-col">
              <motion.h1 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 ${cinzelDecor.className}`}
              >
                Explore, Collect, Create.
              </motion.h1>
              <motion.p 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl mb-6"
              >
                Step into the Mystic Garden and immerse yourself in a world where art thrives in its purest form.
              </motion.p>
              <motion.nav 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex space-x-6 text-lg"
              >
                <Link href={`/explore`} passHref>
                  <ShineBorder color={["#A07CFE", "#FE8FB5", "#FFBE7B"]} className='w-full p-1' borderRadius={0}>
                    <Button variant="default" size="sm" className="w-full transition duration-300 rounded-none">
                      EXPLORE
                    </Button>
                  </ShineBorder>
                </Link>
                <Link href={`/about`} passHref>
                  <Button variant="ghost" className="w-full transition duration-300 rounded-none">
                    ABOUT US
                  </Button>
                </Link>
              </motion.nav>
            </div>

            {/* Artist Information */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="col-span-12 lg:col-span-4 col-start-1 row-start-6 self-end"
            >
              <Link href={background.link} className="text-sm hover:underline transition duration-300">
                Artwork by {background.artist}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}