import {
  AuctionCreated as AuctionCreatedEvent,
  BidPlaced as BidPlacedEvent,
  CollectNFTDeployed as CollectNFTDeployedEvent,
  Collected as CollectedEvent,
  FeeProcessed as FeeProcessedEvent,
  InitializedPublicationAction as InitializedPublicationActionEvent,
  ModuleRegistered as ModuleRegisteredEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  ProcessedPublicationAction as ProcessedPublicationActionEvent
} from "../generated/AuctionCollectAction/AuctionCollectAction"
import {
  AuctionCreated,
  BidPlaced,
  CollectNFTDeployed,
  Collected,
  FeeProcessed,
  InitializedPublicationAction,
  ModuleRegistered,
  OwnershipTransferred,
  ProcessedPublicationAction
} from "../generated/schema"

export function handleAuctionCreated(event: AuctionCreatedEvent): void {
  let entity = new AuctionCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.profileId = event.params.profileId
  entity.pubId = event.params.pubId
  entity.availableSinceTimestamp = event.params.availableSinceTimestamp
  entity.duration = event.params.duration
  entity.minTimeAfterBid = event.params.minTimeAfterBid
  entity.reservePrice = event.params.reservePrice
  entity.minBidIncrement = event.params.minBidIncrement
  entity.referralFee = event.params.referralFee
  entity.currency = event.params.currency
  entity.recipients = event.params.recipients
  entity.onlyFollowers = event.params.onlyFollowers
  entity.tokenName = event.params.tokenName
  entity.tokenSymbol = event.params.tokenSymbol
  entity.tokenRoyalty = event.params.tokenRoyalty

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBidPlaced(event: BidPlacedEvent): void {
  let entity = new BidPlaced(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.profileId = event.params.profileId
  entity.pubId = event.params.pubId
  entity.referrerProfileIds = event.params.referrerProfileIds
  entity.amount = event.params.amount
  entity.bidderOwner = event.params.bidderOwner
  entity.bidderProfileId = event.params.bidderProfileId
  entity.transactionExecutor = event.params.transactionExecutor
  entity.endTimestamp = event.params.endTimestamp
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCollectNFTDeployed(event: CollectNFTDeployedEvent): void {
  let entity = new CollectNFTDeployed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.profileId = event.params.profileId
  entity.pubId = event.params.pubId
  entity.collectNFT = event.params.collectNFT
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCollected(event: CollectedEvent): void {
  let entity = new Collected(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.collectedProfileId = event.params.collectedProfileId
  entity.collectedPubId = event.params.collectedPubId
  entity.collectorProfileId = event.params.collectorProfileId
  entity.nftRecipient = event.params.nftRecipient
  entity.collectNFT = event.params.collectNFT
  entity.tokenId = event.params.tokenId
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeeProcessed(event: FeeProcessedEvent): void {
  let entity = new FeeProcessed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.profileId = event.params.profileId
  entity.pubId = event.params.pubId
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitializedPublicationAction(
  event: InitializedPublicationActionEvent
): void {
  let entity = new InitializedPublicationAction(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.profileId = event.params.profileId
  entity.pubId = event.params.pubId
  entity.transactionExecutor = event.params.transactionExecutor
  entity.data = event.params.data

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleModuleRegistered(event: ModuleRegisteredEvent): void {
  let entity = new ModuleRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProcessedPublicationAction(
  event: ProcessedPublicationActionEvent
): void {
  let entity = new ProcessedPublicationAction(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.profileId = event.params.profileId
  entity.pubId = event.params.pubId
  entity.transactionExecutor = event.params.transactionExecutor
  entity.data = event.params.data

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
