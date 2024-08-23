import { defineConfig } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins'
import { erc20Abi, erc721Abi } from 'viem'
import { polygon } from 'wagmi/chains'
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

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
          address: '0x857b5e09d54AD26580297C02e4596537a2d3E329', 
        },
      ],
    }),
    react(),
  ],
})



