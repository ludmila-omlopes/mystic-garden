import { LensClient, development, production } from '@lens-protocol/client';
import { decodeData, encodeData, ModuleParam } from '@lens-protocol/react-web';
import {isUnknownOpenActionModuleSettings, UnknownOpenActionModuleSettingsFragment } from '@lens-protocol/client';
import { useLazyModuleMetadata, Post } from "@lens-protocol/react-web";
import { UnknownOpenActionModuleSettings } from "@lens-protocol/react-web";
import { AuctionInitData } from '@/lib/parseAuctionData';
import { ethers } from 'ethers';

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
  console.log('settings =  ', settings);
  const abi = JSON.parse(metadata.initializeCalldataABI) as ModuleParam[];
  const encodeBigInt = (value: bigint) => ethers.BigNumber.from(value).toHexString();
  const encodeDate = (value: Date) => Math.floor(value.getTime() / 1000).toString();

  const calldata = encodeData(abi, [
    encodeDate(settings.availableSinceTimestamp),
    settings.duration.toString(),
    settings.minTimeAfterBid.toString(),
    encodeBigInt(settings.reservePrice),
    encodeBigInt(settings.minBidIncrement),
    settings.referralFee.toString(),
    settings.currency,
    settings.recipients.map(recipient => [recipient.recipient, recipient.split.toString()]),
    settings.onlyFollowers,
    ethers.utils.formatBytes32String(settings.tokenName),
    ethers.utils.formatBytes32String(settings.tokenSymbol),
    settings.tokenRoyalty.toString(),
  ]);

  return calldata;
}

export async function encodeBidData(metadata: any, bidAmount: bigint) {
  const abi = JSON.parse(metadata.processCalldataABI) as ModuleParam[];
  const encodeBigInt = (value: bigint) => ethers.BigNumber.from(value).toHexString();

  const calldata = encodeData([
    { name: "bidAmount", type: "uint256" },
  ], [
    encodeBigInt(bidAmount),
  ]);

  return calldata;
}
