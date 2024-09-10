// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { usePersistedOperations } from '@graphql-yoga/plugin-persisted-operations';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { LensAuctionOpenActionTypes } from './sources/lens-auction-open-action/types';
import * as importedModule$0 from "./sources/lens-auction-open-action/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Aggregation_interval: Aggregation_interval;
  AuctionCreated: ResolverTypeWrapper<AuctionCreated>;
  AuctionCreated_filter: AuctionCreated_filter;
  AuctionCreated_orderBy: AuctionCreated_orderBy;
  BidPlaced: ResolverTypeWrapper<BidPlaced>;
  BidPlaced_filter: BidPlaced_filter;
  BidPlaced_orderBy: BidPlaced_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  CollectNFTDeployed: ResolverTypeWrapper<CollectNFTDeployed>;
  CollectNFTDeployed_filter: CollectNFTDeployed_filter;
  CollectNFTDeployed_orderBy: CollectNFTDeployed_orderBy;
  Collected: ResolverTypeWrapper<Collected>;
  Collected_filter: Collected_filter;
  Collected_orderBy: Collected_orderBy;
  FeeProcessed: ResolverTypeWrapper<FeeProcessed>;
  FeeProcessed_filter: FeeProcessed_filter;
  FeeProcessed_orderBy: FeeProcessed_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  InitializedPublicationAction: ResolverTypeWrapper<InitializedPublicationAction>;
  InitializedPublicationAction_filter: InitializedPublicationAction_filter;
  InitializedPublicationAction_orderBy: InitializedPublicationAction_orderBy;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
  ModuleRegistered: ResolverTypeWrapper<ModuleRegistered>;
  ModuleRegistered_filter: ModuleRegistered_filter;
  ModuleRegistered_orderBy: ModuleRegistered_orderBy;
  OrderDirection: OrderDirection;
  OwnershipTransferred: ResolverTypeWrapper<OwnershipTransferred>;
  OwnershipTransferred_filter: OwnershipTransferred_filter;
  OwnershipTransferred_orderBy: OwnershipTransferred_orderBy;
  ProcessedPublicationAction: ResolverTypeWrapper<ProcessedPublicationAction>;
  ProcessedPublicationAction_filter: ProcessedPublicationAction_filter;
  ProcessedPublicationAction_orderBy: ProcessedPublicationAction_orderBy;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuctionCreated: AuctionCreated;
  AuctionCreated_filter: AuctionCreated_filter;
  BidPlaced: BidPlaced;
  BidPlaced_filter: BidPlaced_filter;
  BigDecimal: Scalars['BigDecimal']['output'];
  BigInt: Scalars['BigInt']['output'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean']['output'];
  Bytes: Scalars['Bytes']['output'];
  CollectNFTDeployed: CollectNFTDeployed;
  CollectNFTDeployed_filter: CollectNFTDeployed_filter;
  Collected: Collected;
  Collected_filter: Collected_filter;
  FeeProcessed: FeeProcessed;
  FeeProcessed_filter: FeeProcessed_filter;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  InitializedPublicationAction: InitializedPublicationAction;
  InitializedPublicationAction_filter: InitializedPublicationAction_filter;
  Int: Scalars['Int']['output'];
  Int8: Scalars['Int8']['output'];
  ModuleRegistered: ModuleRegistered;
  ModuleRegistered_filter: ModuleRegistered_filter;
  OwnershipTransferred: OwnershipTransferred;
  OwnershipTransferred_filter: OwnershipTransferred_filter;
  ProcessedPublicationAction: ProcessedPublicationAction;
  ProcessedPublicationAction_filter: ProcessedPublicationAction_filter;
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  Timestamp: Scalars['Timestamp']['output'];
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String']['input'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String']['input'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuctionCreatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AuctionCreated'] = ResolversParentTypes['AuctionCreated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  pubId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  availableSinceTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  minTimeAfterBid?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  reservePrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  minBidIncrement?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  referralFee?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  recipients?: Resolver<Array<ResolversTypes['Bytes']>, ParentType, ContextType>;
  onlyFollowers?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  tokenName?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenSymbol?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenRoyalty?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BidPlacedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BidPlaced'] = ResolversParentTypes['BidPlaced']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  pubId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  referrerProfileIds?: Resolver<Array<ResolversTypes['BigInt']>, ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  bidderOwner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  bidderProfileId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionExecutor?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  endTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type CollectNFTDeployedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CollectNFTDeployed'] = ResolversParentTypes['CollectNFTDeployed']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  pubId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  collectNFT?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CollectedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Collected'] = ResolversParentTypes['Collected']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  collectedProfileId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  collectedPubId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  collectorProfileId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  nftRecipient?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  collectNFT?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FeeProcessedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['FeeProcessed'] = ResolversParentTypes['FeeProcessed']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  pubId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InitializedPublicationActionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['InitializedPublicationAction'] = ResolversParentTypes['InitializedPublicationAction']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  pubId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionExecutor?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  data?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type ModuleRegisteredResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ModuleRegistered'] = ResolversParentTypes['ModuleRegistered']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OwnershipTransferredResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['OwnershipTransferred'] = ResolversParentTypes['OwnershipTransferred']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  previousOwner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  newOwner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProcessedPublicationActionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ProcessedPublicationAction'] = ResolversParentTypes['ProcessedPublicationAction']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  profileId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  pubId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionExecutor?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  data?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  auctionCreated?: Resolver<Maybe<ResolversTypes['AuctionCreated']>, ParentType, ContextType, RequireFields<QueryauctionCreatedArgs, 'id' | 'subgraphError'>>;
  auctionCreateds?: Resolver<Array<ResolversTypes['AuctionCreated']>, ParentType, ContextType, RequireFields<QueryauctionCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bidPlaced?: Resolver<Maybe<ResolversTypes['BidPlaced']>, ParentType, ContextType, RequireFields<QuerybidPlacedArgs, 'id' | 'subgraphError'>>;
  bidPlaceds?: Resolver<Array<ResolversTypes['BidPlaced']>, ParentType, ContextType, RequireFields<QuerybidPlacedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  collectNFTDeployed?: Resolver<Maybe<ResolversTypes['CollectNFTDeployed']>, ParentType, ContextType, RequireFields<QuerycollectNFTDeployedArgs, 'id' | 'subgraphError'>>;
  collectNFTDeployeds?: Resolver<Array<ResolversTypes['CollectNFTDeployed']>, ParentType, ContextType, RequireFields<QuerycollectNFTDeployedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  collected?: Resolver<Maybe<ResolversTypes['Collected']>, ParentType, ContextType, RequireFields<QuerycollectedArgs, 'id' | 'subgraphError'>>;
  collecteds?: Resolver<Array<ResolversTypes['Collected']>, ParentType, ContextType, RequireFields<QuerycollectedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  feeProcessed?: Resolver<Maybe<ResolversTypes['FeeProcessed']>, ParentType, ContextType, RequireFields<QueryfeeProcessedArgs, 'id' | 'subgraphError'>>;
  feeProcesseds?: Resolver<Array<ResolversTypes['FeeProcessed']>, ParentType, ContextType, RequireFields<QueryfeeProcessedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  initializedPublicationAction?: Resolver<Maybe<ResolversTypes['InitializedPublicationAction']>, ParentType, ContextType, RequireFields<QueryinitializedPublicationActionArgs, 'id' | 'subgraphError'>>;
  initializedPublicationActions?: Resolver<Array<ResolversTypes['InitializedPublicationAction']>, ParentType, ContextType, RequireFields<QueryinitializedPublicationActionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  moduleRegistered?: Resolver<Maybe<ResolversTypes['ModuleRegistered']>, ParentType, ContextType, RequireFields<QuerymoduleRegisteredArgs, 'id' | 'subgraphError'>>;
  moduleRegistereds?: Resolver<Array<ResolversTypes['ModuleRegistered']>, ParentType, ContextType, RequireFields<QuerymoduleRegisteredsArgs, 'skip' | 'first' | 'subgraphError'>>;
  ownershipTransferred?: Resolver<Maybe<ResolversTypes['OwnershipTransferred']>, ParentType, ContextType, RequireFields<QueryownershipTransferredArgs, 'id' | 'subgraphError'>>;
  ownershipTransferreds?: Resolver<Array<ResolversTypes['OwnershipTransferred']>, ParentType, ContextType, RequireFields<QueryownershipTransferredsArgs, 'skip' | 'first' | 'subgraphError'>>;
  processedPublicationAction?: Resolver<Maybe<ResolversTypes['ProcessedPublicationAction']>, ParentType, ContextType, RequireFields<QueryprocessedPublicationActionArgs, 'id' | 'subgraphError'>>;
  processedPublicationActions?: Resolver<Array<ResolversTypes['ProcessedPublicationAction']>, ParentType, ContextType, RequireFields<QueryprocessedPublicationActionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  auctionCreated?: SubscriptionResolver<Maybe<ResolversTypes['AuctionCreated']>, "auctionCreated", ParentType, ContextType, RequireFields<SubscriptionauctionCreatedArgs, 'id' | 'subgraphError'>>;
  auctionCreateds?: SubscriptionResolver<Array<ResolversTypes['AuctionCreated']>, "auctionCreateds", ParentType, ContextType, RequireFields<SubscriptionauctionCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bidPlaced?: SubscriptionResolver<Maybe<ResolversTypes['BidPlaced']>, "bidPlaced", ParentType, ContextType, RequireFields<SubscriptionbidPlacedArgs, 'id' | 'subgraphError'>>;
  bidPlaceds?: SubscriptionResolver<Array<ResolversTypes['BidPlaced']>, "bidPlaceds", ParentType, ContextType, RequireFields<SubscriptionbidPlacedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  collectNFTDeployed?: SubscriptionResolver<Maybe<ResolversTypes['CollectNFTDeployed']>, "collectNFTDeployed", ParentType, ContextType, RequireFields<SubscriptioncollectNFTDeployedArgs, 'id' | 'subgraphError'>>;
  collectNFTDeployeds?: SubscriptionResolver<Array<ResolversTypes['CollectNFTDeployed']>, "collectNFTDeployeds", ParentType, ContextType, RequireFields<SubscriptioncollectNFTDeployedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  collected?: SubscriptionResolver<Maybe<ResolversTypes['Collected']>, "collected", ParentType, ContextType, RequireFields<SubscriptioncollectedArgs, 'id' | 'subgraphError'>>;
  collecteds?: SubscriptionResolver<Array<ResolversTypes['Collected']>, "collecteds", ParentType, ContextType, RequireFields<SubscriptioncollectedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  feeProcessed?: SubscriptionResolver<Maybe<ResolversTypes['FeeProcessed']>, "feeProcessed", ParentType, ContextType, RequireFields<SubscriptionfeeProcessedArgs, 'id' | 'subgraphError'>>;
  feeProcesseds?: SubscriptionResolver<Array<ResolversTypes['FeeProcessed']>, "feeProcesseds", ParentType, ContextType, RequireFields<SubscriptionfeeProcessedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  initializedPublicationAction?: SubscriptionResolver<Maybe<ResolversTypes['InitializedPublicationAction']>, "initializedPublicationAction", ParentType, ContextType, RequireFields<SubscriptioninitializedPublicationActionArgs, 'id' | 'subgraphError'>>;
  initializedPublicationActions?: SubscriptionResolver<Array<ResolversTypes['InitializedPublicationAction']>, "initializedPublicationActions", ParentType, ContextType, RequireFields<SubscriptioninitializedPublicationActionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  moduleRegistered?: SubscriptionResolver<Maybe<ResolversTypes['ModuleRegistered']>, "moduleRegistered", ParentType, ContextType, RequireFields<SubscriptionmoduleRegisteredArgs, 'id' | 'subgraphError'>>;
  moduleRegistereds?: SubscriptionResolver<Array<ResolversTypes['ModuleRegistered']>, "moduleRegistereds", ParentType, ContextType, RequireFields<SubscriptionmoduleRegisteredsArgs, 'skip' | 'first' | 'subgraphError'>>;
  ownershipTransferred?: SubscriptionResolver<Maybe<ResolversTypes['OwnershipTransferred']>, "ownershipTransferred", ParentType, ContextType, RequireFields<SubscriptionownershipTransferredArgs, 'id' | 'subgraphError'>>;
  ownershipTransferreds?: SubscriptionResolver<Array<ResolversTypes['OwnershipTransferred']>, "ownershipTransferreds", ParentType, ContextType, RequireFields<SubscriptionownershipTransferredsArgs, 'skip' | 'first' | 'subgraphError'>>;
  processedPublicationAction?: SubscriptionResolver<Maybe<ResolversTypes['ProcessedPublicationAction']>, "processedPublicationAction", ParentType, ContextType, RequireFields<SubscriptionprocessedPublicationActionArgs, 'id' | 'subgraphError'>>;
  processedPublicationActions?: SubscriptionResolver<Array<ResolversTypes['ProcessedPublicationAction']>, "processedPublicationActions", ParentType, ContextType, RequireFields<SubscriptionprocessedPublicationActionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  AuctionCreated?: AuctionCreatedResolvers<ContextType>;
  BidPlaced?: BidPlacedResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  CollectNFTDeployed?: CollectNFTDeployedResolvers<ContextType>;
  Collected?: CollectedResolvers<ContextType>;
  FeeProcessed?: FeeProcessedResolvers<ContextType>;
  InitializedPublicationAction?: InitializedPublicationActionResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  ModuleRegistered?: ModuleRegisteredResolvers<ContextType>;
  OwnershipTransferred?: OwnershipTransferredResolvers<ContextType>;
  ProcessedPublicationAction?: ProcessedPublicationActionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = LensAuctionOpenActionTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/lens-auction-open-action/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const lensAuctionOpenActionTransforms = [];
