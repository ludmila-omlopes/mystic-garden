// Import the getAuctions function
import { getAuctions } from '../lensGraphql';
import { NextResponse } from 'next/server';
import { readContract } from '@wagmi/core';
import { auctionsOaAbi } from "@/src/generated";
import { createConfig, http } from '@wagmi/core'
import { mainnet, sepolia, polygonAmoy, polygon } from '@wagmi/core/chains'
import { parseFromLensHex } from '@/lib/utils';

const config = createConfig({
    chains: [mainnet, sepolia, polygonAmoy, polygon],
    transports: {
      [mainnet.id]: http('https://mainnet.example.com'),
      [sepolia.id]: http('https://sepolia.example.com'),
      [polygonAmoy.id]: http('https://polygon.example.com'),
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
        chainId: polygon.id,
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

  export async function GET() {
    try {
      const auctions = await getAuctions();
      const auctionsData = JSON.parse(auctions).data.publications.items;
  
      let auctionsWithAdditionalData = await Promise.all(
        auctionsData.map(async (auction) => {
          const {profileId, publicationId} = parseFromLensHex(auction.id);
          const additionalData = await getAdditionalAuctionData(profileId, publicationId);
          console.log("additionalData = " + JSON.stringify(additionalData));
          return { ...auction, ...additionalData };
        })
      );
  
      // Filter out auctions where currency is not equal to the specified address
      auctionsWithAdditionalData = auctionsWithAdditionalData.filter(auction => auction.currency === '0x3d2bD0e15829AA5C362a4144FdF4A1112fa29B5c');
  
      return NextResponse.json({
        message: 'Auctions fetched successfully',
        data: auctionsWithAdditionalData,
      });
    } catch (error) {
      console.error('Error fetching auctions:', error);
      return NextResponse.json({ message: 'Failed to fetch auctions' }, { status: 500 });
    }
  }
