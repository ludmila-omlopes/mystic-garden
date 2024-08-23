import { getPostSellType } from '@/lib/utils';
import { AuctionCard } from './AuctionCard';
import { BuyNowCard } from './BuyNowCard';

export default function GalleryPost({ publication }) {
  const isAuction = getPostSellType(publication) === 'auction';

  return (
    <>
      {isAuction ? (
        <AuctionCard publication={publication} />
      ) : (
        <BuyNowCard publication={publication} />
      )}
    </>
  );
}
