"use client"

import { useState, useEffect } from "react"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Countdown from 'react-countdown'
import { MYSTIC_DROP_IMAGES_URLS } from "@/app/constants"
import { cinzelDecor } from "@/app/fonts"
import ShineBorder from "@/components/magicui/shine-border"

// Custom renderer for the first countdown
const statusRenderer = ({ days, hours, minutes, seconds, completed }) => {
  const currentDate = new Date()
  const targetDate = new Date(Date.UTC(2024, 6, 20, 14, 0, 0)) // July 20, 2024, at 2pm UTC
  const endDate = new Date(targetDate.getTime() + 2 * 7 * 24 * 60 * 60 * 1000) // 2 weeks after target date

  if (currentDate < targetDate) {
    return <span className="text-yellow-500">Soon</span>
  } else if (currentDate >= targetDate && currentDate <= endDate) {
    return <span className="text-green-500">Live</span>
  } else {
    return <span className="text-red-500">Ended</span>
  }
}

// Custom renderer for the second countdown with styles
const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span className="text-3xl font-bold tracking-tighter text-green-500">Live Now</span>
  } else {
    return (
      <span className="text-3xl font-bold tracking-tighter">
        {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
      </span>
    )
  }
}

export default function Component() {
  const [daysRemaining, setDaysRemaining] = useState(0)
  
  useEffect(() => {
    const targetDate = new Date(Date.UTC(2024, 6, 20, 14, 0, 0)) // July 20, 2024, at 2pm UTC
    const currentDate = new Date()
    const timeDiff = targetDate.getTime() - currentDate.getTime()
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
    setDaysRemaining(daysRemaining)
  }, [])

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <section className="container mx-auto flex flex-col items-start justify-between gap-8 px-4 py-12 md:flex-row md:py-24 lg:py-32">
        <div className="space-y-4">
          <h1 className={`text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl ${cinzelDecor.className}`}>MyStic DRop</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>13 Artworks</span>
            <Separator orientation="vertical" className="h-4" />
            <Countdown date={new Date(Date.UTC(2024, 6, 20, 14, 0, 0))} renderer={statusRenderer} />
            <Separator orientation="vertical" className="h-4" />
            <span>For 2 Weeks</span>
          </div>
          <div className="flex flex-col items-start gap-2">
            <Countdown date={new Date(Date.UTC(2024, 6, 20, 14, 0, 0))} renderer={countdownRenderer} className="text-3xl font-bold tracking-tighter" />
          </div>
          <ShineBorder color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
          <p className="mt-4 text-lg text-gray-300 max-w-xl m-4 italic">
            Discover an enchanting collection of 13 unique artworks that blur the lines between reality and imagination. 
            Join us in celebrating this extraordinary exhibition and immerse yourself in the magic of the Mystic Drop. - @definn
          </p>
          </ShineBorder>
          <Link
            href="/auctions"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            View Artworks
          </Link>
        </div>
        <Carousel className="w-full max-w-md" opts={{ loop: true }} autoplay={true} autoplayInterval={3000}>
          <CarouselContent>
            {MYSTIC_DROP_IMAGES_URLS.map((url, index) => (
              <CarouselItem key={index}>
                <img
                  src={url}
                  width={448}
                  height={252}
                  alt={`Image ${index + 1}`}
                  className="aspect-video object-cover rounded-md"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <Separator className="my-8" />
      <section className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-3xl font-bold tracking-tighter">Exploring the Mystic Realm</h2>
          <p className="mb-8 max-w-2xl text-lg text-gray-300">
            Welcome to the Mystic Drop, an extraordinary NFT gallery exhibition that invites you to embark on a
            captivating journey through the realms of the unknown. Curated by renowned digital artists, this showcase
            features a mesmerizing collection of 100 unique artworks that blend the boundaries between the physical and
            the ethereal.
          </p>
          <p className="mb-8 max-w-2xl text-lg text-gray-300">
            Each piece in the Mystic Drop is a window into a world of enchantment, where the lines between reality and
            imagination blur. Immerse yourself in the intricate details and ethereal compositions, as you uncover the
            hidden narratives that lie beneath the surface.
          </p>
          <p className="mb-8 max-w-2xl text-lg text-gray-300">
            Prepare to be transported to a realm where the mystical and the digital converge, where the boundaries of
            art and technology are pushed to their limits. Witness the convergence of the physical and the virtual, as
            the Mystic Drop challenges the very foundations of what we consider art.
          </p>
        </div>
      </section>
      <section id="artworks" className="container mx-auto px-4 py-12 md:py-24 lg:py-32" />
    </div>
  )
}
