import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { AuctionCreated } from "../generated/schema"
import { AuctionCreated as AuctionCreatedEvent } from "../generated/AuctionCollectAction/AuctionCollectAction"
import { handleAuctionCreated } from "../src/auction-collect-action"
import { createAuctionCreatedEvent } from "./auction-collect-action-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let profileId = BigInt.fromI32(234)
    let pubId = BigInt.fromI32(234)
    let availableSinceTimestamp = BigInt.fromI32(234)
    let duration = BigInt.fromI32(234)
    let minTimeAfterBid = BigInt.fromI32(234)
    let reservePrice = BigInt.fromI32(234)
    let minBidIncrement = BigInt.fromI32(234)
    let referralFee = 123
    let currency = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let recipients = ["ethereum.Tuple Not implemented"]
    let onlyFollowers = "boolean Not implemented"
    let tokenName = Bytes.fromI32(1234567890)
    let tokenSymbol = Bytes.fromI32(1234567890)
    let tokenRoyalty = 123
    let newAuctionCreatedEvent = createAuctionCreatedEvent(
      profileId,
      pubId,
      availableSinceTimestamp,
      duration,
      minTimeAfterBid,
      reservePrice,
      minBidIncrement,
      referralFee,
      currency,
      recipients,
      onlyFollowers,
      tokenName,
      tokenSymbol,
      tokenRoyalty
    )
    handleAuctionCreated(newAuctionCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AuctionCreated created and stored", () => {
    assert.entityCount("AuctionCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "profileId",
      "234"
    )
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "pubId",
      "234"
    )
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "availableSinceTimestamp",
      "234"
    )
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "duration",
      "234"
    )
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "minTimeAfterBid",
      "234"
    )
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "reservePrice",
      "234"
    )
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "minBidIncrement",
      "234"
    )
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "referralFee",
      "123"
    )
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "currency",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "recipients",
      "[ethereum.Tuple Not implemented]"
    )
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "onlyFollowers",
      "boolean Not implemented"
    )
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenName",
      "1234567890"
    )
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenSymbol",
      "1234567890"
    )
    assert.fieldEquals(
      "AuctionCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenRoyalty",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
