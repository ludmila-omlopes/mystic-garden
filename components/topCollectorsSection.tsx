import { execute } from '../.graphclient';
import { ExploreSoldAuctionsDocument, ExploreBidsFromAuctionsDocument } from '../.graphclient';
import { cn, convertProfileIdToHex } from "@/lib/utils";
import TopCollectorsClient from './topCollectorsClient';
import { getApiEndpoint } from '@/lib/apiEndpoints';
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import Particles from './magicui/particles';

type Collector = {
    name: string;
    id: string;
    totalValue: number;
    collectedCount: number;
    avatarUrl?: string;
    handle?: string;
};

export default async function TopCollectors() {
  const collectors = await fetchCollectors(); // fetch collectors list from The Graph
  
  return (
    <section className="py-12 bg-gradient-to-br from-indigo-100 to-fuchsia-100 dark:from-indigo-950  dark:to-fuchsia-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-5xl font-bold text-center mb-8">Top Collectors</h2>
        <Particles
        className="absolute y-100 inset-x-0 z-0"
        quantity={100}
        ease={80}
        color={'#f3bb6c'}
        refresh
      />
        {<TopCollectorsClient collectorsList={collectors} />}
      </div>
    </section>
  );
}

// Auction data logic
async function fetchAuctionCollectors() {
  const soldAuctionsResult = await execute(ExploreSoldAuctionsDocument, {});
  const soldAuctions = soldAuctionsResult.data.collecteds;

  const profileIds = soldAuctions.map(auction => auction.collectedProfileId);
  const pubIds = soldAuctions.map(auction => auction.collectedPubId);
  const collectorProfileIds = soldAuctions.map(auction => auction.collectorProfileId);

  const bidsResult = await execute(ExploreBidsFromAuctionsDocument, { profileIds, pubIds, bidderProfileId: collectorProfileIds });
  const bids = bidsResult.data.bidPlaceds;

  const collectorsMap = new Map<string, { totalValue: number, collectedCount: number }>();

  soldAuctions.forEach(auction => {
    const auctionBids = bids.filter(bid => bid.pubId === auction.collectedPubId && bid.profileId === auction.collectedProfileId && bid.bidderProfileId === auction.collectorProfileId);
    const finalBid = auctionBids.reduce((highest, bid) => parseFloat(bid.amount) > parseFloat(highest.amount) ? bid : highest, auctionBids[0]);

    if (finalBid) {
      const collectorIdHex = convertProfileIdToHex(auction.collectorProfileId);
      const bidAmount = parseFloat(finalBid.amount);

      if (!collectorsMap.has(collectorIdHex)) {
        collectorsMap.set(collectorIdHex, { totalValue: 0, collectedCount: 0 });
      }

      const collectorData = collectorsMap.get(collectorIdHex);
      if (collectorData) {
        collectorData.totalValue += bidAmount;
        collectorData.collectedCount += 1;
      }
    }
  });

  return collectorsMap;
}

// listTotal1on1Collected API logic
async function fetchListTotal1on1Collected() {
  const url = getApiEndpoint('listTotal1on1Collected');
  return await fetch(url)
    .then(response => response.json())
    .then(data => JSON.parse(data.result))
    .catch(error => {
      console.error("listTotal1on1Collected error", error);
      return null;
    });
}

// Merge the data
async function fetchCollectors() {
        // Execute both fetch operations in parallel
        const [collectorsMap, listTotal1on1CollectedData] = await Promise.all([
          fetchAuctionCollectors(),
          fetchListTotal1on1Collected(),
        ]);

        // Merge data from listTotal1on1Collected API
        if (listTotal1on1CollectedData && listTotal1on1CollectedData.buyer_profile_id) {
            const apiCollectorIds: string[] = Object.values(listTotal1on1CollectedData.buyer_profile_id) as string[];
            const apiTotalPublicationsBought: number[] = Object.values(listTotal1on1CollectedData.total_publications_bought) as number[];
            const apiTotalAmountSpent: number[] = Object.values(listTotal1on1CollectedData.total_amount_spent) as number[];
          
            apiCollectorIds.forEach((id: string, index: number) => {
              if (!collectorsMap.has(id)) {
                collectorsMap.set(id, { totalValue: 0, collectedCount: 0 });
              }
          
              const collectorData = collectorsMap.get(id);
              if (collectorData) {
                collectorData.totalValue += (apiTotalAmountSpent[index] * 1e18);
                collectorData.collectedCount += apiTotalPublicationsBought[index];
              }
            });
          }
          
        // Convert the collectors map to a sorted list
        const collectorsList = Array.from(collectorsMap.entries()).map(([id, data]) => ({
          id: id,
          totalValue: data.totalValue / 1e18, // Convert from wei to BONSAI
          collectedCount: data.collectedCount,
        })) as Collector[];
      
        collectorsList.sort((a, b) => b.totalValue - a.totalValue);
      
        return collectorsList.slice(0, 10);
      }
      
