'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getBountyPointsByWallet } from "@/lib/pointsSystem";

export default function Component() {
  const [points, setPoints] = useState(0);
  const { address, isConnected } = useAccount();

  const scrollToSubmitContent = () => {
    const submitContentSection = document.getElementById("submit-content-section");
    if (submitContentSection) {
      submitContentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    async function fetchPoints() {
      var points = 0;
      if (isConnected && address) {
        points = await getBountyPointsByWallet(address);
      }
      setPoints(points);
    }
    fetchPoints();
  }, [isConnected, address]);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Mystic Drop Bounty Campaign
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Earn BONSAI tokens by creating engaging content about the Mystic Drop. Submit your work for evaluation and accumulate points!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button variant="default" size="lg" onClick={scrollToSubmitContent}>
                    Submit Your Content
                  </Button>

                    <w3m-button />
                </div>
                {isConnected && (
                  <div className="flex flex-col gap-2 mt-4">
                    <h2 className="text-xl font-bold">Your current BONSAI points balance:</h2>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/images/mystic-ico.svg" />
                        <AvatarFallback>{address?.split('', 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-muted-foreground">{address}</p>
                        <p className="text-sm font-medium leading-none">{points.toLocaleString()} BONSAI</p>
                      </div>
                    </div>
                    <div className="mt-8">
                        The next BONSAI distribution will be on July 28th.
                    </div>
                  </div>
                )}
              </div>
              <img
                src="\images\background-image.webp"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section id="submit-content-section" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Campaign Rules</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  To participate in the bounty campaign, you need to create interesting videos, images, or threads talking about the Mystic Drop and featuring the artists.
                </p>
              </div>
              <Link href={"https://app.deform.cc/form/a5453d78-d7d5-485a-b025-833e1fb00ac9" } target="_blank" >
                <Button variant="default" size="lg" >
                    Submit your content
                </Button>
              </Link>
              <div className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We are looking for:
                <ul className="list-disc list-inside text-left">
                  <li>Creative videos explaining how to bid</li>
                  <li>Content explaining the interesting aspects of curated art on a decentralized protocol</li>
                  <li>Content about each art and the artists, and their current role in the Lens ecosystem</li>
                  <li>Engaging threads or articles featuring the artists and their work</li>
                </ul>
                <div className="m-4"> Each submission will be evaluated by the Mystic Garden team.</div>
              </div>            
            </div>
            { /*
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Social Media</h3>
                <p className="text-muted-foreground">
                  Share our campaign on social media and earn points for each share.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Content Creation</h3>
                <p className="text-muted-foreground">
                  Create content about our NFTs and earn points for each approved submission.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Referrals</h3>
                <p className="text-muted-foreground">
                  Invite your friends to join the campaign and earn points for each successful referral.
                </p>
              </div>
            </div>
           */ }
          </div>
        </section>
      </main>
    </div>
  );
}

function BitcoinIcon(props) {
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
      <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
    </svg>
  );
}

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
