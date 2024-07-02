// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace LensAuctionOpenActionTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type AuctionCreated = {
  id: Scalars['Bytes']['output'];
  profileId: Scalars['BigInt']['output'];
  pubId: Scalars['BigInt']['output'];
  availableSinceTimestamp: Scalars['BigInt']['output'];
  duration: Scalars['BigInt']['output'];
  minTimeAfterBid: Scalars['BigInt']['output'];
  reservePrice: Scalars['BigInt']['output'];
  minBidIncrement: Scalars['BigInt']['output'];
  referralFee: Scalars['Int']['output'];
  currency: Scalars['Bytes']['output'];
  recipients: Array<Scalars['Bytes']['output']>;
  onlyFollowers: Scalars['Boolean']['output'];
  tokenName: Scalars['Bytes']['output'];
  tokenSymbol: Scalars['Bytes']['output'];
  tokenRoyalty: Scalars['Int']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type AuctionCreated_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  profileId?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_not?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  profileId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pubId?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_not?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pubId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  availableSinceTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  availableSinceTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  availableSinceTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  availableSinceTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  availableSinceTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  availableSinceTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  availableSinceTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  availableSinceTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  duration?: InputMaybe<Scalars['BigInt']['input']>;
  duration_not?: InputMaybe<Scalars['BigInt']['input']>;
  duration_gt?: InputMaybe<Scalars['BigInt']['input']>;
  duration_lt?: InputMaybe<Scalars['BigInt']['input']>;
  duration_gte?: InputMaybe<Scalars['BigInt']['input']>;
  duration_lte?: InputMaybe<Scalars['BigInt']['input']>;
  duration_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  duration_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  minTimeAfterBid?: InputMaybe<Scalars['BigInt']['input']>;
  minTimeAfterBid_not?: InputMaybe<Scalars['BigInt']['input']>;
  minTimeAfterBid_gt?: InputMaybe<Scalars['BigInt']['input']>;
  minTimeAfterBid_lt?: InputMaybe<Scalars['BigInt']['input']>;
  minTimeAfterBid_gte?: InputMaybe<Scalars['BigInt']['input']>;
  minTimeAfterBid_lte?: InputMaybe<Scalars['BigInt']['input']>;
  minTimeAfterBid_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  minTimeAfterBid_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  reservePrice?: InputMaybe<Scalars['BigInt']['input']>;
  reservePrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  reservePrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  reservePrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  reservePrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  reservePrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  reservePrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  reservePrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  minBidIncrement?: InputMaybe<Scalars['BigInt']['input']>;
  minBidIncrement_not?: InputMaybe<Scalars['BigInt']['input']>;
  minBidIncrement_gt?: InputMaybe<Scalars['BigInt']['input']>;
  minBidIncrement_lt?: InputMaybe<Scalars['BigInt']['input']>;
  minBidIncrement_gte?: InputMaybe<Scalars['BigInt']['input']>;
  minBidIncrement_lte?: InputMaybe<Scalars['BigInt']['input']>;
  minBidIncrement_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  minBidIncrement_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  referralFee?: InputMaybe<Scalars['Int']['input']>;
  referralFee_not?: InputMaybe<Scalars['Int']['input']>;
  referralFee_gt?: InputMaybe<Scalars['Int']['input']>;
  referralFee_lt?: InputMaybe<Scalars['Int']['input']>;
  referralFee_gte?: InputMaybe<Scalars['Int']['input']>;
  referralFee_lte?: InputMaybe<Scalars['Int']['input']>;
  referralFee_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  referralFee_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  currency?: InputMaybe<Scalars['Bytes']['input']>;
  currency_not?: InputMaybe<Scalars['Bytes']['input']>;
  currency_gt?: InputMaybe<Scalars['Bytes']['input']>;
  currency_lt?: InputMaybe<Scalars['Bytes']['input']>;
  currency_gte?: InputMaybe<Scalars['Bytes']['input']>;
  currency_lte?: InputMaybe<Scalars['Bytes']['input']>;
  currency_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  currency_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  currency_contains?: InputMaybe<Scalars['Bytes']['input']>;
  currency_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  recipients?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  recipients_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  recipients_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  recipients_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  recipients_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  recipients_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  onlyFollowers?: InputMaybe<Scalars['Boolean']['input']>;
  onlyFollowers_not?: InputMaybe<Scalars['Boolean']['input']>;
  onlyFollowers_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  onlyFollowers_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  tokenName?: InputMaybe<Scalars['Bytes']['input']>;
  tokenName_not?: InputMaybe<Scalars['Bytes']['input']>;
  tokenName_gt?: InputMaybe<Scalars['Bytes']['input']>;
  tokenName_lt?: InputMaybe<Scalars['Bytes']['input']>;
  tokenName_gte?: InputMaybe<Scalars['Bytes']['input']>;
  tokenName_lte?: InputMaybe<Scalars['Bytes']['input']>;
  tokenName_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tokenName_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tokenName_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokenName_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokenSymbol?: InputMaybe<Scalars['Bytes']['input']>;
  tokenSymbol_not?: InputMaybe<Scalars['Bytes']['input']>;
  tokenSymbol_gt?: InputMaybe<Scalars['Bytes']['input']>;
  tokenSymbol_lt?: InputMaybe<Scalars['Bytes']['input']>;
  tokenSymbol_gte?: InputMaybe<Scalars['Bytes']['input']>;
  tokenSymbol_lte?: InputMaybe<Scalars['Bytes']['input']>;
  tokenSymbol_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tokenSymbol_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tokenSymbol_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokenSymbol_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokenRoyalty?: InputMaybe<Scalars['Int']['input']>;
  tokenRoyalty_not?: InputMaybe<Scalars['Int']['input']>;
  tokenRoyalty_gt?: InputMaybe<Scalars['Int']['input']>;
  tokenRoyalty_lt?: InputMaybe<Scalars['Int']['input']>;
  tokenRoyalty_gte?: InputMaybe<Scalars['Int']['input']>;
  tokenRoyalty_lte?: InputMaybe<Scalars['Int']['input']>;
  tokenRoyalty_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tokenRoyalty_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AuctionCreated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<AuctionCreated_filter>>>;
};

