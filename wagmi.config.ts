/*import { defineConfig } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins'
import { erc20Abi, erc721Abi } from 'viem'
import { polygon } from 'wagmi/chains'
import dotenv from 'dotenv';
import { AUCTION_OPEN_ACTION_MODULE_ADDRESS } from './app/constants';

dotenv.config();

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'erc20',
      abi: erc20Abi,
    },
    {
      name: 'erc721',
      abi: erc721Abi,
    },
  ],
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY || "H3145XF3KNDFEQJ1PRTGD62PTYVDNWT1HR",
      chainId: polygon.id,
      contracts: [
        {
          name: 'AuctionsOA',
          address: AUCTION_OPEN_ACTION_MODULE_ADDRESS as Address,
        },
      ],
    }),
    react(),
  ],
})*/



