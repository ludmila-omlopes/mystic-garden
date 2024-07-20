import { decodeData, encodeData, ModuleParam } from '@lens-protocol/react-web';
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
  console.log('initializing encodeInitData');
      try {

        const abi = JSON.parse(metadata.initializeCalldataABI) as ModuleParam[];
        const encodeDate = (value: Date) => Math.floor(value.getTime() / 1000).toString();

        const calldata = encodeData(abi, [
          encodeDate(settings.availableSinceTimestamp),
          settings.duration.toString(),
          settings.minTimeAfterBid.toString(),
          settings.reservePrice.toString(),
          settings.minBidIncrement.toString(),
          settings.referralFee.toString(),
          settings.currency,
          settings.recipients.map(recipient => [recipient.recipient, recipient.split.toString()]),
          settings.onlyFollowers,
          ethers.utils.formatBytes32String(settings.tokenName),
          ethers.utils.formatBytes32String(settings.tokenSymbol),
          settings.tokenRoyalty.toString(),
        ]);

        console.log('calldata = ', calldata);

        return calldata;
      }
      catch (e) {
        console.error('Error in encodeInitData:', e);
        throw new Error('Failed to encode init data' + e);
      }
}

export async function encodeBidData(metadata: any, bidAmount: bigint) {
  const abi = JSON.parse(metadata.processCalldataABI) as ModuleParam[];
  console.log('auction abi', abi);
  const encodeBigInt = (value: bigint) => BigInt(value).toString();
  console.log('bidAmount', encodeBigInt(bidAmount));

  /*const calldata = encodeData([
    { name: "bidAmount", type: "uint256" },
  ], [
    encodeBigInt(bidAmount),
  ]);*/

  const calldata = encodeData(
    abi, [
    encodeBigInt(bidAmount),
  ]);



  return calldata;
}
