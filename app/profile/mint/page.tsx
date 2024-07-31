'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession, SessionType, useProfile, useLazyProfile, ProfileId } from '@lens-protocol/react-web';
import { useValidateHandle, useCreateProfile } from "@lens-protocol/react-web";
import Particles from "@/components/magicui/particles";
import Image from 'next/image';
import { ClipLoader } from 'react-spinners';
import { useAccount, useChains } from 'wagmi';
import { validateChainId } from '@/lib/utils';
import { awardPoints } from '@/lib/utils';
import { NEW_PROFILE_AWARD, NEW_PROFILE_AWARD_REFERRAL } from '@/app/constants';

export default function OnboardingPage() {
  const [handle, setHandle] = useState('');
  const [isHandleAvailable, setIsHandleAvailable] = useState<boolean | null>(null);
  const { execute: validateHandle, loading: verifying } = useValidateHandle();
  const { execute: createProfile, loading: creating } = useCreateProfile();
  const { address, chain } = useAccount();
  const [referralCode, setReferralCode] = useState('');
  const [referralHandle, setReferralHandle] = useState<string | null>(null);
  const [referralError, setReferralError] = useState<string | null>(null);
  const { called, data, error, loading, execute: fetchProfile } = useLazyProfile();

  const checkHandleAvailability = async () => {
    const result = await validateHandle({ localName: handle });

    if (result.isFailure()) {
      setIsHandleAvailable(false);
    } else {
      setIsHandleAvailable(true);
    }
  };

  const verifyReferralCode = async () => {
    try {
      const result = await fetchProfile({ forProfileId: referralCode as ProfileId });
      if (result && result.isSuccess()) {
        const profile = result.value;
        setReferralHandle(profile.handle?.suggestedFormatted?.localName || referralCode);
        setReferralError(null);
      } else {
        setReferralHandle(null);
        setReferralError('Referral code is not valid.');
      }
    } catch (error) {
      setReferralHandle(null);
      setReferralError('Referral code is not valid.');
    }
  };

  const mintProfile = async () => {
    validateChainId();
    
    if (!address) {
      window.alert('Please connect your wallet to mint your profile.');
      return;
    }

    const result = await createProfile({ localName: handle, to: address });

    if (result.isFailure()) {
      window.alert(result.error.message);
      return;
    }

    const profile = result.value;
    window.alert(`Congratulations! You now own: ${profile.handle?.fullHandle}!`);

    await awardPoints(address, NEW_PROFILE_AWARD, 'New Profile', null);

    // Award points for the referral, if any
    if (referralHandle) {
      await awardPoints(referralCode, NEW_PROFILE_AWARD_REFERRAL, 'Referral Bonus', null);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-24">
        <div className="max-w-[800px] w-full space-y-8">
          <div className="relative text-center space-y-2">
            <Image src="/images/door-bg.webp" alt="Background" layout="fill" className="absolute inset-0 w-full h-full object-cover opacity-50" />
            <Particles className="absolute inset-0" quantity={100} ease={80} color="#ffffff" refresh />
            <div className="relative">
              <h1 className="text-4xl font-bold">Welcome to Lens Protocol</h1>
              <p className="text-muted-foreground text-lg">Mint your decentralized social profile in just a few steps.</p>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 md:p-10 space-y-6 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="aspect-square w-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-medium">Connect Wallet</h3>
                  <p className="text-muted-foreground text-sm">Connect your Ethereum wallet to get started.</p>
                </div>
              </div>
              <w3m-button />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="aspect-square w-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-medium">Choose Handle</h3>
                  <p className="text-muted-foreground text-sm">Select a unique handle for your Lens profile.</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full max-w-[400px]">
                <div className="flex items-center gap-2">
                  <Input placeholder="Enter handle" value={handle} onChange={(e) => setHandle(e.target.value)} className="flex-1" />
                  <Button variant="outline" onClick={checkHandleAvailability} disabled={!handle || verifying}>
                    {verifying ? <ClipLoader size={20} color={"#000"} /> : 'Check Availability'}
                  </Button>
                </div>
                {isHandleAvailable !== null && (
                  <p className={`text-sm ${isHandleAvailable ? 'text-green-500' : 'text-red-500'}`}>
                    {isHandleAvailable ? 'Handle is available!' : 'Handle is not available.'}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="aspect-square w-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-medium">Referral Code</h3>
                  <p className="text-muted-foreground text-sm">Enter a referral code (optional).</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full max-w-[400px]">
                <div className="flex items-center gap-2">
                  <Input placeholder="Enter referral code" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} className="flex-1" />
                  <Button variant="outline" onClick={verifyReferralCode} disabled={!referralCode}>
                    Verify Code
                  </Button>
                </div>
                {referralHandle && (
                  <p className="text-sm text-green-500">Referral code is valid! Handle: {referralHandle}</p>
                )}
                {referralError && (
                  <p className="text-sm text-red-500">{referralError}</p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="aspect-square w-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-medium">Mint Profile</h3>
                  <p className="text-muted-foreground text-sm">Finalize your Lens profile by minting it. This costs 8 MATIC.</p>
                </div>
              </div>
              <Button onClick={mintProfile} disabled={!address || !isHandleAvailable || verifying || creating}>
                {creating ? <ClipLoader size={20} color={"#000"} /> : 'Mint Profile'}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
