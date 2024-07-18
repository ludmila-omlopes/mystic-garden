// Import the getAuctions function
import { getAuctions, getAuctionsByProfile } from '../lensGraphql';
import { NextResponse, NextRequest } from 'next/server';
import { readContract } from '@wagmi/core';
import { auctionsOaAbi } from "@/src/generated";
import { createConfig, http } from '@wagmi/core'
import { mainnet, sepolia, polygonAmoy, polygon } from '@wagmi/core/chains'
import { parseFromLensHex } from '@/lib/utils';
import { BONSAI_ADDRESS } from '@/app/constants';

const config = createConfig({
    chains: [polygonAmoy, polygon],
    transports: {
      [polygonAmoy.id]: http('https://rpc-amoy.polygon.technology/'),
      [polygon.id]: http('https://polygon-rpc.com'),
    },
  })

const auctionsOaAddress = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? '0x857b5e09d54AD26580297C02e4596537a2d3E329' : '0xd935e230819AE963626B31f292623106A3dc3B19';

async function getAdditionalAuctionData(profileId, pubId) {
    try {
      const result = await readContract(config, {
        address: auctionsOaAddress,
        abi: auctionsOaAbi,
        functionName: 'getAuctionData',
        args: [profileId, pubId],
        chainId: process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? polygon.id : polygonAmoy.id,
      });
  
      const convertedResult = Object.fromEntries(
        Object.entries(result).map(([key, value]) => 
          typeof value === 'bigint' ? [key, value.toString()] : [key, value]
        )
      );
  
      return convertedResult;
    } catch (error) {
      console.error('Error fetching additional auction data:', error);
      return null;
    }
  }

  export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const profileId = searchParams.get('profileId');
      const auctions = await getAuctionsByProfile(profileId || "");
      console.log('auctions by profile:', auctions);
      const auctionsData = JSON.parse(auctions).data.publications.items;
  
      let auctionsWithAdditionalData = await Promise.all(
        auctionsData.map(async (auction) => {
          const {profileId, publicationId} = parseFromLensHex(auction.id);
          const additionalData = await getAdditionalAuctionData(profileId, publicationId);
          return { ...auction, ...additionalData };
        })
      );
  
      // Filter out auctions where currency is not equal to the specified address
      auctionsWithAdditionalData = auctionsWithAdditionalData.filter(auction => auction.currency === BONSAI_ADDRESS);
  
      return NextResponse.json({
        message: 'Auctions fetched successfully',
        data: auctionsWithAdditionalData,
      });
    } catch (error) {
      console.error('Error fetching auctions:', error);
      return NextResponse.json({ message: 'Failed to fetch auctions' }, { status: 500 });
    }
  }
