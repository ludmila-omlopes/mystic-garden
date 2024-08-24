import { fetchData } from '@/lib/apiUtils';
import { getApiEndpoint } from '@/lib/apiEndpoints';
import { Post, Profile } from '@lens-protocol/react-web';
import { LensClient } from "@lens-protocol/client";
import { polygon } from 'viem/chains';
import { AuctionWithPublicationId } from '@/app/types/auction';
import { formatDistance, formatDistanceToNow } from 'date-fns';

export const getAllCreatedPublicationsByCreator = async (profileId: string): Promise<string[]> => {
  try {
    // Fetch Bonsai publications by creator
    const bonsaiUrl = getApiEndpoint('get1editionsBonsaiByCreator');
    const bonsaiResult = await fetchData(bonsaiUrl, { profileId });
    const bonsaiPublicationsList = JSON.parse(bonsaiResult.result).publicationsList as string[];

    // Fetch auction publications by creator
    const auctionsUrl = '/api/getAuctionsByCreator';
    const auctionsResult = await fetchData(auctionsUrl, { profileId });
    const auctionPublicationsList = auctionsResult.data.map((auction: any) => auction.id);

    // Combine both lists
    const combinedPublicationsList = [...bonsaiPublicationsList, ...auctionPublicationsList];

    return combinedPublicationsList;
  } catch (error) {
    console.error('Error fetching publications:', error);
    throw new Error('Failed to fetch publications');
  }
};

export const getAllPublicationIds = async (): Promise<string[]> => {
  try {
    // Fetch 1/1 Bonsai publications
    const url = getApiEndpoint('getAllPublications');
    const result = await fetchData(url);
    const publicationIds = JSON.parse(result.result).publicationsList as string[];

    return publicationIds;
  } catch (error) {
    console.error('Error fetching publications:', error);
    throw new Error('Failed to fetch publications');
  }
};

export const getBuyNowPrice = (post: Post): number => {
  let postPrice: number = 0;

  if (post && post.openActionModules) {
    for (let actionModule of post.openActionModules) {
      if (actionModule.__typename === "SimpleCollectOpenActionSettings" || actionModule.__typename === "MultirecipientFeeCollectOpenActionSettings" && Number(actionModule.amount.value) > 0) {
        postPrice = Math.floor(Number(actionModule.amount.value));
        break;
      }
    }
  }

  return postPrice;
};

export function getSimpleOrMultirecipientFeeCollectOpenActionModule(post: Post) {
  if (post?.openActionModules) {
    for (let actionModule of post.openActionModules) {
      if (
        actionModule.__typename === "SimpleCollectOpenActionSettings" ||
        actionModule.__typename === "MultirecipientFeeCollectOpenActionSettings"
      ) {
        return actionModule;
      }
    }
  }
  return undefined;
}

export function getBuyNowStatus(post: Post): 'available' | 'sold out' | 'sale ended' | 'invalid' {
  if (!post || post.__typename !== 'Post') {
    return 'invalid';
  }

  let isCollected = false;
  let isSaleEnded = false;

  if (post.stats.collects > 0 ) { //todo: caso eu expanda para multieditions, precisa incluir o check de 1/1 aqui.
    isCollected = true;
  }

  if (post.openActionModules) {
    for (let actionModule of post.openActionModules) {
      if (
        actionModule.__typename === "SimpleCollectOpenActionSettings" ||
        actionModule.__typename === "MultirecipientFeeCollectOpenActionSettings"
      ) {
        const endsAt = actionModule.endsAt;
        if (endsAt && new Date(endsAt) < new Date()) {
          isSaleEnded = true;
          break;
        }
      }
    }
  }

  if (isCollected) {
    return 'sold out';
  }
  else if (isSaleEnded) {
    return 'sale ended';
  } else {
    return 'available';
  }
};

export function getAuctionStatusAndTimeLeft (auction: AuctionWithPublicationId) {
  const currentTime = Math.floor(Date.now() / 1000);
  const availableSinceTimestamp = parseInt(auction.availableSinceTimestamp);
  const endTimestamp = parseInt(auction.endTimestamp);
  const startTimestamp = parseInt(auction.startTimestamp);
  const auctionAvailableSince = new Date(availableSinceTimestamp * 1000);
  const auctionStart = new Date(startTimestamp * 1000);
  const auctionEnd = new Date(endTimestamp * 1000);

  let auctionStatus = "Not started";
  let timeLeft = formatDistanceToNow(auctionAvailableSince, { includeSeconds: true });

  if (currentTime >= availableSinceTimestamp) {
    if (parseInt(auction.startTimestamp) === 0) {
      auctionStatus = "Active but not started";
    } else if (currentTime <= endTimestamp) {
      auctionStatus = "Active auction";
      timeLeft = formatDistanceToNow(auctionEnd, { includeSeconds: true });
    } else if (BigInt(auction.winnerProfileId) !== 0n && !auction.collected) {
      auctionStatus = "Auction ended, pending collection";
    } else if (auction.collected) {
      auctionStatus = "Art collected";
    }
  }

  if (auctionStatus === "Not started" && currentTime < availableSinceTimestamp && (availableSinceTimestamp - currentTime) < 86400) {
    timeLeft = formatDistance(currentTime * 1000, auctionStart, { includeSeconds: true });
  }

  return { auctionStatus, timeLeft };
};