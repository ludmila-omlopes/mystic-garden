'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function Component() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Upcoming Events</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          <div className="bg-white overflow-hidden shadow-md dark:bg-gray-950 relative">
            <Link href="#" prefetch={false}>
              <img src="/placeholder.svg" alt="Event 1" width={600} height={400} className="w-full h-48 object-cover" />
              <div className="p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-2">Tech Conference 2023</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">15 JUN - 25 JUN</p>
              </div>
            </Link>
            <div className="absolute top-4 right-4">
              <Badge variant="secondary">AUCTION</Badge>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow-md dark:bg-gray-950 relative">
            <Link href="#" prefetch={false}>
              <img src="/placeholder.svg" alt="Event 2" width={600} height={400} className="w-full h-48 object-cover" />
              <div className="p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-2">Design Workshop</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">10 JUL - 15 JUL</p>
              </div>
            </Link>
            <div className="absolute top-4 right-4">
              <Badge variant="secondary">PODCAST</Badge>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow-md dark:bg-gray-950 relative">
            <Link href="#" prefetch={false}>
              <img src="/placeholder.svg" alt="Event 3" width={600} height={400} className="w-full h-48 object-cover" />
              <div className="p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-2">Marketing Summit</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">05 AUG - 10 AUG</p>
              </div>
            </Link>
            <div className="absolute top-4 right-4">
              <Badge variant="secondary">AUCTION</Badge>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow-md dark:bg-gray-950 relative">
            <Link href="#" prefetch={false}>
              <img src="/placeholder.svg" alt="Event 4" width={600} height={400} className="w-full h-48 object-cover" />
              <div className="p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-2">Startup Pitch Competition</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">20 SEP - 25 SEP</p>
              </div>
            </Link>
            <div className="absolute top-4 right-4">
              <Badge variant="secondary">PODCAST</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}