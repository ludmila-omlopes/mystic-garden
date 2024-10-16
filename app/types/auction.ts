// src/types/auction.ts
// tentar trazer o tipo de metadado

// Define the enum for auction status
export enum AuctionStatus {
  NOT_STARTED = 'not_started',
  AVAILABLE = 'available',  //hasn't started yet
  LIVE_AUCTION = 'live_auction',
  PENDING_SETTLEMENT = 'pending_settlement',
  COLLECTED = 'collected',
}

export interface AuctionWithPublicationId {
  id: string;
  metadata: {
    asset: {
      image?: { optimized?: { uri: string } };
      cover?: { optimized?: { uri: string } };
      video?: { optimized?: { uri: string } };
      audio?: { optimized?: { uri: string } };
    };
    title: string;
  };
  createdAt: string;
  by: {
    id: string;
    handle: {
      localName: string;
      suggestedFormatted: { localName: string };
    };
    metadata: {
      picture: { optimized?: { uri: string } };
    };
  };
  availableSinceTimestamp: string;
  startTimestamp: string;
  duration: number;
  minTimeAfterBid: number;
  endTimestamp: string;
  reservePrice: number;
  minBidIncrement: number;
  winningBid: number;
  referralFee: number;
  currency: string;
  winnerProfileId: string;
  onlyFollowers: boolean;
  collected: boolean;
  feeProcessed: boolean;
  tokenData: { name: string; symbol: string; royalty: number };
  collectNFTAddress?: string;
  ownerOf?: string;
  status: AuctionStatus;
}
