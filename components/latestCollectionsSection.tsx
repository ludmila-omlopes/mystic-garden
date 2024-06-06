'use client';

import Link from "next/link";

export default function LatestCollectionsSection() {
  const collections = [
    { title: "Collection 1", imageUrl: "/images/garden2.jpg" },
    { title: "Collection 2", imageUrl: "/images/garden2.jpg" },
    { title: "Collection 3", imageUrl: "/images/garden2.jpg" },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
      <div className="mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Latest Collections</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={collection.imageUrl} alt={collection.title} className="w-full h-64 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-medium text-gray-900">{collection.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
