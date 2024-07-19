import LensIcon from '@/components/LensIcon';
import Link from 'next/link';
import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
            <img
              src="/images/featured-artwork-4.png"
              width="650"
              height="450"
              alt="Gallery Art"
              className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover the Art of the Future
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Welcome to Mystic Garden, a digital haven where art meets technology. Our platform is dedicated to showcasing and auctioning unique 1/1 NFT artworks created by talented artists from around the world. 
                Built on top of <a href="lens.xyz">Lens Protocol</a>, we leverage blockchain technology to provide a secure and seamless experience for artists and collectors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Mission</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              At Mystic Garden, our mission is to foster a thriving community of artists and collectors who share a passion for digital art and blockchain technology. We strive to:

Promote Artistic Expression: Provide a platform for artists to showcase their work and reach a global audience.
Empower Creators: Offer tools and resources that help artists navigate the world of NFTs and digital art.
Enhance Engagement: Create interactive experiences that bring art enthusiasts together and foster meaningful connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore the cutting-edge features that make our NFT gallery stand out.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
            <div className="grid gap-1">
              <h3 className="text-xl font-bold">Exclusive 1/1 Artworks</h3>
              <p className="text-muted-foreground">
              Discover and collect unique digital art pieces that are one-of-a-kind.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-xl font-bold">Decentralized Storage</h3>
              <p className="text-muted-foreground">
                Our digital art is stored on IPFS, a decentralized and immutable storage system, ensuring its longevity
                and integrity.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-xl font-bold">Artist Spotlights</h3>
              <p className="text-muted-foreground">
              Get to know the artists behind the masterpieces through featured interviews and exhibitions.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-xl font-bold">Secure Transactions</h3>
              <p className="text-muted-foreground">
              Enjoy a seamless and secure auction process powered by blockchain technology.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-xl font-bold">Artist Support</h3>
              <p className="text-muted-foreground">
                We support and promote emerging artists in the NFT space, providing them with a platform to showcase
                their work and connect with collectors.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-xl font-bold">Currency</h3>
              <p className="text-muted-foreground">
              Bonsai, a Lens native community token, is used for transactions on the platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powering the NFT Platform</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our NFT gallery is built using the latest technologies and tools to provide a seamless and secure
                experience for our users.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-5 lg:gap-12">
            <div className="flex flex-col items-center justify-center space-y-4">
                <Link href="lens.xyz">
              <LensIcon className="h-12 w-12" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Lens Protocol</h3>
                <p className="text-muted-foreground">The backbone of our decentralized platform.</p>
              </div>
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
            <img src="/images/bonsailogo.svg" className="h-20 w-20" alt="Bonsai" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Bonsai</h3>
                <p className="text-muted-foreground">Lens native community token for transactions.</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              <GraphIcon className="h-12 w-12" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold">The Graph</h3>
                <p className="text-muted-foreground">Indexing and querying blockchain data.</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              <IPFSIcon className="h-12 w-12" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold">IPFS</h3>
                <p className="text-muted-foreground">Decentralized storage for our digital art.</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              <ArweaveIcon className="h-12 w-12" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Arweave</h3>
                <p className="text-muted-foreground">Permanent and scalable data storage.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Built with Love</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Mystic Garden was built entirely open source by me, <a href="https://hey.xyz/u/definn" className="text-primary font-bold">@definn</a>, with much love for the artistic community on Lens.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function GraphIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a7 7 0 1 0 10 10" />
    </svg>
  );
}

function IPFSIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a7 7 0 1 0 10 10" />
    </svg>
  );
}

function ArweaveIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 7.5a1 1 0 1 1-1 1h2" />
      <path d="M9 10h6a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2" />
      <path d="M9 13h6a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2" />
    </svg>
  );
}

export default About;