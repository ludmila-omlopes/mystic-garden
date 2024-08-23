import { AUCTION_OPEN_ACTION_MODULE_ADDRESS, CURRENT_CHAIN_ID } from "@/app/constants";
import { auctionsOaAbi, auctionsOaAddress } from "@/src/generated";
import { createConfig, http, readContract } from "@wagmi/core";
import { polygon, polygonAmoy } from "wagmi/chains";
import { parseFromLensHex } from "./utils";


const config = createConfig({
    chains: [polygonAmoy, polygon],
    transports: {
      [polygonAmoy.id]: http('https://rpc-amoy.polygon.technology'),
      [polygon.id]: http('https://polygon-rpc.com'),
    },
  });

export async function getAdditionalAuctionData(publicationId) {
    try {
    const { profileId: profileIdInt, publicationId: publicationIdInt } = parseFromLensHex(publicationId);
      const result = await readContract(config, {
        address: AUCTION_OPEN_ACTION_MODULE_ADDRESS,
        abi: auctionsOaAbi,
        functionName: 'getAuctionData',
        args: [profileIdInt, publicationIdInt],
        chainId: CURRENT_CHAIN_ID,
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