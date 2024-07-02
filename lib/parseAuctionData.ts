import { ethers } from 'ethers';

type Recipient = {
  recipient: string;
  split: number; // % * 100 (1000 = 10%)
};

export type AuctionInitData = {
  availableSinceTimestamp: Date;
  duration: number; //seconds
  minTimeAfterBid: number; //seconds
  reservePrice: bigint;
  minBidIncrement: bigint;
  referralFee: number; // % * 100 (1000 = 10%)
  currency: string;
  recipients: Recipient[];
  onlyFollowers: boolean;
  tokenName: string;
  tokenSymbol: string;
  tokenRoyalty: number; // % * 100 (5000 = 50%)
};

export function parseAuctionInitData(data: any[]): AuctionInitData {
  if (!data || !Array.isArray(data) || data.length < 12) {
    throw new Error('Invalid init data format');
  }

  const parseBigInt = (value: any) => {
    return BigInt(value);
  };

  const parseBytes32 = (value: any) => {
    return ethers.utils.parseBytes32String(value);
  };

  const parseDateTime = (bigint: bigint) => {
    const timestamp = Number(bigint);
    return new Date(timestamp * 1000); // Convert from seconds to milliseconds
  };

  return {
    availableSinceTimestamp: parseDateTime(parseBigInt(data[0])),
    duration: data[1] as number,
    minTimeAfterBid: data[2] as number,
    reservePrice: parseBigInt(data[3]) / BigInt(10 ** 18),
    minBidIncrement: parseBigInt(data[4]) / BigInt(10 ** 18),
    referralFee: data[5] as number,
    currency: data[6] as string,
    recipients: Array.isArray(data[7]) ? data[7].map((recipient: any) => ({
      recipient: recipient[0] as string,
      split: recipient[1] as number
    })) : [],
    onlyFollowers: data[8] as boolean,
    tokenName: parseBytes32(data[9]),
    tokenSymbol: parseBytes32(data[10]),
    tokenRoyalty: data[11] as number
  };
}