const additionalTypeDefs = [] as any[];
const lensAuctionOpenActionHandler = new GraphqlHandler({
              name: "lens-auction-open-action",
              config: {"endpoint":"https://gateway-arbitrum.network.thegraph.com/api/f807f535577279be061483d217f3efdd/subgraphs/id/Dip94gLgtM4tAjGr15XVqKGSXhBWbmWVLYKc4T4RJnpc"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("lens-auction-open-action"),
              logger: logger.child("lens-auction-open-action"),
              importFn,
            });
sources[0] = {
          name: 'lens-auction-open-action',
          handler: lensAuctionOpenActionHandler,
          transforms: lensAuctionOpenActionTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })
const documentHashMap = {
        "6a46e5843c71146ca364cafd5a44419dd1bbc6ee7591a0597356e91fd6f4ab2b": ActiveBidsQueryDocument,
"47a48ba8eeea0c0b613b2392f76a00579f2e84f0baef0d02f13b817e0409acad": BidsQueryDocument,
"27f758b17f0982280568cfea8e9f06394c8410215c08c3b7606a8fba6776f03a": AuctionsByCollectorIdDocument,
"7a4fc4a24adef0efeb228157a83afd04ec93711f8e83787d5c9645cd2af7941e": ExploreBidsFromAuctionsDocument,
"fe1dc5e947a2c5de49ebafe6295245aad36cd1b863dba55977dcecda39f0be04": ExploreBonsaiCreatedAuctionsDocument,
"37a36c60aaf81302d058b7800ea4091d7917fcc9e0e12af28fba482522c7dabb": ExploreSoldAuctionsDocument,
"afb35d199b489e5ee0ba7304ed1886edf890d004ab43feaffedbcca7ee666a70": GetCollectedAuctionsByProfileDocument
      }
