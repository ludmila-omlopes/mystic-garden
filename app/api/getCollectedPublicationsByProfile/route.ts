import { NextRequest, NextResponse } from "next/server";
import { getPublicationsActedBy } from "../lensGraphql";
import { ProfileId } from "@lens-protocol/metadata";
import { AUCTION_OPEN_ACTION_MODULE_ADDRESS, BONSAI_ADDRESS } from "@/app/constants";
import { Post } from "@lens-protocol/react-web";
import { getAdditionalAuctionData } from "@/lib/auctions";
import { convertProfileIdToHex } from "@/lib/utils";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const profileId = url.searchParams.get('profileId');

        if (!profileId) {
            return NextResponse.json({ message: 'No profileId provided.' }, { status: 400 });
        }

        let cursorNext = null;
        let cursorPrev = null;
        let filteredPublications: Post[] = [];
        const bonsaiAddress = BONSAI_ADDRESS;
        const uniqueIds = new Set<string>();  // Set to store unique publication IDs

        do {
            const publications = await getPublicationsActedBy(profileId as ProfileId, cursorNext);

            if (!publications?.publications?.items) {
                break;
            }

            const newFilteredPublications = await Promise.all(
                publications.publications.items.filter(publication => {
                    return publication.openActionModules.some(module => {
                        const isOneOfOne = module.collectLimit === "1" && module.amount?.asset?.contract?.address === bonsaiAddress;
                        const isAuction = module.__typename === 'UnknownOpenActionModuleSettings' && module.contract?.address === AUCTION_OPEN_ACTION_MODULE_ADDRESS;
                        return isOneOfOne || isAuction;
                    });
                }).map(async (publication) => {
                    if (uniqueIds.has(publication.id)) {
                        return null;  // Skip duplicates
                    }
                    uniqueIds.add(publication.id);  // Mark as seen

                    // If the publication is an auction, fetch additional auction data
                    if (publication.openActionModules.some(module => module.contract?.address === AUCTION_OPEN_ACTION_MODULE_ADDRESS)) {
                        const auctionData = await getAdditionalAuctionData(publication.id);

                        if (convertProfileIdToHex(String(auctionData?.winnerProfileId)) !== profileId) {
                            return null;
                        }

                        return {
                            ...publication,
                            auctionData,
                            stats: {
                                ...publication.stats,
                                collects: 1
                            }
                        };
                    }

                    return {
                        ...publication,
                        stats: {
                            ...publication.stats,
                            collects: 1
                        }
                    };
                })
            );

            filteredPublications = [
                ...filteredPublications,
                ...newFilteredPublications.filter(publication => publication !== null)
            ];

            cursorNext = publications.publications.pageInfo.next;
            cursorPrev = publications.publications.pageInfo.prev;

        } while (filteredPublications.length < 12 && cursorNext);

        return NextResponse.json({ publications: filteredPublications, cursorNext, cursorPrev });

    } catch (error) {
        console.error('Error fetching publications:', error);
        return NextResponse.json({ message: 'Failed to fetch publications.' }, { status: 500 });
    }
}
