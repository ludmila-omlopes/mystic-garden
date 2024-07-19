import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import MysticIcon from "./mysticIcon"
import LensIcon from "./LensIcon"

export default function Footer() {
  return (
    <footer className="w-full bg-background py-12">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MysticIcon className="h-8 w-8" />
            <span className="text-xl font-bold text-foreground">Mystic Garden</span>
          </div>
          <p className="text-sm text-muted-foreground">Discover and collect exclusive arts from Lens artists.</p>
          <div className="flex gap-4">
            <Link href="https://x.com/mysticgardenxyz" className="text-muted-foreground hover:text-primary" prefetch={false}>
              <TwitterIcon className="h-5 w-5" />
            </Link>
            <Link href="https://hey.xyz/u/mysticgarden" className="text-muted-foreground hover:text-primary" prefetch={false}>
              <LensIcon className="w-6 h-6 text-gray-400 dark:text-white hover:text-primary" />
            </Link>
          </div>
        </div>
        <div className="grid gap-2">
          <h3 className="text-sm font-semibold text-foreground">Platform</h3>
          <Link href="/about" className="text-sm text-muted-foreground hover:text-primary" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary" prefetch={false}>
            FAQ
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-primary" prefetch={false}>
            Submit for Verification
          </Link>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Join Our Newsletter</h3>
          <p className="text-sm text-muted-foreground">Get the latest updates on new NFT drops and exclusive offers.</p>
          <form className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-md bg-transparent px-3 py-2 text-sm text-foreground ring-1 ring-input focus-visible:ring-2 focus-visible:ring-primary"
            />
            <Button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <div className="container mx-auto mt-8 border-t border-border pt-4 text-center text-sm text-muted-foreground">
        &copy; 2024 Mystic Garden. All rights reserved.
        <div className="mt-2">
          Built with <span className="text-red-500">&hearts;</span> by 
          <Link href="https://hey.xyz/u/definn" className="ml-1 text-muted-foreground hover:text-primary" prefetch={false}>
            @definn
          </Link>
        </div>
      </div>
    </footer>
  )
}

function TwitterIcon(props) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