additionalEnvelopPlugins.push(usePersistedOperations({
        getPersistedOperation(key) {
          return documentHashMap[key];
        },
        ...{}
      }))

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: ActiveBidsQueryDocument,
        get rawSDL() {
          return printWithCache(ActiveBidsQueryDocument);
        },
        location: 'ActiveBidsQueryDocument.graphql',
        sha256Hash: '6a46e5843c71146ca364cafd5a44419dd1bbc6ee7591a0597356e91fd6f4ab2b'
      },{
        document: BidsQueryDocument,
        get rawSDL() {
          return printWithCache(BidsQueryDocument);
        },
        location: 'BidsQueryDocument.graphql',
        sha256Hash: '47a48ba8eeea0c0b613b2392f76a00579f2e84f0baef0d02f13b817e0409acad'
      },{
        document: AuctionsByCollectorIdDocument,
        get rawSDL() {
          return printWithCache(AuctionsByCollectorIdDocument);
        },
        location: 'AuctionsByCollectorIdDocument.graphql',
        sha256Hash: '27f758b17f0982280568cfea8e9f06394c8410215c08c3b7606a8fba6776f03a'
      },{
        document: ExploreBidsFromAuctionsDocument,
        get rawSDL() {
          return printWithCache(ExploreBidsFromAuctionsDocument);
        },
        location: 'ExploreBidsFromAuctionsDocument.graphql',
        sha256Hash: '7a4fc4a24adef0efeb228157a83afd04ec93711f8e83787d5c9645cd2af7941e'
      },{
        document: ExploreBonsaiCreatedAuctionsDocument,
        get rawSDL() {
          return printWithCache(ExploreBonsaiCreatedAuctionsDocument);
        },
        location: 'ExploreBonsaiCreatedAuctionsDocument.graphql',
        sha256Hash: 'fe1dc5e947a2c5de49ebafe6295245aad36cd1b863dba55977dcecda39f0be04'
      },{
        document: ExploreSoldAuctionsDocument,
        get rawSDL() {
          return printWithCache(ExploreSoldAuctionsDocument);
        },
        location: 'ExploreSoldAuctionsDocument.graphql',
        sha256Hash: '37a36c60aaf81302d058b7800ea4091d7917fcc9e0e12af28fba482522c7dabb'
      },{
        document: GetCollectedAuctionsByProfileDocument,
        get rawSDL() {
          return printWithCache(GetCollectedAuctionsByProfileDocument);
        },
        location: 'GetCollectedAuctionsByProfileDocument.graphql',
        sha256Hash: 'afb35d199b489e5ee0ba7304ed1886edf890d004ab43feaffedbcca7ee666a70'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export const pollingInterval = null;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type ActiveBidsQueryQueryVariables = Exact<{
  endTimestamp: Scalars['BigInt']['input'];
}>;


export type ActiveBidsQueryQuery = { bidPlaceds: Array<Pick<BidPlaced, 'id' | 'profileId' | 'pubId' | 'referrerProfileIds' | 'amount' | 'bidderOwner' | 'bidderProfileId' | 'endTimestamp' | 'timestamp'>> };

export type BidsQueryQueryVariables = Exact<{
  profileId: Scalars['BigInt']['input'];
  pubId: Scalars['BigInt']['input'];
}>;


export type BidsQueryQuery = { bidPlaceds: Array<Pick<BidPlaced, 'id' | 'profileId' | 'pubId' | 'referrerProfileIds' | 'amount' | 'bidderOwner' | 'bidderProfileId' | 'endTimestamp' | 'timestamp'>> };

export type AuctionsByCollectorIdQueryVariables = Exact<{
  profileId: Scalars['BigInt']['input'];
}>;


export type AuctionsByCollectorIdQuery = { collecteds: Array<Pick<Collected, 'id' | 'collectedPubId' | 'collectedProfileId' | 'nftRecipient' | 'collectNFT' | 'tokenId' | 'timestamp' | 'transactionHash'>>, bidPlaceds: Array<Pick<BidPlaced, 'profileId' | 'amount' | 'pubId' | 'referrerProfileIds' | 'bidderOwner' | 'bidderProfileId' | 'endTimestamp' | 'timestamp'>> };

export type ExploreBidsFromAuctionsQueryVariables = Exact<{
  profileIds: Array<Scalars['BigInt']['input']> | Scalars['BigInt']['input'];
  pubIds: Array<Scalars['BigInt']['input']> | Scalars['BigInt']['input'];
  bidderProfileId: Array<Scalars['BigInt']['input']> | Scalars['BigInt']['input'];
}>;


export type ExploreBidsFromAuctionsQuery = { bidPlaceds: Array<Pick<BidPlaced, 'id' | 'profileId' | 'pubId' | 'referrerProfileIds' | 'amount' | 'bidderOwner' | 'bidderProfileId' | 'endTimestamp' | 'timestamp'>> };

export type ExploreBonsaiCreatedAuctionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ExploreBonsaiCreatedAuctionsQuery = { auctionCreateds: Array<Pick<AuctionCreated, 'id' | 'duration' | 'minBidIncrement' | 'minTimeAfterBid' | 'onlyFollowers' | 'profileId' | 'pubId' | 'reservePrice' | 'tokenName' | 'tokenRoyalty' | 'tokenSymbol' | 'blockTimestamp' | 'availableSinceTimestamp'>> };

export type ExploreSoldAuctionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ExploreSoldAuctionsQuery = { collecteds: Array<Pick<Collected, 'id' | 'collectedPubId' | 'collectedProfileId' | 'nftRecipient' | 'collectNFT' | 'tokenId' | 'timestamp' | 'transactionHash' | 'collectorProfileId'>> };

export type GetCollectedAuctionsByProfileQueryVariables = Exact<{
  profileId: Scalars['BigInt']['input'];
}>;


export type GetCollectedAuctionsByProfileQuery = { collecteds: Array<Pick<Collected, 'id' | 'collectedPubId' | 'collectedProfileId' | 'nftRecipient' | 'collectNFT' | 'tokenId' | 'timestamp' | 'transactionHash' | 'collectorProfileId'>> };


export const ActiveBidsQueryDocument = gql`
    query ActiveBidsQuery($endTimestamp: BigInt!) {
  bidPlaceds(where: {endTimestamp_gt: $endTimestamp}) {
    id
    profileId
    pubId
    referrerProfileIds
    amount
    bidderOwner
    bidderProfileId
    endTimestamp
    timestamp
  }
}
    ` as unknown as DocumentNode<ActiveBidsQueryQuery, ActiveBidsQueryQueryVariables>;
export const BidsQueryDocument = gql`
    query BidsQuery($profileId: BigInt!, $pubId: BigInt!) {
  bidPlaceds(where: {profileId: $profileId, pubId: $pubId}) {
    id
    profileId
    pubId
    referrerProfileIds
    amount
    bidderOwner
    bidderProfileId
    endTimestamp
    timestamp
  }
}
    ` as unknown as DocumentNode<BidsQueryQuery, BidsQueryQueryVariables>;
export const AuctionsByCollectorIdDocument = gql`
    query AuctionsByCollectorId($profileId: BigInt!) {
  collecteds(where: {collectorProfileId: $profileId}) {
    id
    collectedPubId
    collectedProfileId
    nftRecipient
    collectNFT
    tokenId
    timestamp
    transactionHash
  }
  bidPlaceds(where: {bidderProfileId: $profileId}) {
    profileId
    amount
    pubId
    referrerProfileIds
    bidderOwner
    bidderProfileId
    endTimestamp
    timestamp
  }
}
    ` as unknown as DocumentNode<AuctionsByCollectorIdQuery, AuctionsByCollectorIdQueryVariables>;
export const ExploreBidsFromAuctionsDocument = gql`
    query ExploreBidsFromAuctions($profileIds: [BigInt!]!, $pubIds: [BigInt!]!, $bidderProfileId: [BigInt!]!) {
  bidPlaceds(
    where: {profileId_in: $profileIds, pubId_in: $pubIds, bidderProfileId_in: $bidderProfileId}
    orderBy: timestamp
    orderDirection: desc
  ) {
    id
    profileId
    pubId
    referrerProfileIds
    amount
    bidderOwner
    bidderProfileId
    endTimestamp
    timestamp
  }
}
    ` as unknown as DocumentNode<ExploreBidsFromAuctionsQuery, ExploreBidsFromAuctionsQueryVariables>;
export const ExploreBonsaiCreatedAuctionsDocument = gql`
    query ExploreBonsaiCreatedAuctions {
  auctionCreateds(
    where: {currency: "0x3d2bD0e15829AA5C362a4144FdF4A1112fa29B5c"}
    orderBy: blockTimestamp
    orderDirection: desc
  ) {
    id
    duration
    minBidIncrement
    minTimeAfterBid
    onlyFollowers
    profileId
    pubId
    reservePrice
    tokenName
    tokenRoyalty
    tokenSymbol
    blockTimestamp
    availableSinceTimestamp
  }
}
    ` as unknown as DocumentNode<ExploreBonsaiCreatedAuctionsQuery, ExploreBonsaiCreatedAuctionsQueryVariables>;
export const ExploreSoldAuctionsDocument = gql`
    query ExploreSoldAuctions {
  collecteds {
    id
    collectedPubId
    collectedProfileId
    nftRecipient
    collectNFT
    tokenId
    timestamp
    transactionHash
    collectorProfileId
  }
}
    ` as unknown as DocumentNode<ExploreSoldAuctionsQuery, ExploreSoldAuctionsQueryVariables>;
export const GetCollectedAuctionsByProfileDocument = gql`
    query GetCollectedAuctionsByProfile($profileId: BigInt!) {
  collecteds(where: {collectorProfileId: $profileId}) {
    id
    collectedPubId
    collectedProfileId
    nftRecipient
    collectNFT
    tokenId
    timestamp
    transactionHash
    collectorProfileId
  }
}
    ` as unknown as DocumentNode<GetCollectedAuctionsByProfileQuery, GetCollectedAuctionsByProfileQueryVariables>;








export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    ActiveBidsQuery(variables: ActiveBidsQueryQueryVariables, options?: C): Promise<ActiveBidsQueryQuery> {
      return requester<ActiveBidsQueryQuery, ActiveBidsQueryQueryVariables>(ActiveBidsQueryDocument, variables, options) as Promise<ActiveBidsQueryQuery>;
    },
    BidsQuery(variables: BidsQueryQueryVariables, options?: C): Promise<BidsQueryQuery> {
      return requester<BidsQueryQuery, BidsQueryQueryVariables>(BidsQueryDocument, variables, options) as Promise<BidsQueryQuery>;
    },
    AuctionsByCollectorId(variables: AuctionsByCollectorIdQueryVariables, options?: C): Promise<AuctionsByCollectorIdQuery> {
      return requester<AuctionsByCollectorIdQuery, AuctionsByCollectorIdQueryVariables>(AuctionsByCollectorIdDocument, variables, options) as Promise<AuctionsByCollectorIdQuery>;
    },
    ExploreBidsFromAuctions(variables: ExploreBidsFromAuctionsQueryVariables, options?: C): Promise<ExploreBidsFromAuctionsQuery> {
      return requester<ExploreBidsFromAuctionsQuery, ExploreBidsFromAuctionsQueryVariables>(ExploreBidsFromAuctionsDocument, variables, options) as Promise<ExploreBidsFromAuctionsQuery>;
    },
    ExploreBonsaiCreatedAuctions(variables?: ExploreBonsaiCreatedAuctionsQueryVariables, options?: C): Promise<ExploreBonsaiCreatedAuctionsQuery> {
      return requester<ExploreBonsaiCreatedAuctionsQuery, ExploreBonsaiCreatedAuctionsQueryVariables>(ExploreBonsaiCreatedAuctionsDocument, variables, options) as Promise<ExploreBonsaiCreatedAuctionsQuery>;
    },
    ExploreSoldAuctions(variables?: ExploreSoldAuctionsQueryVariables, options?: C): Promise<ExploreSoldAuctionsQuery> {
      return requester<ExploreSoldAuctionsQuery, ExploreSoldAuctionsQueryVariables>(ExploreSoldAuctionsDocument, variables, options) as Promise<ExploreSoldAuctionsQuery>;
    },
    GetCollectedAuctionsByProfile(variables: GetCollectedAuctionsByProfileQueryVariables, options?: C): Promise<GetCollectedAuctionsByProfileQuery> {
      return requester<GetCollectedAuctionsByProfileQuery, GetCollectedAuctionsByProfileQueryVariables>(GetCollectedAuctionsByProfileDocument, variables, options) as Promise<GetCollectedAuctionsByProfileQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;