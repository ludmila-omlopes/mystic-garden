'use client';

import Link from "next/link";

export default function HighlightSection() {
  const image1url = "/images/garden2.jpg";
  const image2url = "/images/garden2.jpg";
  const image3url = "/images/garden2.jpg";

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-3 lg:gap-10">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Explore our Artistic Wonders</h2>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Discover a world of creativity and inspiration through our curated collection of art pieces.
          </p>
          <Link
            className="inline-flex h-10 items-center justify-center bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="#"
          >
            Explore Now
          </Link>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div className="col-span-2 lg:col-span-1 lg:row-span-2">
            <div className="relative w-full h-full overflow-hidden max-h-[700px] lg:max-w-[650px] max-w-none">
              <img
                alt="Art Piece 1"
                className="w-full h-full object-cover object-center"
                src={image1url}
              />
            </div>
          </div>
          <div className="relative w-full h-full overflow-hidden max-h-[300px] max-w-[450px]">
            <img
              alt="Art Piece 2"
              className="w-full h-full object-cover object-center"
              src={image2url}
            />
          </div>
          <div className="relative w-full h-full overflow-hidden max-h-[300px] max-w-[450px]">
            <img
              alt="Art Piece 3"
              className="w-full h-full object-cover object-center"
              src={image3url}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
