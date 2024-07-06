'use client';

import { useEffect, useState } from 'react';
import { decodeInitData, encodeBidData } from '../app/api/lib/lensModuleUtils';
import { parseAuctionInitData, AuctionInitData } from '../lib/parseAuctionData';
import { useLazyModuleMetadata, Post, profileId, useProfile, SessionType, useSession } from "@lens-protocol/react-web";
import { UnknownOpenActionModuleSettings } from "@lens-protocol/react-web";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow, formatDistanceStrict, formatDistance } from 'date-fns';
import AuctionBids from './AuctionBids';
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { AuctionButton } from './AuctionButton';
import { useReadAuctionsOaGetAuctionData } from '@/src/generated';
import { parseFromLensHex } from '@/lib/utils';
import AuctionClaimButton from './AuctionClaimButton';
import { REV_WALLET } from '@/app/constants';

const AuctionComponent = ({ post }: { post: Post }) => {
    const OPEN_ACTION_MODULE_ADDRESS = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? '0x857b5e09d54AD26580297C02e4596537a2d3E329' : '0xd935e230819AE963626B31f292623106A3dc3B19';

    const [calldata, setCalldata] = useState<string | null>(null);
    const [parsedInitData, setParsedInitData] = useState<AuctionInitData | null>(null);
    const [moduleMetadata, setModuleMetadata] = useState<any | null>(null);
    const [isFetchingMetadata, setIsFetchingMetadata] = useState(false);
    const [bidAmount, setBidAmount] = useState<string>('');
    const { data: sessionData } = useSession();

    const { execute } = useLazyModuleMetadata();
    const intPublicationId = parseFromLensHex(post.id);

    const { data: auctionData, error: auctionError } = useReadAuctionsOaGetAuctionData({
        args: [intPublicationId.profileId, intPublicationId.publicationId],
        chainId: process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? 137 : 80002,  //amoy 80002  polygon 137
    });

    async function fetchModuleMetadata(moduleAddress: string) {
        if (isFetchingMetadata) return;
        setIsFetchingMetadata(true);
        const result = await execute({ implementation: moduleAddress });

        setIsFetchingMetadata(false);

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
                console.log("minBidIncrement =" + parsedAuctionInitData.minBidIncrement);
            }
        }

        fetchData();
    }, [post]);

    useEffect(() => {
        async function generateCalldata() {
            if (parsedInitData && moduleMetadata) {
                const amount = BigInt(bidAmount); // Use the bid amount input by the user
                const encodedCalldata = await encodeBidData(moduleMetadata, amount);
                setCalldata(encodedCalldata);
            }
        }

        generateCalldata();
    }, [parsedInitData, moduleMetadata, bidAmount]);

    if (!parsedInitData) {
        return <div>Loading...</div>;
    }

    if (auctionError) {
        return <div>Error: {auctionError.message}</div>;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const availableSinceTimestamp = auctionData ? Number(auctionData.availableSinceTimestamp) : 0;
    const startTimestamp = auctionData ? Number(auctionData.startTimestamp) : 0;
    const endTimestamp = auctionData ? Number(auctionData.endTimestamp) : 0;
    const auctionEnd = auctionData ? new Date(endTimestamp * 1000) : new Date();
    const auctionStart = auctionData ? new Date(availableSinceTimestamp * 1000) : new Date();
    const winningBid = auctionData ? (auctionData.winningBid / BigInt(10 ** 18)).toString() : '0';

    let auctionStatus = "Not started";
    let timeLeft = formatDistanceToNow(auctionStart, { includeSeconds: true });

    if (auctionData && currentTime >= availableSinceTimestamp) {
        if (startTimestamp === 0) {
            auctionStatus = "Active but not started";
        } else if (currentTime <= endTimestamp) {
            auctionStatus = "Active auction";
            timeLeft = formatDistanceToNow(auctionEnd, { includeSeconds: true });
        } else if (auctionData.winnerProfileId !== 0n && !auctionData.collected) {
            auctionStatus = "Auction ended, pending collection";
        } else if (auctionData.collected) {
            auctionStatus = "Art collected";
        }
    }

    if (auctionStatus === "Not started" && currentTime < availableSinceTimestamp && (availableSinceTimestamp - currentTime) < 86400) {
        timeLeft = formatDistance(currentTime * 1000, auctionStart, { includeSeconds: true });
    }

    const isWinner = auctionStatus === "Auction ended, pending collection" && sessionData?.type === SessionType.WithProfile && sessionData?.profile.id === auctionData?.winnerProfileId.toString();

    return (
        <div className="md:col-span-1">
            <div className="bg-card rounded-lg">
                {auctionStatus === "Not started" && (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-sm font-medium">Reserve Price</p>
                                <p className="text-lg font-bold">{(parsedInitData.reservePrice ).toString()} BONSAI</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Minimum Bid Increment</p>
                                <p className="text-lg font-bold">{(parsedInitData.minBidIncrement).toString()} BONSAI</p>
                            </div>
                        </div>
                        <div className="bg-muted p-4 rounded-md mb-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Auction Starts In</p>
                                <div className="flex items-center gap-2">
                                    <div className="bg-primary text-primary-foreground rounded-md px-2 py-1 text-xs font-medium">{timeLeft}</div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {auctionStatus === "Active but not started" && (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-sm font-medium">Reserve Price</p>
                                <p className="text-lg font-bold">{(parsedInitData.reservePrice).toString()} BONSAI</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Minimum Bid Increment</p>
                                <p className="text-lg font-bold">{(parsedInitData.minBidIncrement).toString()} BONSAI</p>
                            </div>
                        </div>
                        <div className="bg-muted p-4 rounded-md mb-4">
                            <div className="text-center">
                                <p className="text-sm font-medium">Auction not started, place the first bid</p>
                            </div>
                        </div>
                        <Input
                            id="bidAmount"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            placeholder="Enter your bid amount"
                            type="number"
                            className="mb-4"
                        />
                        <AuctionButton address={OPEN_ACTION_MODULE_ADDRESS} data={String(calldata)} publication={post} disabled={!sessionData?.authenticated} />
                    </>
                )}
                {auctionStatus === "Active auction" ? (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-sm font-medium">Reserve Price</p>
                                <p className="text-lg font-bold">{(parsedInitData.reservePrice).toString()} BONSAI</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Minimum Bid Increment</p>
                                <p className="text-lg font-bold">{(parsedInitData.minBidIncrement).toString()} BONSAI</p>
                            </div>
                        </div>
                        <div className="bg-muted p-4 rounded-md mb-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">Auction Ends In</p>
                                <div className="flex items-center gap-2">
                                    <div className="bg-primary text-primary-foreground rounded-md px-2 py-1 text-xs font-medium">{timeLeft}</div>
                                </div>
                            </div>
                        </div>
                        <Input
                            id="bidAmount"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            placeholder="Enter your bid amount"
                            type="number"
                            className="mb-4"
                        />
                        <AuctionButton address={OPEN_ACTION_MODULE_ADDRESS} data={String(calldata)} publication={post} disabled={!sessionData?.authenticated} />
                        {!sessionData?.authenticated && (
                            <p className="text-sm text-red-500">Login to Lens first</p>
                        )}
                    </>
                ) : auctionStatus === "Auction ended, pending collection" || auctionStatus === "Art collected" ? (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-lg font-bold">Sold: {winningBid} BONSAI</p>
                            </div>
                        </div>
                        {isWinner && <AuctionClaimButton collectedPubId={post.id} />}
                    </>
                ) : null}
                <Separator className="my-8" />
                <Tabs defaultValue="details" className="mt-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="activity">Activity</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details">
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-semibold">Recipients</h3>
                                <Badge variant="secondary">{parsedInitData.onlyFollowers ? "Followers only" : "Public"}</Badge>
                            </div>
                            <div className="mb-4">
                                {parsedInitData.recipients.map((recipient, index) => (
                                    <div key={index} className="flex items-center gap-4 mb-2">
                                        <Avatar>
                                            <AvatarImage src="/placeholder-user.jpg" />
                                            <AvatarFallback>{recipient.recipient.slice(-2)}</AvatarFallback>
                                        </Avatar>
                                        <div className="text-xs">
                                            {recipient.recipient === REV_WALLET 
                                                ? "Mystic Garden Minting Fee" 
                                                : `${recipient.recipient.slice(0, 10)}...`}
                                        </div>
                                        <div className="text-xs">{recipient.split / 100}%</div>
                                    </div>
                                ))}
                            </div>
                            <div className="mb-4">
                                <h3 className="text-base font-semibold mb-2">Referral Fee</h3>
                                <p className="text-xs">{parsedInitData.referralFee / 100}%</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-base font-semibold mb-2">Royalty</h3>
                                <p className="text-xs">{parsedInitData.tokenRoyalty / 100}%</p>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="activity">
                        <div className="p-4">
                            <AuctionBids auctionId={post.id} auctionStatus={auctionStatus} winningBid={winningBid} winnerProfileId={auctionData?.winnerProfileId} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default AuctionComponent;