export type AuctionCreated_orderBy =
  | 'id'
  | 'profileId'
  | 'pubId'
  | 'availableSinceTimestamp'
  | 'duration'
  | 'minTimeAfterBid'
  | 'reservePrice'
  | 'minBidIncrement'
  | 'referralFee'
  | 'currency'
  | 'recipients'
  | 'onlyFollowers'
  | 'tokenName'
  | 'tokenSymbol'
  | 'tokenRoyalty'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type BidPlaced = {
  id: Scalars['Bytes']['output'];
  profileId: Scalars['BigInt']['output'];
  pubId: Scalars['BigInt']['output'];
  referrerProfileIds: Array<Scalars['BigInt']['output']>;
  amount: Scalars['BigInt']['output'];
  bidderOwner: Scalars['Bytes']['output'];
  bidderProfileId: Scalars['BigInt']['output'];
  transactionExecutor: Scalars['Bytes']['output'];
  endTimestamp: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type BidPlaced_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  profileId?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_not?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  profileId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pubId?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_not?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pubId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  referrerProfileIds?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  referrerProfileIds_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  referrerProfileIds_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  referrerProfileIds_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  referrerProfileIds_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  referrerProfileIds_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bidderOwner?: InputMaybe<Scalars['Bytes']['input']>;
  bidderOwner_not?: InputMaybe<Scalars['Bytes']['input']>;
  bidderOwner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  bidderOwner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  bidderOwner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  bidderOwner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  bidderOwner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  bidderOwner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  bidderOwner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  bidderOwner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  bidderProfileId?: InputMaybe<Scalars['BigInt']['input']>;
  bidderProfileId_not?: InputMaybe<Scalars['BigInt']['input']>;
  bidderProfileId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  bidderProfileId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  bidderProfileId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  bidderProfileId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  bidderProfileId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bidderProfileId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionExecutor?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionExecutor_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionExecutor_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  endTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  endTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  endTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BidPlaced_filter>>>;
  or?: InputMaybe<Array<InputMaybe<BidPlaced_filter>>>;
};

export type BidPlaced_orderBy =
  | 'id'
  | 'profileId'
  | 'pubId'
  | 'referrerProfileIds'
  | 'amount'
  | 'bidderOwner'
  | 'bidderProfileId'
  | 'transactionExecutor'
  | 'endTimestamp'
  | 'timestamp'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type CollectNFTDeployed = {
  id: Scalars['Bytes']['output'];
  profileId: Scalars['BigInt']['output'];
  pubId: Scalars['BigInt']['output'];
  collectNFT: Scalars['Bytes']['output'];
  timestamp: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type CollectNFTDeployed_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  profileId?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_not?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  profileId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pubId?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_not?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pubId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collectNFT?: InputMaybe<Scalars['Bytes']['input']>;
  collectNFT_not?: InputMaybe<Scalars['Bytes']['input']>;
  collectNFT_gt?: InputMaybe<Scalars['Bytes']['input']>;
  collectNFT_lt?: InputMaybe<Scalars['Bytes']['input']>;
  collectNFT_gte?: InputMaybe<Scalars['Bytes']['input']>;
  collectNFT_lte?: InputMaybe<Scalars['Bytes']['input']>;
  collectNFT_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  collectNFT_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  collectNFT_contains?: InputMaybe<Scalars['Bytes']['input']>;
  collectNFT_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CollectNFTDeployed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<CollectNFTDeployed_filter>>>;
};

export type CollectNFTDeployed_orderBy =
  | 'id'
  | 'profileId'
  | 'pubId'
  | 'collectNFT'
  | 'timestamp'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Collected = {
  id: Scalars['Bytes']['output'];
  collectedProfileId: Scalars['BigInt']['output'];
  collectedPubId: Scalars['BigInt']['output'];
  collectorProfileId: Scalars['BigInt']['output'];
  nftRecipient: Scalars['Bytes']['output'];
  collectNFT: Scalars['Bytes']['output'];
  tokenId: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type Collected_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  collectedProfileId?: InputMaybe<Scalars['BigInt']['input']>;
  collectedProfileId_not?: InputMaybe<Scalars['BigInt']['input']>;
  collectedProfileId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  collectedProfileId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  collectedProfileId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  collectedProfileId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  collectedProfileId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collectedProfileId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collectedPubId?: InputMaybe<Scalars['BigInt']['input']>;
  collectedPubId_not?: InputMaybe<Scalars['BigInt']['input']>;
  collectedPubId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  collectedPubId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  collectedPubId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  collectedPubId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  collectedPubId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collectedPubId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collectorProfileId?: InputMaybe<Scalars['BigInt']['input']>;
  collectorProfileId_not?: InputMaybe<Scalars['BigInt']['input']>;
  collectorProfileId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  collectorProfileId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  collectorProfileId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  collectorProfileId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  collectorProfileId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collectorProfileId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nftRecipient?: InputMaybe<Scalars['Bytes']['input']>;
  nftRecipient_not?: InputMaybe<Scalars['Bytes']['input']>;
  nftRecipient_gt?: InputMaybe<Scalars['Bytes']['input']>;
  nftRecipient_lt?: InputMaybe<Scalars['Bytes']['input']>;
  nftRecipient_gte?: InputMaybe<Scalars['Bytes']['input']>;
  nftRecipient_lte?: InputMaybe<Scalars['Bytes']['input']>;
  nftRecipient_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  nftRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  nftRecipient_contains?: InputMaybe<Scalars['Bytes']['input']>;
  nftRecipient_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  collectNFT?: InputMaybe<Scalars['Bytes']['input']>;
  collectNFT_not?: InputMaybe<Scalars['Bytes']['input']>;
  collectNFT_gt?: InputMaybe<Scalars['Bytes']['input']>;
  collectNFT_lt?: InputMaybe<Scalars['Bytes']['input']>;
  collectNFT_gte?: InputMaybe<Scalars['Bytes']['input']>;
  collectNFT_lte?: InputMaybe<Scalars['Bytes']['input']>;
  collectNFT_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  collectNFT_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  collectNFT_contains?: InputMaybe<Scalars['Bytes']['input']>;
  collectNFT_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Collected_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Collected_filter>>>;
};

export type Collected_orderBy =
  | 'id'
  | 'collectedProfileId'
  | 'collectedPubId'
  | 'collectorProfileId'
  | 'nftRecipient'
  | 'collectNFT'
  | 'tokenId'
  | 'timestamp'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type FeeProcessed = {
  id: Scalars['Bytes']['output'];
  profileId: Scalars['BigInt']['output'];
  pubId: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type FeeProcessed_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  profileId?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_not?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  profileId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pubId?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_not?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pubId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<FeeProcessed_filter>>>;
  or?: InputMaybe<Array<InputMaybe<FeeProcessed_filter>>>;
};

