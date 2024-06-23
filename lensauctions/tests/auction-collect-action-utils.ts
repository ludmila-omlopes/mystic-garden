import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
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
} from "../generated/AuctionCollectAction/AuctionCollectAction"

export function createAuctionCreatedEvent(
  profileId: BigInt,
  pubId: BigInt,
  availableSinceTimestamp: BigInt,
  duration: BigInt,
  minTimeAfterBid: BigInt,
  reservePrice: BigInt,
  minBidIncrement: BigInt,
  referralFee: i32,
  currency: Address,
  recipients: Array<ethereum.Tuple>,
  onlyFollowers: boolean,
  tokenName: Bytes,
  tokenSymbol: Bytes,
  tokenRoyalty: i32
): AuctionCreated {
  let auctionCreatedEvent = changetype<AuctionCreated>(newMockEvent())

  auctionCreatedEvent.parameters = new Array()

  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "profileId",
      ethereum.Value.fromUnsignedBigInt(profileId)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam("pubId", ethereum.Value.fromUnsignedBigInt(pubId))
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "availableSinceTimestamp",
      ethereum.Value.fromUnsignedBigInt(availableSinceTimestamp)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "duration",
      ethereum.Value.fromUnsignedBigInt(duration)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "minTimeAfterBid",
      ethereum.Value.fromUnsignedBigInt(minTimeAfterBid)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "reservePrice",
      ethereum.Value.fromUnsignedBigInt(reservePrice)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "minBidIncrement",
      ethereum.Value.fromUnsignedBigInt(minBidIncrement)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "referralFee",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(referralFee))
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam("currency", ethereum.Value.fromAddress(currency))
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "recipients",
      ethereum.Value.fromTupleArray(recipients)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "onlyFollowers",
      ethereum.Value.fromBoolean(onlyFollowers)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenName",
      ethereum.Value.fromFixedBytes(tokenName)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenSymbol",
      ethereum.Value.fromFixedBytes(tokenSymbol)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenRoyalty",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(tokenRoyalty))
    )
  )

  return auctionCreatedEvent
}

export function createBidPlacedEvent(
  profileId: BigInt,
  pubId: BigInt,
  referrerProfileIds: Array<BigInt>,
  amount: BigInt,
  bidderOwner: Address,
  bidderProfileId: BigInt,
  transactionExecutor: Address,
  endTimestamp: BigInt,
  timestamp: BigInt
): BidPlaced {
  let bidPlacedEvent = changetype<BidPlaced>(newMockEvent())

  bidPlacedEvent.parameters = new Array()

  bidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "profileId",
      ethereum.Value.fromUnsignedBigInt(profileId)
    )
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam("pubId", ethereum.Value.fromUnsignedBigInt(pubId))
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "referrerProfileIds",
      ethereum.Value.fromUnsignedBigIntArray(referrerProfileIds)
    )
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "bidderOwner",
      ethereum.Value.fromAddress(bidderOwner)
    )
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "bidderProfileId",
      ethereum.Value.fromUnsignedBigInt(bidderProfileId)
    )
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "transactionExecutor",
      ethereum.Value.fromAddress(transactionExecutor)
    )
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "endTimestamp",
      ethereum.Value.fromUnsignedBigInt(endTimestamp)
    )
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return bidPlacedEvent
}

export function createCollectNFTDeployedEvent(
  profileId: BigInt,
  pubId: BigInt,
  collectNFT: Address,
  timestamp: BigInt
): CollectNFTDeployed {
  let collectNftDeployedEvent = changetype<CollectNFTDeployed>(newMockEvent())

  collectNftDeployedEvent.parameters = new Array()

  collectNftDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "profileId",
      ethereum.Value.fromUnsignedBigInt(profileId)
    )
  )
  collectNftDeployedEvent.parameters.push(
    new ethereum.EventParam("pubId", ethereum.Value.fromUnsignedBigInt(pubId))
  )
  collectNftDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "collectNFT",
      ethereum.Value.fromAddress(collectNFT)
    )
  )
  collectNftDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return collectNftDeployedEvent
}

