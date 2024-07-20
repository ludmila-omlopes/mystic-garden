'use client'

//estrutura baseada no seguinte exemplo: https://docs.walletconnect.com/web3modal/react/about
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet, polygon, polygonAmoy } from 'wagmi/chains'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const projectId = process.env.NEXT_PUBLIC_WC_ID || 'abc380732b9c361293a1bdbd1279c7e6'

const metadata = {
  name: 'Web3Modal',
  description: 'Mystic Garden is a decentralized social network for artists and collectors.',
  url: 'https://www.mysticgarden.xyz',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum, polygon, polygonAmoy] as const

export const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId,
  tokens: { 137: {
    address: '0x3d2bD0e15829AA5C362a4144FdF4A1112fa29B5c',
    image: 'token_image_url' //optional
  }
},
  //enableOnramp: true
 })

export function Web3ModalProvider({ children }) {
  return ( 
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}