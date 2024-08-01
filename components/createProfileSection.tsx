import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProfileSelectDialog from "./ProfileSelectDialog";
import LensIcon from "./LensIcon";

export default function HomepageCallToAction() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <LensIcon className="h-24 w-24 mb-4" />
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              You don&apos;t have a Lens profile yet?
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Mystic Garden is built on top of Lens Protocol. We can guide you on how to create a new profile and join our amazing community!
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <Link href="/profile/mint">
              <Button size="lg" className="w-full">
                Create New Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