export function createCollectedEvent(
  collectedProfileId: BigInt,
  collectedPubId: BigInt,
  collectorProfileId: BigInt,
  nftRecipient: Address,
  collectNFT: Address,
  tokenId: BigInt,
  timestamp: BigInt
): Collected {
  let collectedEvent = changetype<Collected>(newMockEvent())

  collectedEvent.parameters = new Array()

  collectedEvent.parameters.push(
    new ethereum.EventParam(
      "collectedProfileId",
      ethereum.Value.fromUnsignedBigInt(collectedProfileId)
    )
  )
  collectedEvent.parameters.push(
    new ethereum.EventParam(
      "collectedPubId",
      ethereum.Value.fromUnsignedBigInt(collectedPubId)
    )
  )
  collectedEvent.parameters.push(
    new ethereum.EventParam(
      "collectorProfileId",
      ethereum.Value.fromUnsignedBigInt(collectorProfileId)
    )
  )
  collectedEvent.parameters.push(
    new ethereum.EventParam(
      "nftRecipient",
      ethereum.Value.fromAddress(nftRecipient)
    )
  )
  collectedEvent.parameters.push(
    new ethereum.EventParam(
      "collectNFT",
      ethereum.Value.fromAddress(collectNFT)
    )
  )
  collectedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  collectedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return collectedEvent
}

export function createFeeProcessedEvent(
  profileId: BigInt,
  pubId: BigInt,
  timestamp: BigInt
): FeeProcessed {
  let feeProcessedEvent = changetype<FeeProcessed>(newMockEvent())

  feeProcessedEvent.parameters = new Array()

  feeProcessedEvent.parameters.push(
    new ethereum.EventParam(
      "profileId",
      ethereum.Value.fromUnsignedBigInt(profileId)
    )
  )
  feeProcessedEvent.parameters.push(
    new ethereum.EventParam("pubId", ethereum.Value.fromUnsignedBigInt(pubId))
  )
  feeProcessedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return feeProcessedEvent
}

export function createInitializedPublicationActionEvent(
  profileId: BigInt,
  pubId: BigInt,
  transactionExecutor: Address,
  data: Bytes
): InitializedPublicationAction {
  let initializedPublicationActionEvent =
    changetype<InitializedPublicationAction>(newMockEvent())

  initializedPublicationActionEvent.parameters = new Array()

  initializedPublicationActionEvent.parameters.push(
    new ethereum.EventParam(
      "profileId",
      ethereum.Value.fromUnsignedBigInt(profileId)
    )
  )
  initializedPublicationActionEvent.parameters.push(
    new ethereum.EventParam("pubId", ethereum.Value.fromUnsignedBigInt(pubId))
  )
  initializedPublicationActionEvent.parameters.push(
    new ethereum.EventParam(
      "transactionExecutor",
      ethereum.Value.fromAddress(transactionExecutor)
    )
  )
  initializedPublicationActionEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return initializedPublicationActionEvent
}

export function createModuleRegisteredEvent(): ModuleRegistered {
  let moduleRegisteredEvent = changetype<ModuleRegistered>(newMockEvent())

  moduleRegisteredEvent.parameters = new Array()

  return moduleRegisteredEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createProcessedPublicationActionEvent(
  profileId: BigInt,
  pubId: BigInt,
  transactionExecutor: Address,
  data: Bytes
): ProcessedPublicationAction {
  let processedPublicationActionEvent = changetype<ProcessedPublicationAction>(
    newMockEvent()
  )

  processedPublicationActionEvent.parameters = new Array()

  processedPublicationActionEvent.parameters.push(
    new ethereum.EventParam(
      "profileId",
      ethereum.Value.fromUnsignedBigInt(profileId)
    )
  )
  processedPublicationActionEvent.parameters.push(
    new ethereum.EventParam("pubId", ethereum.Value.fromUnsignedBigInt(pubId))
  )
  processedPublicationActionEvent.parameters.push(
    new ethereum.EventParam(
      "transactionExecutor",
      ethereum.Value.fromAddress(transactionExecutor)
    )
  )
  processedPublicationActionEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return processedPublicationActionEvent
}
