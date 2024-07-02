import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AuctionsOA
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const auctionsOaAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'hub', internalType: 'address', type: 'address' },
      { name: 'treasury', internalType: 'address', type: 'address' },
      { name: 'profileNFT', internalType: 'address', type: 'address' },
      { name: 'lensProtocol', internalType: 'address', type: 'address' },
      {
        name: 'moduleRegistry',
        internalType: 'contract IModuleRegistry',
        type: 'address',
      },
      { name: 'collectNFTImpl', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'CollectAlreadyProcessed' },
  { type: 'error', inputs: [], name: 'FeeAlreadyProcessed' },
  { type: 'error', inputs: [], name: 'InitParamsInvalid' },
  { type: 'error', inputs: [], name: 'InsufficientBidAmount' },
  { type: 'error', inputs: [], name: 'InvalidRecipientSplits' },
  { type: 'error', inputs: [], name: 'NotFollowing' },
  { type: 'error', inputs: [], name: 'NotHub' },
  { type: 'error', inputs: [], name: 'OngoingAuction' },
  { type: 'error', inputs: [], name: 'RecipientSplitCannotBeZero' },
  { type: 'error', inputs: [], name: 'TooManyRecipients' },
  { type: 'error', inputs: [], name: 'UnavailableAuction' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'profileId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'pubId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'availableSinceTimestamp',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
      {
        name: 'duration',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
      {
        name: 'minTimeAfterBid',
        internalType: 'uint32',
        type: 'uint32',
        indexed: false,
      },
      {
        name: 'reservePrice',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'minBidIncrement',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'referralFee',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
      {
        name: 'currency',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'recipients',
        internalType: 'struct RecipientData[]',
        type: 'tuple[]',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'split', internalType: 'uint16', type: 'uint16' },
        ],
        indexed: false,
      },
      {
        name: 'onlyFollowers',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
      {
        name: 'tokenName',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'tokenSymbol',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'tokenRoyalty',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
    ],
    name: 'AuctionCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'profileId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'pubId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'referrerProfileIds',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'bidderOwner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'bidderProfileId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'transactionExecutor',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'endTimestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BidPlaced',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'profileId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'pubId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'collectNFT',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'CollectNFTDeployed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'collectedProfileId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'collectedPubId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'collectorProfileId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'nftRecipient',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'collectNFT',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Collected',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'profileId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'pubId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'FeeProcessed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'profileId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'pubId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'transactionExecutor',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'InitializedPublicationAction',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'ModuleRegistered' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'profileId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'pubId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'transactionExecutor',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'ProcessedPublicationAction',
  },
  {
    type: 'function',
    inputs: [],
    name: 'HUB',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MODULE_REGISTRY',
    outputs: [
      { name: '', internalType: 'contract IModuleRegistry', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'collectedProfileId', internalType: 'uint256', type: 'uint256' },
      { name: 'collectedPubId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'profileId', internalType: 'uint256', type: 'uint256' },
      { name: 'pubId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAuctionData',
    outputs: [
      {
        name: '',
        internalType: 'struct AuctionData',
        type: 'tuple',
        components: [
          {
            name: 'availableSinceTimestamp',
            internalType: 'uint64',
            type: 'uint64',
          },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'duration', internalType: 'uint32', type: 'uint32' },
          { name: 'minTimeAfterBid', internalType: 'uint32', type: 'uint32' },
          { name: 'endTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'reservePrice', internalType: 'uint256', type: 'uint256' },
          { name: 'minBidIncrement', internalType: 'uint256', type: 'uint256' },
          { name: 'winningBid', internalType: 'uint256', type: 'uint256' },
          { name: 'referralFee', internalType: 'uint16', type: 'uint16' },
          { name: 'currency', internalType: 'address', type: 'address' },
          { name: 'winnerProfileId', internalType: 'uint256', type: 'uint256' },
          { name: 'onlyFollowers', internalType: 'bool', type: 'bool' },
          { name: 'collected', internalType: 'bool', type: 'bool' },
          { name: 'feeProcessed', internalType: 'bool', type: 'bool' },
          {
            name: 'tokenData',
            internalType: 'struct TokenData',
            type: 'tuple',
            components: [
              { name: 'name', internalType: 'bytes32', type: 'bytes32' },
              { name: 'symbol', internalType: 'bytes32', type: 'bytes32' },
              { name: 'royalty', internalType: 'uint16', type: 'uint16' },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'profileId', internalType: 'uint256', type: 'uint256' },
      { name: 'pubId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getCollectNFT',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCollectNftImpl',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getModuleMetadataURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'profileId', internalType: 'uint256', type: 'uint256' },
      { name: 'pubId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getRecipients',
    outputs: [
      {
        name: '',
        internalType: 'struct RecipientData[]',
        type: 'tuple[]',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'split', internalType: 'uint16', type: 'uint16' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'profileId', internalType: 'uint256', type: 'uint256' },
      { name: 'pubId', internalType: 'uint256', type: 'uint256' },
      { name: 'transactionExecutor', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'initializePublicationAction',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isRegistered',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        internalType: 'struct Types.ProcessActionParams',
        type: 'tuple',
        components: [
          {
            name: 'publicationActedProfileId',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'publicationActedId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'actorProfileId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'actorProfileOwner',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'transactionExecutor',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'referrerProfileIds',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          {
            name: 'referrerPubIds',
            internalType: 'uint256[]',
            type: 'uint256[]',
          },
          {
            name: 'referrerPubTypes',
            internalType: 'enum Types.PublicationType[]',
            type: 'uint8[]',
          },
          { name: 'actionModuleData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'processPublicationAction',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'registerModule',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_collectNftImpl', internalType: 'address', type: 'address' },
    ],
    name: 'setCollectNftImpl',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_metadataURI', internalType: 'string', type: 'string' }],
    name: 'setModuleMetadataURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceID', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const auctionsOaAddress = {
  137: '0x857b5e09d54AD26580297C02e4596537a2d3E329',
  80002: '0xd935e230819AE963626B31f292623106A3dc3B19',
} as const

/**
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const auctionsOaConfig = {
  address: auctionsOaAddress,
  abi: auctionsOaAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionsOaAbi}__
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useReadAuctionsOa = /*#__PURE__*/ createUseReadContract({
  abi: auctionsOaAbi,
  address: auctionsOaAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"HUB"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useReadAuctionsOaHub = /*#__PURE__*/ createUseReadContract({
  abi: auctionsOaAbi,
  address: auctionsOaAddress,
  functionName: 'HUB',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"MODULE_REGISTRY"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useReadAuctionsOaModuleRegistry =
  /*#__PURE__*/ createUseReadContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'MODULE_REGISTRY',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"getAuctionData"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useReadAuctionsOaGetAuctionData =
  /*#__PURE__*/ createUseReadContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'getAuctionData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"getCollectNFT"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useReadAuctionsOaGetCollectNft =
  /*#__PURE__*/ createUseReadContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'getCollectNFT',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"getCollectNftImpl"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useReadAuctionsOaGetCollectNftImpl =
  /*#__PURE__*/ createUseReadContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'getCollectNftImpl',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"getModuleMetadataURI"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useReadAuctionsOaGetModuleMetadataUri =
  /*#__PURE__*/ createUseReadContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'getModuleMetadataURI',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"getRecipients"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useReadAuctionsOaGetRecipients =
  /*#__PURE__*/ createUseReadContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'getRecipients',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"isRegistered"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useReadAuctionsOaIsRegistered =
  /*#__PURE__*/ createUseReadContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'isRegistered',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useReadAuctionsOaOwner = /*#__PURE__*/ createUseReadContract({
  abi: auctionsOaAbi,
  address: auctionsOaAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useReadAuctionsOaSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionsOaAbi}__
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useWriteAuctionsOa = /*#__PURE__*/ createUseWriteContract({
  abi: auctionsOaAbi,
  address: auctionsOaAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"claim"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useWriteAuctionsOaClaim = /*#__PURE__*/ createUseWriteContract({
  abi: auctionsOaAbi,
  address: auctionsOaAddress,
  functionName: 'claim',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"initializePublicationAction"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useWriteAuctionsOaInitializePublicationAction =
  /*#__PURE__*/ createUseWriteContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'initializePublicationAction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"processPublicationAction"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useWriteAuctionsOaProcessPublicationAction =
  /*#__PURE__*/ createUseWriteContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'processPublicationAction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"registerModule"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useWriteAuctionsOaRegisterModule =
  /*#__PURE__*/ createUseWriteContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'registerModule',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useWriteAuctionsOaRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"setCollectNftImpl"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useWriteAuctionsOaSetCollectNftImpl =
  /*#__PURE__*/ createUseWriteContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'setCollectNftImpl',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"setModuleMetadataURI"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useWriteAuctionsOaSetModuleMetadataUri =
  /*#__PURE__*/ createUseWriteContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'setModuleMetadataURI',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useWriteAuctionsOaTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionsOaAbi}__
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useSimulateAuctionsOa = /*#__PURE__*/ createUseSimulateContract({
  abi: auctionsOaAbi,
  address: auctionsOaAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"claim"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useSimulateAuctionsOaClaim =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'claim',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"initializePublicationAction"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useSimulateAuctionsOaInitializePublicationAction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'initializePublicationAction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"processPublicationAction"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useSimulateAuctionsOaProcessPublicationAction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'processPublicationAction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"registerModule"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useSimulateAuctionsOaRegisterModule =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'registerModule',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useSimulateAuctionsOaRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"setCollectNftImpl"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useSimulateAuctionsOaSetCollectNftImpl =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'setCollectNftImpl',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"setModuleMetadataURI"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useSimulateAuctionsOaSetModuleMetadataUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'setModuleMetadataURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionsOaAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useSimulateAuctionsOaTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link auctionsOaAbi}__
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useWatchAuctionsOaEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link auctionsOaAbi}__ and `eventName` set to `"AuctionCreated"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useWatchAuctionsOaAuctionCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    eventName: 'AuctionCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link auctionsOaAbi}__ and `eventName` set to `"BidPlaced"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useWatchAuctionsOaBidPlacedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    eventName: 'BidPlaced',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link auctionsOaAbi}__ and `eventName` set to `"CollectNFTDeployed"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useWatchAuctionsOaCollectNftDeployedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    eventName: 'CollectNFTDeployed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link auctionsOaAbi}__ and `eventName` set to `"Collected"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useWatchAuctionsOaCollectedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    eventName: 'Collected',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link auctionsOaAbi}__ and `eventName` set to `"FeeProcessed"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useWatchAuctionsOaFeeProcessedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    eventName: 'FeeProcessed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link auctionsOaAbi}__ and `eventName` set to `"InitializedPublicationAction"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useWatchAuctionsOaInitializedPublicationActionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    eventName: 'InitializedPublicationAction',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link auctionsOaAbi}__ and `eventName` set to `"ModuleRegistered"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useWatchAuctionsOaModuleRegisteredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    eventName: 'ModuleRegistered',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link auctionsOaAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useWatchAuctionsOaOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link auctionsOaAbi}__ and `eventName` set to `"ProcessedPublicationAction"`
 *
 * [__View Contract on Polygon Polygon Scan__](https://polygonscan.com/address/0x857b5e09d54AD26580297C02e4596537a2d3E329)
 */
export const useWatchAuctionsOaProcessedPublicationActionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: auctionsOaAbi,
    address: auctionsOaAddress,
    eventName: 'ProcessedPublicationAction',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })
