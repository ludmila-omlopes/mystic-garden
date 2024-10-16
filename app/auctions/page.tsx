import { getAllAuctions } from "../../lib/auctionUtils";
import ExploreAuctions from "./exploreAuctions";

export default async function ExploreAuctionsPage() {
  // Fetch the initial auctions and nextCursor for pagination
  const { auctions, nextCursor } = await getAllAuctions();

  return (
    <div>
      <ExploreAuctions auctions={auctions} initialCursor={nextCursor} />
    </div>
  );
}
