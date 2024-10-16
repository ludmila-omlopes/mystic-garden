import { fetchData } from '@/lib/apiUtils';
import { getApiEndpoint } from '@/lib/apiEndpoints';
import { Post, Profile, ProfileId } from '@lens-protocol/react-web';
import { LensClient } from "@lens-protocol/client";
import { polygon } from 'viem/chains';
import { AuctionWithPublicationId } from '@/app/types/auction';
import { formatDistance, formatDistanceToNow } from 'date-fns';
import { execute, GetCollectedAuctionsByProfileDocument } from '@/.graphclient';
import { getPublicationsActedBy, getPublicationsByIds } from "@/app/api/lensGraphql";
import { AUCTION_OPEN_ACTION_MODULE_ADDRESS, BONSAI_ADDRESS, VERIFIED_ARTIST_PROFILE_IDS } from '@/app/constants';
import { getAdditionalAuctionData, getAuctionsByCreator } from './auctionUtils';
import { convertProfileIdToHex, parseFromLensHex } from './utils';

export const getTotalNumberAndAmountCollectedByProfile = async (profileId: string): Promise<Number[]> => {
  try {
    // Fetch Buy Now quantities
    const url = getApiEndpoint('list1on1CollectedByProfile'); 
    const result = await fetchData(url, { profileId });

    // Parse the result and set default values in case no data is available
    const list = result?.result ? JSON.parse(result.result) : {};
    const totalPublicationsBought = (list.total_publications_bought && list.total_publications_bought[0]) ? list.total_publications_bought[0] : 0 ;
    const totalBuyNowAmount = (list.total_amount_spent && list.total_amount_spent[0]) ? list.total_amount_spent[0] : 0;

    // Fetch auction quantities
    const collectedAuctionsResult = await execute(GetCollectedAuctionsByProfileDocument, { profileId: String(BigInt(profileId)) });
    const collectedAuctions = collectedAuctionsResult?.data?.collecteds || [];
    const totalAuctions = collectedAuctions.length;
    const totalAuctionsAmount = 0; // TODO


    // Calculate totals
    const totalCollected = Number(totalAuctions) + Number(totalPublicationsBought);
    const totalAmount = Number(totalBuyNowAmount) + Number(totalAuctionsAmount);

    return [totalCollected, totalAmount];

  } catch (error) {
    console.error(`Error fetching total number and amount collected for profile ${profileId}: `, error);
    // Return 0 for both values in case of an error
    return [0, 0];
  }
};


export const getAllCreatedPublicationsByCreator = async (profileId: string): Promise<string[]> => {
  try {
    // Fetch Bonsai publications by creator
    const bonsaiUrl = getApiEndpoint('get1editionsBonsaiByCreator');
    const bonsaiResult = await fetchData(bonsaiUrl, { profileId });
    const bonsaiPublicationsList = JSON.parse(bonsaiResult.result).publicationsList as string[];

    // Fetch auction publications by creator
    const { data: auctionsData } = await getAuctionsByCreator(profileId);
    const auctionPublicationsList = auctionsData.map((auction: any) => auction.id);

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

export const getBuyNowIds = async (): Promise<string[]> => {
  try {
    // Fetch 1/1 Bonsai publications
    const url = getApiEndpoint('get1editionsBonsai');
    const result = await fetchData(url);
    const publicationIds = JSON.parse(result.result).publicationsList as string[];

    return publicationIds;
  } catch (error) {
    console.error('Error fetching get1editionsBonsai:', error);
    throw new Error('Failed to fetch get1editionsBonsai');
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

  if (post && post.stats && post.stats.collects > 0 ) { //todo: caso eu expanda para multieditions, precisa incluir o check de 1/1 aqui.
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

export async function getPublications(publicationIds: string[], verified: boolean, nextCursor: number = 0) {
  // Step 1: Filter IDs if verified is true
  if (verified) {
    publicationIds = publicationIds.filter((id) => {
      const profileId = id.split('-')[0];
      return VERIFIED_ARTIST_PROFILE_IDS.includes(profileId);
    });
  }

  // Step 2: If no IDs left, return an empty array and no pagination info
  if (publicationIds.length === 0) {
    return { publications: [], nextCursor: null };
  }

  // Step 3: Take the next 40 IDs based on the cursor
  const idsToFetch = publicationIds.slice(nextCursor, nextCursor + 40);

  // Step 4: If no more IDs to fetch, return an empty array
  if (idsToFetch.length === 0) {
    return { publications: [], nextCursor: null };
  }

  // Step 5: Fetch publications for those 40 IDs
  const publications = await getPublicationsByIds(idsToFetch);

  // Step 6: Order the fetched publications by "created at" descending
  const orderedPublications = publications.publications.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Step 7: Determine if there are more IDs left to fetch
  const newCursor = nextCursor + 40 < publicationIds.length ? nextCursor + 40 : null;

  // Step 8: Return the ordered publications and pagination info
  return {
    publications: orderedPublications,
    nextCursor: newCursor,  // Use the new cursor for fetching the next batch
  };
}



export async function getCollectedPublicationsByProfile(profileId: string, cursorNextParam: string | null = null) {
  try {
    if (!profileId) {
      throw new Error("No profileId provided.");
    }

    let cursorNext = cursorNextParam || null;
    let cursorPrev = null;
    let filteredPublications: Post[] = [];
    const bonsaiAddress = BONSAI_ADDRESS;
    const uniqueIds = new Set<string>(); // Set to store unique publication IDs

    do {
      const publications = await getPublicationsActedBy(profileId as ProfileId, cursorNext);

      if (!publications?.publications?.items) {
        break;
      }

      const newFilteredPublications = await Promise.all(
        publications.publications.items
          .filter((publication) => {
            // Filter for 1/1 collect or auction publications
            return publication.openActionModules.some((module) => {
              const isOneOfOne =
                module.collectLimit === "1" && 
                module.amount?.asset?.contract?.address === bonsaiAddress;
              const isAuction =
                module.__typename === "UnknownOpenActionModuleSettings" &&
                module.contract?.address === AUCTION_OPEN_ACTION_MODULE_ADDRESS;
              return isOneOfOne || isAuction;
            });
          })
          .map(async (publication) => {
            if (uniqueIds.has(publication.id)) {
              return null; // Skip duplicates
            }
            uniqueIds.add(publication.id); // Mark as seen

            // If the publication is an auction, fetch additional auction data
            if (
              publication.openActionModules.some(
                (module) => module.contract?.address === AUCTION_OPEN_ACTION_MODULE_ADDRESS
              )
            ) {
              const { profileId: intProfileId, publicationId: intPublicationId } = parseFromLensHex(publication.id);
              const auctionData = await getAdditionalAuctionData(intProfileId, intPublicationId);

              if (convertProfileIdToHex(String(auctionData?.winnerProfileId)) !== profileId) {
                return null;
              }

              return {
                ...publication,
                auctionData,
                stats: {
                  ...publication.stats,
                  collects: 1,
                },
              };
            }

            return {
              ...publication,
              stats: {
                ...publication.stats,
                collects: 1,
              },
            };
          })
      );

      filteredPublications = [
        ...filteredPublications,
        ...newFilteredPublications.filter((publication) => publication !== null),
      ];

      cursorNext = publications.publications.pageInfo.next;
      cursorPrev = publications.publications.pageInfo.prev;
    } while (filteredPublications.length < 12 && cursorNext);

    return { publications: filteredPublications, cursorNext, cursorPrev };
  } catch (error) {
    console.error("Error fetching publications:", error);
    throw new Error("Failed to fetch publications.");
  }
}