export type FeeProcessed_orderBy =
  | 'id'
  | 'profileId'
  | 'pubId'
  | 'timestamp'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type InitializedPublicationAction = {
  id: Scalars['Bytes']['output'];
  profileId: Scalars['BigInt']['output'];
  pubId: Scalars['BigInt']['output'];
  transactionExecutor: Scalars['Bytes']['output'];
  data: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type InitializedPublicationAction_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  profileId?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_not?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  profileId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pubId?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_not?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pubId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionExecutor?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionExecutor_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionExecutor_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  data?: InputMaybe<Scalars['Bytes']['input']>;
  data_not?: InputMaybe<Scalars['Bytes']['input']>;
  data_gt?: InputMaybe<Scalars['Bytes']['input']>;
  data_lt?: InputMaybe<Scalars['Bytes']['input']>;
  data_gte?: InputMaybe<Scalars['Bytes']['input']>;
  data_lte?: InputMaybe<Scalars['Bytes']['input']>;
  data_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  data_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  data_contains?: InputMaybe<Scalars['Bytes']['input']>;
  data_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<InitializedPublicationAction_filter>>>;
  or?: InputMaybe<Array<InputMaybe<InitializedPublicationAction_filter>>>;
};

export type InitializedPublicationAction_orderBy =
  | 'id'
  | 'profileId'
  | 'pubId'
  | 'transactionExecutor'
  | 'data'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type ModuleRegistered = {
  id: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ModuleRegistered_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ModuleRegistered_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ModuleRegistered_filter>>>;
};

export type ModuleRegistered_orderBy =
  | 'id'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type OwnershipTransferred = {
  id: Scalars['Bytes']['output'];
  previousOwner: Scalars['Bytes']['output'];
  newOwner: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type OwnershipTransferred_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousOwner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousOwner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newOwner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newOwner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<OwnershipTransferred_filter>>>;
  or?: InputMaybe<Array<InputMaybe<OwnershipTransferred_filter>>>;
};

export type OwnershipTransferred_orderBy =
  | 'id'
  | 'previousOwner'
  | 'newOwner'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type ProcessedPublicationAction = {
  id: Scalars['Bytes']['output'];
  profileId: Scalars['BigInt']['output'];
  pubId: Scalars['BigInt']['output'];
  transactionExecutor: Scalars['Bytes']['output'];
  data: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ProcessedPublicationAction_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  profileId?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_not?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  profileId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  profileId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pubId?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_not?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  pubId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pubId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionExecutor?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionExecutor_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionExecutor_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionExecutor_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  data?: InputMaybe<Scalars['Bytes']['input']>;
  data_not?: InputMaybe<Scalars['Bytes']['input']>;
  data_gt?: InputMaybe<Scalars['Bytes']['input']>;
  data_lt?: InputMaybe<Scalars['Bytes']['input']>;
  data_gte?: InputMaybe<Scalars['Bytes']['input']>;
  data_lte?: InputMaybe<Scalars['Bytes']['input']>;
  data_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  data_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  data_contains?: InputMaybe<Scalars['Bytes']['input']>;
  data_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProcessedPublicationAction_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ProcessedPublicationAction_filter>>>;
};

