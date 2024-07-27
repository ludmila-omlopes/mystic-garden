"use client";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Countdown from "react-countdown";
import { MYSTIC_DROP_IMAGES_URLS, MYSTIC_DROP_IDS } from "@/app/constants";
import { cinzelDecor } from "@/app/fonts";
import ShineBorder from "@/components/magicui/shine-border";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";
import { AuctionWithPublicationId } from "@/app/types/auction";
import { formatDistanceToNow, formatDistance } from "date-fns";
import SparklesText from "@/components/magicui/sparkles-text";
import { ClipLoader } from "react-spinners";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import Leaderboard from "@/components/DropLeaderboard";

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span>Auction started!</span>;
  } else {
    return (
      <span>
        {days}d {hours}h {minutes}m {seconds}s left to start
      </span>
    );
  }
};

// Custom renderer for the first countdown
const statusRenderer = ({ days, hours, minutes, seconds, completed }) => {
  const currentDate = new Date();
  const targetDate = new Date(Date.UTC(2024, 6, 20, 14, 0, 0)); // July 20, 2024, at 2pm UTC
  const endDate = new Date(targetDate.getTime() + 2 * 7 * 24 * 60 * 60 * 1000); // 2 weeks after target date

  if (currentDate < targetDate) {
    return <span className="text-yellow-500">Soon</span>;
  } else if (currentDate >= targetDate && currentDate <= endDate) {
    return <span className="text-green-500">Live</span>;
  } else {
    return <span className="text-red-500">Ended</span>;
  }
};

// Custom renderer for the second countdown with styles
const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span className="text-3xl font-bold tracking-tighter text-green-500">Live Now</span>;
  } else {
    return (
      <span className="text-3xl font-bold tracking-tighter">
        {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
      </span>
    );
  }
};

const activeAuctionRenderer = ({ days, hours, minutes, seconds }) => {
  if (days > 0) {
    return (
      <AnimatedGradientText className="font-bold">
        <span className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#4b0082] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}>
          {days}d {hours}h left
        </span>
      </AnimatedGradientText>
    );
  } else if (hours > 0) {
    return (
      <span>
        {hours}h {minutes}m left
      </span>
    );
  } else {
    return (
      <span>
        {minutes}m {seconds}s left
      </span>
    );
  }
};

const formatBonsaiValue = (value) => {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toString();
};

