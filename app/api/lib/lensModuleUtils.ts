import { LensClient, development, production } from '@lens-protocol/client';
import { decodeData, encodeData, ModuleParam } from '@lens-protocol/client';
import {isUnknownOpenActionModuleSettings, UnknownOpenActionModuleSettingsFragment } from '@lens-protocol/client';
import { useLazyModuleMetadata, Post } from "@lens-protocol/react-web";
import { UnknownOpenActionModuleSettings } from "@lens-protocol/react-web";
import { AuctionInitData } from '@/lib/parseAuctionData';
import { BigNumber, ethers } from 'ethers';

export async function decodeInitData(settings, metadata) {
  // decode init data
  const initData = decodeData(
    JSON.parse(metadata.initializeCalldataABI) as ModuleParam[],
    settings.initializeCalldata
  );

  if (!metadata.initializeResultDataABI)
    return { initData, initResult: null };
  const initResult = decodeData(
    JSON.parse(metadata.initializeResultDataABI),
    settings.initializeResultData
  );

  return { initData, initResult };
}

export async function encodeInitData(settings: AuctionInitData, metadata: any) {
  //aqui tá errado. Esse método vai ser pra criar uma auction.
  const abi = JSON.parse(metadata.processCalldataABI) as ModuleParam[];

  const encodeBigNumber = (value: BigNumber) => value.toHexString();
  const encodeBytes32 = (value: string) => ethers.utils.formatBytes32String(value);
  const encodeDateTime = (date: Date) => BigNumber.from(Math.floor(date.getTime() / 1000)).toHexString();

  const calldata = encodeData([
    { name: "availableSinceTimestamp", type: "uint64" },
    { name: "duration", type: "uint32" },
    { name: "minTimeAfterBid", type: "uint32" },
    { name: "reservePrice", type: "uint256" },
    { name: "minBidIncrement", type: "uint256" },
    { name: "referralFee", type: "uint16" },
    { name: "currency", type: "address" },
    {
      name: "recipients",
      type: "tuple(address,uint16)[]",
      components: [
        { name: "recipient", type: "address" },
        { name: "split", type: "uint16" },
      ],
    },
    { name: "onlyFollowers", type: "bool" },
    { name: "tokenName", type: "bytes32" },
    { name: "tokenSymbol", type: "bytes32" },
    { name: "tokenRoyalty", type: "uint16" },
  ], [
    encodeDateTime(settings.availableSinceTimestamp),
    settings.duration.toString(),
    settings.minTimeAfterBid.toString(),
    encodeBigNumber(settings.reservePrice),
    encodeBigNumber(settings.minBidIncrement),
    settings.referralFee.toString(),
    settings.currency,
    settings.recipients.map((recipient) => [recipient.recipient, recipient.split.toString()]),
    settings.onlyFollowers.toString(),
    encodeBytes32(settings.tokenName),
    encodeBytes32(settings.tokenSymbol),
    settings.tokenRoyalty.toString(),
  ]);

  return calldata;
}

export async function encodeBidData(metadata: any, bidAmount: BigNumber) {
  const abi = JSON.parse(metadata.processCalldataABI) as ModuleParam[];
  const encodeBigNumber = (value: BigNumber) => value.toHexString();

  const calldata = encodeData([
    { name: "bidAmount", type: "uint256" },
  ], [
    encodeBigNumber(bidAmount),
  ]);

  return calldata;
}
