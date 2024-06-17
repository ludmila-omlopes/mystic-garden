'use client';

import { useEffect, useState } from 'react';
import { decodeInitData, encodeBidData } from '../app/api/lib/lensModuleUtils';
import { parseAuctionInitData, AuctionInitData } from '../lib/parseAuctionData';
import { useLazyModuleMetadata, useProfiles, Post } from "@lens-protocol/react-web";
import { UnknownOpenActionModuleSettings } from "@lens-protocol/react-web";
import { BigNumber } from 'ethers';
import { AuctionButton } from './AuctionButton';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';

const AuctionComponent = ({ post }: { post: Post }) => {
  const OPEN_ACTION_MODULE_ADDRESS = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? '0x857b5e09d54AD26580297C02e4596537a2d3E329' : '0xd935e230819AE963626B31f292623106A3dc3B19';

  const [calldata, setCalldata] = useState<string | null>(null);
  const [parsedInitData, setParsedInitData] = useState<AuctionInitData | null>(null);
  const [moduleMetadata, setModuleMetadata] = useState<any | null>(null);
  const [expandedAddress, setExpandedAddress] = useState<string | null>(null);

  const { execute } = useLazyModuleMetadata();

  async function fetchModuleMetadata(moduleAddress: string) {
    const result = await execute({ implementation: moduleAddress });

    if (result.isFailure()) {
      console.error(result.error.message);
      return null;
    }

    const { metadata } = result.value;
    return metadata;
  }

  async function getModuleSettings(post: Post, moduleAddress: string) {
    const settings = post.openActionModules.find(
      (module): module is UnknownOpenActionModuleSettings =>
        module.__typename === "UnknownOpenActionModuleSettings" &&
        module.contract.address === moduleAddress,
    );

    return settings || null;
  }

  useEffect(() => {
    async function fetchData() {
      const fetchedMetadata = await fetchModuleMetadata(OPEN_ACTION_MODULE_ADDRESS);
      const fetchedSettings = await getModuleSettings(post, OPEN_ACTION_MODULE_ADDRESS);

      if (fetchedMetadata && fetchedSettings) {
        setModuleMetadata(fetchedMetadata);

        const { initData } = await decodeInitData(fetchedSettings, fetchedMetadata);
        const parsedAuctionInitData = parseAuctionInitData(initData);
        setParsedInitData(parsedAuctionInitData);
      }
    }

    fetchData();
  }, [post]);

  useEffect(() => {
    async function generateCalldata() {
      if (parsedInitData && moduleMetadata) {
        const amount = BigNumber.from(0); // Placeholder for the bid amount
        const encodedCalldata = await encodeBidData(moduleMetadata, amount);
        setCalldata(encodedCalldata);
      }
    }

    generateCalldata();
  }, [parsedInitData, moduleMetadata]);

  const recipientAddresses = parsedInitData?.recipients.map(r => r.recipient) || [];
  const { data: profilesData, loading, error } = useProfiles({ where: { ownedBy: recipientAddresses } });

  const profiles = profilesData || [];

  if (!parsedInitData) {
    return <div>Loading...</div>;
  }

  const auctionEnd = new Date(parsedInitData.availableSinceTimestamp.getTime() + parsedInitData.duration * 1000);
  const timeLeft = formatDistanceToNow(auctionEnd, { includeSeconds: true });

  return (
    <section className="bg-gray-100 dark:bg-gray-800 p-6 md:p-8 rounded-lg">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Auction Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Minting Start</div>
                <div className="text-base font-semibold">{parsedInitData.availableSinceTimestamp.toUTCString()}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Reserve Price</div>
                <div className="text-base font-semibold">{parsedInitData.reservePrice.toString()} ETH</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Referral Fee</div>
                <div className="text-base font-semibold">{parsedInitData.referralFee / 100}%</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Royalty</div>
                <div className="text-base font-semibold">{parsedInitData.tokenRoyalty / 100}%</div>
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Auction Countdown</h3>
            <div className="text-base font-semibold">{timeLeft}</div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Recipients</h3>
            <div className="grid gap-2">
              {parsedInitData.recipients.map((recipient, index) => {
                const profile = profiles.find(p => String(p.ownedBy.address) === recipient.recipient);
                const addressDisplay = expandedAddress === recipient.recipient
                  ? recipient.recipient
                  : `${recipient.recipient.slice(0, 6)}...${recipient.recipient.slice(-4)}`;
                const handleDisplay = profile ? profile.handle?.localName : addressDisplay;
                const fallbackText = profile
                  ? profile.handle?.localName.slice(0, 2).toUpperCase()
                  : recipient.recipient.slice(-2).toUpperCase();

                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8 border">
                        <AvatarImage src={profile && profile.metadata && profile.metadata.picture && 'optimized' in profile.metadata.picture ? profile.metadata?.picture?.optimized?.uri : "/placeholder-user.jpg"} />
                        <AvatarFallback>{fallbackText}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{handleDisplay}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {addressDisplay}
                          {expandedAddress !== recipient.recipient && (
                            <button onClick={() => setExpandedAddress(recipient.recipient)} className="ml-2 text-blue-500">
                              Expand
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-base font-semibold">{recipient.split / 100}%</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold">Followers Only</h3>
            <div className="text-base font-semibold">{parsedInitData.onlyFollowers ? "Yes" : "No"}</div>
          </div>
          <AuctionButton address={OPEN_ACTION_MODULE_ADDRESS} data={String(calldata)} publication={post} />
        </div>
      </div>
    </section>
  );
};

export default AuctionComponent;
