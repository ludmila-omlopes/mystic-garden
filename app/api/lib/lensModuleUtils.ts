import { LensClient, development, production } from '@lens-protocol/client';
import { decodeData, encodeData } from '@lens-protocol/client';
import {isUnknownOpenActionModuleSettings, UnknownOpenActionModuleSettingsFragment } from '@lens-protocol/client';

const lensClient = new LensClient({
    environment: process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? production : development,
  });

export async function fetchModuleMetadata(moduleAddress: string) {
  const result = await lensClient.modules.fetchMetadata({
    implementation: moduleAddress
  });

  if (result === null) {
    console.error('Specified address is not registered');
    return null;
  }

  return result.metadata;
}

export async function getModuleSettings(publicationId: string, moduleAddress: string) {
  const publication = await lensClient.publication.fetch({
    forId: publicationId,
  });

  if(!publication || publication.__typename === 'Mirror'){
    return null;
  }

  const settings = publication.openActionModules.find(
    (module): module is UnknownOpenActionModuleSettingsFragment =>
      isUnknownOpenActionModuleSettings(module) && module.contract.address === moduleAddress,
  );

  return settings;
}

export async function decodeInitData(settings, metadata) {
  const initData = decodeData(
    JSON.parse(metadata.initializeCalldataABI),
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

export async function processModuleAction(publicationId: string, moduleAddress: string) {
  const metadata = await fetchModuleMetadata(moduleAddress);
  const settings = await getModuleSettings(publicationId, moduleAddress);

  if (!metadata || !settings) return;

  const calldata = encodeData(
    JSON.parse(metadata.processCalldataABI),
    [/* data according to ABI spec */]
  );

  const result = await lensClient.publication.actions.actOn({
    actOn: {
      unknownOpenAction: {
        address: moduleAddress,
        data: calldata
      }
    },
    for: publicationId,
  });

  console.log(result);
}