export type ProcessedPublicationAction_orderBy =
  | 'id'
  | 'profileId'
  | 'pubId'
  | 'transactionExecutor'
  | 'data'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Query = {
  auctionCreated?: Maybe<AuctionCreated>;
  auctionCreateds: Array<AuctionCreated>;
  bidPlaced?: Maybe<BidPlaced>;
  bidPlaceds: Array<BidPlaced>;
  collectNFTDeployed?: Maybe<CollectNFTDeployed>;
  collectNFTDeployeds: Array<CollectNFTDeployed>;
  collected?: Maybe<Collected>;
  collecteds: Array<Collected>;
  feeProcessed?: Maybe<FeeProcessed>;
  feeProcesseds: Array<FeeProcessed>;
  initializedPublicationAction?: Maybe<InitializedPublicationAction>;
  initializedPublicationActions: Array<InitializedPublicationAction>;
  moduleRegistered?: Maybe<ModuleRegistered>;
  moduleRegistereds: Array<ModuleRegistered>;
  ownershipTransferred?: Maybe<OwnershipTransferred>;
  ownershipTransferreds: Array<OwnershipTransferred>;
  processedPublicationAction?: Maybe<ProcessedPublicationAction>;
  processedPublicationActions: Array<ProcessedPublicationAction>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryauctionCreatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryauctionCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AuctionCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AuctionCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybidPlacedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybidPlacedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BidPlaced_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BidPlaced_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycollectNFTDeployedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycollectNFTDeployedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CollectNFTDeployed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CollectNFTDeployed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycollectedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycollectedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Collected_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Collected_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfeeProcessedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfeeProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FeeProcessed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FeeProcessed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryinitializedPublicationActionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryinitializedPublicationActionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InitializedPublicationAction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<InitializedPublicationAction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymoduleRegisteredArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymoduleRegisteredsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ModuleRegistered_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ModuleRegistered_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryownershipTransferredArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryownershipTransferredsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OwnershipTransferred_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OwnershipTransferred_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryprocessedPublicationActionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryprocessedPublicationActionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProcessedPublicationAction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProcessedPublicationAction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  auctionCreated?: Maybe<AuctionCreated>;
  auctionCreateds: Array<AuctionCreated>;
  bidPlaced?: Maybe<BidPlaced>;
  bidPlaceds: Array<BidPlaced>;
  collectNFTDeployed?: Maybe<CollectNFTDeployed>;
  collectNFTDeployeds: Array<CollectNFTDeployed>;
  collected?: Maybe<Collected>;
  collecteds: Array<Collected>;
  feeProcessed?: Maybe<FeeProcessed>;
  feeProcesseds: Array<FeeProcessed>;
  initializedPublicationAction?: Maybe<InitializedPublicationAction>;
  initializedPublicationActions: Array<InitializedPublicationAction>;
  moduleRegistered?: Maybe<ModuleRegistered>;
  moduleRegistereds: Array<ModuleRegistered>;
  ownershipTransferred?: Maybe<OwnershipTransferred>;
  ownershipTransferreds: Array<OwnershipTransferred>;
  processedPublicationAction?: Maybe<ProcessedPublicationAction>;
  processedPublicationActions: Array<ProcessedPublicationAction>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionauctionCreatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionauctionCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AuctionCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<AuctionCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbidPlacedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbidPlacedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BidPlaced_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BidPlaced_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncollectNFTDeployedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncollectNFTDeployedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CollectNFTDeployed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CollectNFTDeployed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncollectedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncollectedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Collected_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Collected_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfeeProcessedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfeeProcessedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FeeProcessed_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FeeProcessed_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioninitializedPublicationActionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioninitializedPublicationActionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<InitializedPublicationAction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<InitializedPublicationAction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmoduleRegisteredArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmoduleRegisteredsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ModuleRegistered_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ModuleRegistered_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionownershipTransferredArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionownershipTransferredsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OwnershipTransferred_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OwnershipTransferred_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionprocessedPublicationActionArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionprocessedPublicationActionsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProcessedPublicationAction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProcessedPublicationAction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  auctionCreated: InContextSdkMethod<Query['auctionCreated'], QueryauctionCreatedArgs, MeshContext>,
  /** null **/
  auctionCreateds: InContextSdkMethod<Query['auctionCreateds'], QueryauctionCreatedsArgs, MeshContext>,
  /** null **/
  bidPlaced: InContextSdkMethod<Query['bidPlaced'], QuerybidPlacedArgs, MeshContext>,
  /** null **/
  bidPlaceds: InContextSdkMethod<Query['bidPlaceds'], QuerybidPlacedsArgs, MeshContext>,
  /** null **/
  collectNFTDeployed: InContextSdkMethod<Query['collectNFTDeployed'], QuerycollectNFTDeployedArgs, MeshContext>,
  /** null **/
  collectNFTDeployeds: InContextSdkMethod<Query['collectNFTDeployeds'], QuerycollectNFTDeployedsArgs, MeshContext>,
  /** null **/
  collected: InContextSdkMethod<Query['collected'], QuerycollectedArgs, MeshContext>,
  /** null **/
  collecteds: InContextSdkMethod<Query['collecteds'], QuerycollectedsArgs, MeshContext>,
  /** null **/
  feeProcessed: InContextSdkMethod<Query['feeProcessed'], QueryfeeProcessedArgs, MeshContext>,
  /** null **/
  feeProcesseds: InContextSdkMethod<Query['feeProcesseds'], QueryfeeProcessedsArgs, MeshContext>,
  /** null **/
  initializedPublicationAction: InContextSdkMethod<Query['initializedPublicationAction'], QueryinitializedPublicationActionArgs, MeshContext>,
  /** null **/
  initializedPublicationActions: InContextSdkMethod<Query['initializedPublicationActions'], QueryinitializedPublicationActionsArgs, MeshContext>,
  /** null **/
  moduleRegistered: InContextSdkMethod<Query['moduleRegistered'], QuerymoduleRegisteredArgs, MeshContext>,
  /** null **/
  moduleRegistereds: InContextSdkMethod<Query['moduleRegistereds'], QuerymoduleRegisteredsArgs, MeshContext>,
  /** null **/
  ownershipTransferred: InContextSdkMethod<Query['ownershipTransferred'], QueryownershipTransferredArgs, MeshContext>,
  /** null **/
  ownershipTransferreds: InContextSdkMethod<Query['ownershipTransferreds'], QueryownershipTransferredsArgs, MeshContext>,
  /** null **/
  processedPublicationAction: InContextSdkMethod<Query['processedPublicationAction'], QueryprocessedPublicationActionArgs, MeshContext>,
  /** null **/
  processedPublicationActions: InContextSdkMethod<Query['processedPublicationActions'], QueryprocessedPublicationActionsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  auctionCreated: InContextSdkMethod<Subscription['auctionCreated'], SubscriptionauctionCreatedArgs, MeshContext>,
  /** null **/
  auctionCreateds: InContextSdkMethod<Subscription['auctionCreateds'], SubscriptionauctionCreatedsArgs, MeshContext>,
  /** null **/
  bidPlaced: InContextSdkMethod<Subscription['bidPlaced'], SubscriptionbidPlacedArgs, MeshContext>,
  /** null **/
  bidPlaceds: InContextSdkMethod<Subscription['bidPlaceds'], SubscriptionbidPlacedsArgs, MeshContext>,
  /** null **/
  collectNFTDeployed: InContextSdkMethod<Subscription['collectNFTDeployed'], SubscriptioncollectNFTDeployedArgs, MeshContext>,
  /** null **/
  collectNFTDeployeds: InContextSdkMethod<Subscription['collectNFTDeployeds'], SubscriptioncollectNFTDeployedsArgs, MeshContext>,
  /** null **/
  collected: InContextSdkMethod<Subscription['collected'], SubscriptioncollectedArgs, MeshContext>,
  /** null **/
  collecteds: InContextSdkMethod<Subscription['collecteds'], SubscriptioncollectedsArgs, MeshContext>,
  /** null **/
  feeProcessed: InContextSdkMethod<Subscription['feeProcessed'], SubscriptionfeeProcessedArgs, MeshContext>,
  /** null **/
  feeProcesseds: InContextSdkMethod<Subscription['feeProcesseds'], SubscriptionfeeProcessedsArgs, MeshContext>,
  /** null **/
  initializedPublicationAction: InContextSdkMethod<Subscription['initializedPublicationAction'], SubscriptioninitializedPublicationActionArgs, MeshContext>,
  /** null **/
  initializedPublicationActions: InContextSdkMethod<Subscription['initializedPublicationActions'], SubscriptioninitializedPublicationActionsArgs, MeshContext>,
  /** null **/
  moduleRegistered: InContextSdkMethod<Subscription['moduleRegistered'], SubscriptionmoduleRegisteredArgs, MeshContext>,
  /** null **/
  moduleRegistereds: InContextSdkMethod<Subscription['moduleRegistereds'], SubscriptionmoduleRegisteredsArgs, MeshContext>,
  /** null **/
  ownershipTransferred: InContextSdkMethod<Subscription['ownershipTransferred'], SubscriptionownershipTransferredArgs, MeshContext>,
  /** null **/
  ownershipTransferreds: InContextSdkMethod<Subscription['ownershipTransferreds'], SubscriptionownershipTransferredsArgs, MeshContext>,
  /** null **/
  processedPublicationAction: InContextSdkMethod<Subscription['processedPublicationAction'], SubscriptionprocessedPublicationActionArgs, MeshContext>,
  /** null **/
  processedPublicationActions: InContextSdkMethod<Subscription['processedPublicationActions'], SubscriptionprocessedPublicationActionsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["lens-auction-open-action"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
