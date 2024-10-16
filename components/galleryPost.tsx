import { getPostSellType } from '@/lib/utils';
import { AuctionCard } from './AuctionCard';
import { BuyNowCard } from './BuyNowCard';
import AuctionCard2 from './AuctionCard2';

export default function GalleryPost({ publication }) {
  const isAuction = getPostSellType(publication) === 'auction';

  return (
    <>
      {isAuction ? (
        <AuctionCard2 auction={publication} />
      ) : (
        <BuyNowCard publication={publication} />
      )}
    </>
  );
}