export default function Component() {
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [auctionsData, setAuctionsData] = useState<AuctionWithPublicationId[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const targetDate = new Date(Date.UTC(2024, 6, 20, 14, 0, 0)); // July 20, 2024, at 2pm UTC
    const currentDate = new Date();
    const timeDiff = targetDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    setDaysRemaining(daysRemaining);

    const fetchAuctions = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await fetch(`/api/getAuctionsByIds?publicationIds=${MYSTIC_DROP_IDS.join(",")}`);
        const data = await response.json();

        setAuctionsData(data.data);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchAuctions();
  }, []);

  const getAuctionStatusAndTimeLeft = (auction: AuctionWithPublicationId) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const availableSinceTimestamp = parseInt(auction.availableSinceTimestamp);
    const endTimestamp = parseInt(auction.endTimestamp);
    const startTimestamp = parseInt(auction.startTimestamp);
    const auctionAvailableSince = new Date(availableSinceTimestamp * 1000);
    const auctionStart = new Date(startTimestamp * 1000);
    const auctionEnd = new Date(endTimestamp * 1000);

    let auctionStatus = "Not started";
    let timeLeft = formatDistanceToNow(auctionAvailableSince, { includeSeconds: true });

    if (currentTime >= availableSinceTimestamp) {
      if (parseInt(auction.startTimestamp) === 0) {
        auctionStatus = "Active but not started";
      } else if (currentTime <= endTimestamp) {
        auctionStatus = "Active auction";
        timeLeft = formatDistanceToNow(auctionEnd, { includeSeconds: true });
      } else if (BigInt(auction.winnerProfileId) !== 0n && !auction.collected) {
        auctionStatus = "Auction ended, pending collection";
      } else if (auction.collected) {
        auctionStatus = "Art collected";
      }
    }

    if (auctionStatus === "Not started" && currentTime < availableSinceTimestamp && (availableSinceTimestamp - currentTime) < 86400) {
      timeLeft = formatDistance(currentTime * 1000, auctionStart, { includeSeconds: true });
    }

    return { auctionStatus, timeLeft };
  };

  const scrollToArtworks = () => {
    const artworksSection = document.getElementById("artworks");
    if (artworksSection) {
      artworksSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background mt-20">
      <section className="container mx-auto flex flex-col items-start justify-between gap-8 px-4 py-12 md:flex-row md:py-24 lg:py-32">
        <div className="space-y-4">
          <h1 className={`text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl ${cinzelDecor.className}`}>Mystic Drop</h1>
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
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-xl m-4 italic">
            Discover an enchanting collection of 13 unique artworks that blur the lines between reality and imagination.
          </p>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-xl m-4 italic">
            Join me in celebrating the true Lens creative landscape and immerse yourself in the magic of the Mystic Garden. - @definn
          </p>

          <button
            onClick={scrollToArtworks}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            View Artworks
          </button>
        </div>
        <Carousel className="w-full max-w-md" opts={{ loop: true }} autoplay={true} autoplayInterval={3000}>
          <CarouselContent>
            {MYSTIC_DROP_IMAGES_URLS.map((url, index) => (
              <CarouselItem key={index}>
                <div className="aspect-w-16 aspect-h-14">
                  <img
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
      <Separator className="my-8" />
      <section>
       { /*<Leaderboard /> */}
      </section>
      <Separator className="my-8" />
      <section className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-3xl font-bold tracking-tighter">Exploring the Mystic Garden</h2>
          <p className="mb-8 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
            Welcome to the Mystic Drop, the genesis curated drop of Mystic Garden.
            This drop marks the debut of our platform, featuring 13 artists carefully chosen to create pieces that embody the Mystic theme. As you scroll through the displayed artworks, remember that each piece is crafted by OG Lens creators. This collection is a homage to the Lens creative community, so keep an open mind and let the stories unfold before you.
          </p>
          <p className="mb-8 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
            What is art? Art can serve many functions—it can evoke emotions, set the mood, and tell a story. Here, you’ll witness the story of Decentralized Social being told through diverse artistic expressions.
            From classical music to vibrant illustrations, these artists have been my companions since my early days on Lens. They are pushing the boundaries of on-chain art and, in doing so, are carving their stories into the blockchain.
          </p>
          <p className="mb-8 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
            This is art. This is history.
            Are you ready to be enchanted?
          </p>
          <p className="mb-8 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
            Love, definn.
          </p>
        </div>
      </section>
      <Separator className="my-8" />
      <section id="artworks" className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
        {loading ? ( // Show spinner while loading
          <div className="flex justify-center items-center min-h-[300px]">
            <ClipLoader size={50} color={"#A07CFE"} loading={loading} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {auctionsData.map((auction) => {
              const { auctionStatus, timeLeft } = getAuctionStatusAndTimeLeft(auction);
              const isVideo = !!auction.metadata.asset.video?.optimized?.uri;
              const hasCover = !!auction.metadata.asset.cover?.optimized?.uri;
              const isAudio = !!auction.metadata.asset.audio?.optimized?.uri;
              const imageUrl = auction.metadata.asset.image?.optimized?.uri ||
                auction.metadata.asset.cover?.optimized?.uri ||
                auction.metadata.asset.video?.optimized?.uri ||
                auction.metadata.asset.audio?.optimized?.uri ||
                "/no-image-available.jpg";

                return (
                  <div key={auction.id} className="bg-background rounded-lg overflow-hidden shadow-lg">
                    <div className="flex items-center mb-2 p-4">
                      <Avatar className="w-6 h-6 mr-2">
                        <AvatarImage src={auction.by.metadata?.picture?.optimized?.uri || "/placeholder-user.jpg"} />
                        <AvatarFallback>{auction.by.handle.localName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="text-s font-medium">{auction.by.handle.localName || auction.by.handle.suggestedFormatted.localName}</div>
                      {auctionStatus === "Active auction" && (
                        <span className="ml-auto inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-800"><SparklesText className="text-sm" sparklesCount={3} colors={{ first: '#daa520', second: '#72016f' }} text="Auction Live" /></span>
                      )}
                    </div>
                    <Link href={`/gallery/${auction.id}`} passHref>
                      <div className="relative cursor-pointer">
                        {hasCover ? (
                          <>
                            <img src={auction?.metadata?.asset?.cover?.optimized?.uri} alt={auction.metadata.title} className="w-full h-96 object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-t-lg">
                              <FaPlay className="text-white text-4xl" />
                            </div>
                          </>
                        ) : (
                          isVideo ? (
                            <video src={auction?.metadata?.asset?.video?.optimized?.uri} controls className="w-full h-96 object-cover"></video>
                          ) : (
                            <img src={imageUrl} alt={auction.metadata.title} className="w-full h-96 object-cover" />
                          )
                        )}
                      </div>
                    </Link>
                    <div className="p-4">
                      <div className="text-lg font-bold mb-2">{auction.metadata.title}</div>
                      <hr className="my-2" />
                      <div className="flex justify-between items-center mb-4">
                        {auctionStatus === "Active auction" ? (
                          <>
                            <div>
                              <div className="text-xs text-muted-foreground">Highest Bid</div>
                              <div className="text-base font-bold">{formatBonsaiValue(auction.winningBid / 1e18)} BONSAI</div>
                            </div>
                            <Countdown date={new Date(parseInt(auction.endTimestamp) * 1000)} renderer={activeAuctionRenderer} />
                          </>
                        ) : (
                          <div>
                            <div className="text-xs text-muted-foreground">Reserve Price</div>
                            <div className="text-base font-bold">{formatBonsaiValue(auction.reservePrice / 1e18)} BONSAI</div>
                          </div>
                        )}
                      </div>
                      {auctionStatus === "Active auction" || auctionStatus === "Active but not started" ? (
                        <div className="flex gap-2">
                          <Link href={`/gallery/${auction.id}`} passHref>
                            <ShineBorder color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
                              <Button variant="default" size="sm" className="w-full">
                                Place Bid
                              </Button>
                            </ShineBorder>
                          </Link>
                          <Link href={`/gallery/${auction.id}`} passHref className="w-full">
                            <Button variant="outline" size="sm" className="w-full">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      ) : auctionStatus === "Not started" ? (
                        <div className="flex gap-2">
                          <Button variant="default" size="sm" className="w-full" disabled>
                            <Countdown date={new Date(parseInt(auction.availableSinceTimestamp) * 1000)} renderer={renderer} />
                          </Button>
                          <Link href={`/gallery/${auction.id}`} passHref className="w-full">
                            <Button variant="outline" size="sm" className="w-full">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button variant="default" size="sm" className="w-full" disabled>
                            Sold Out
                          </Button>
                          <Link href={`/gallery/${auction.id}`} passHref className="w-full">
                            <Button variant="outline" size="sm" className="w-full">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    );
  }