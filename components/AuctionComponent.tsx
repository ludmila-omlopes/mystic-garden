'use client';

import { useEffect, useState } from 'react';
import { fetchModuleMetadata, getModuleSettings, decodeInitData, processModuleAction } from '../app/api/lib/lensModuleUtils';
import { parseAuctionInitData, AuctionInitData } from '../lib/parseAuctionData';

const AuctionComponent = ({ publicationId }) => {
    const OPEN_ACTION_MODULE_ADDRESS = '0x857b5e09d54AD26580297C02e4596537a2d3E329';

    const [metadata, setMetadata] = useState(null);
    const [settings, setSettings] = useState(null);
    const [parsedInitData, setParsedInitData] = useState<AuctionInitData | null>(null);
    const [initResult, setInitResult] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedMetadata = await fetchModuleMetadata(OPEN_ACTION_MODULE_ADDRESS); //toda a informação sobre o módulo
      const fetchedSettings = await getModuleSettings(publicationId, OPEN_ACTION_MODULE_ADDRESS); //é o que vai ser decoded

      if (fetchedMetadata && fetchedSettings) {
        const { initData } = await decodeInitData(fetchedSettings, fetchedMetadata);  
        const parsedAuctionInitData = parseAuctionInitData(initData);
        setParsedInitData(parsedAuctionInitData)
      }
    }

    fetchData();
  }, [publicationId]);

  const handleAction = async () => {
    //await processModuleAction(publicationId);
  };

  return (
    <div>
      <button onClick={handleAction}>Execute Auction Collect Action</button>
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
