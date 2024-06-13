'use client';

import { useEffect, useState } from 'react';
import {  decodeInitData, encodeBidData } from '../app/api/lib/lensModuleUtils';
import { parseAuctionInitData, AuctionInitData } from '../lib/parseAuctionData';
import { useLazyModuleMetadata, Post } from "@lens-protocol/react-web";
import { UnknownOpenActionModuleSettings } from "@lens-protocol/react-web";
import { encodeData, ModuleParam, Data, ModuleMetadata } from "@lens-protocol/react-web";
import { AnyPublication, OpenActionKind, useOpenAction } from '@lens-protocol/react-web';
import { AuctionButton } from './AuctionButton';
import { BigNumber, ethers } from 'ethers';

const AuctionComponent = ({ post }) => {
    const OPEN_ACTION_MODULE_ADDRESS = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? '0x857b5e09d54AD26580297C02e4596537a2d3E329' : '0xd935e230819AE963626B31f292623106A3dc3B19';

    const [calldata, setCalldata] = useState<Data | null>(null);
    const [settings, setSettings] = useState(null);
    const [parsedInitData, setParsedInitData] = useState<AuctionInitData | null>(null);
    const [moduleMetadata, setModuleMetadata] = useState<ModuleMetadata | null>(null);
    const [initResult, setInitResult] = useState(null);

    const { execute } = useLazyModuleMetadata();

    async function fetchModuleMetadata(moduleAddress: string) {
      const result = await execute({ implementation: moduleAddress });
    
      if (result.isFailure()) {
        console.error(result.error.message);
        return;
      }
    
      const { metadata, sponsoredApproved, signlessApproved, verified } =
      result.value;
    
      return metadata;
    }

    async function getModuleSettings(post: Post, moduleAddress: string) {
      const settings = post.openActionModules.find(
        (module): module is UnknownOpenActionModuleSettings =>
          module.__typename === "UnknownOpenActionModuleSettings" &&
          module.contract.address === moduleAddress
    );
    
          return settings;
    }

  useEffect(() => {
    async function fetchData() {
      const fetchedMetadata = await fetchModuleMetadata(OPEN_ACTION_MODULE_ADDRESS); //toda a informação sobre o módulo
      const fetchedSettings = await getModuleSettings(post, OPEN_ACTION_MODULE_ADDRESS); //é o que vai ser decoded

      if (fetchedMetadata && fetchedSettings) {
        const { initData } = await decodeInitData(fetchedSettings, fetchedMetadata);  
        const parsedAuctionInitData = parseAuctionInitData(initData);
        setParsedInitData(parsedAuctionInitData)
        setModuleMetadata(fetchedMetadata);
      }
    }

    fetchData();
  }, [post]);

  useEffect(() => { 
    async function fetchData() {
    if (parsedInitData) {      
      const amount = BigNumber.from(0)//substituir pelo amount do bid 
      const encodedCalldata = await encodeBidData(moduleMetadata, amount); 
      setCalldata(encodedCalldata);
      console.log("calldata = " + JSON.stringify(encodedCalldata));
    }
  }
  fetchData();
}, [parsedInitData]);


  return (
    <div>
      <AuctionButton address={OPEN_ACTION_MODULE_ADDRESS} data={String(calldata)} publication={post} />
        <div>
            <div>Since: {String(parsedInitData?.availableSinceTimestamp)}</div>
            <div>Moeda: {String(parsedInitData?.currency)}</div>
            <div>Reserved price: {String(parsedInitData?.reservePrice)}</div>
            <div>Min bid increment: {String(parsedInitData?.minBidIncrement)}</div>
            <div>Referral fee: {String(parsedInitData?.referralFee)}</div>
            <div>Token name: {String(parsedInitData?.tokenName)}</div>
            <div>Token symbol: {String(parsedInitData?.tokenSymbol)}</div>
            <div>Token royalty: {String(parsedInitData?.tokenRoyalty)}</div>
            <div>Duration: {String(parsedInitData?.duration)}</div>
            <div>Min time after bid: {String(parsedInitData?.minTimeAfterBid)}</div>
            <div>Recipients: {JSON.stringify(parsedInitData?.recipients[0])}</div>
            <div>Only followers: {String(parsedInitData?.onlyFollowers)}</div>
        </div>
    </div>
  );
};



export default AuctionComponent;
