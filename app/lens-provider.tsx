'use client'

import { LensProvider as Provider, LensConfig, production, development } from '@lens-protocol/react-web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import { wagmiConfig } from './web3modal-provider';

const lensConfig: LensConfig = {
  bindings: wagmiBindings(wagmiConfig),
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? production : development,
};

export function LensProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider config={lensConfig}>
      {children}
    </Provider>
  );
}