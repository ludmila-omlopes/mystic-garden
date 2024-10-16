// lensGraphql.ts
import { gql } from '@apollo/client';
import client from './apolloClient';
import { ProfileId } from '@lens-protocol/metadata';
import { AUCTION_OPEN_ACTION_MODULE_ADDRESS } from '../constants';

const auctionsOaAddress = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? '0x857b5e09d54AD26580297C02e4596537a2d3E329' : '0xd935e230819AE963626B31f292623106A3dc3B19';

const GET_AUCTIONS = gql`
  query Publications($request: PublicationsRequest!) {
    publications(request: $request) {
      items {
        ... on Post {
          id
          metadata {
            ... on VideoMetadataV3 {
              asset {
                cover {
                  optimized {
                    uri
                  }
                }
                video {
                  optimized {
                    uri
                  }
                }
              }
              title
              hideFromFeed
            }
            ... on ImageMetadataV3 {
              asset {
                image {
                  optimized {
                    uri
                  }
                }
              }
              title
              hideFromFeed
            }
            ... on AudioMetadataV3 {
              asset {
                cover {
                  optimized {
                    uri
                  }
                }
                audio {
                  optimized {
                    uri
                  }
                }
              }
              title
              hideFromFeed
            }
          }
          createdAt
          by {
            id
            handle {
              localName
              suggestedFormatted {
                localName
              }
            }
            metadata {
              picture {
                ... on ImageSet {
                  optimized {
                    uri
                  }
                }
                ... on NftImage {
                  image {
                    optimized {
                      uri
                    }
                  }
                }
              }
            }
          }
        }
      }
      pageInfo {
        next
        prev
      }
    }
  }
`;

export async function getAuctions(cursor: string | null = null) {
  const variables = {
    request: {
      where: {
        withOpenActions: [
          {
            address: auctionsOaAddress
          }
        ]
      },
      limit: "TwentyFive",
      cursor
    }
  };

  const { data } = await client.query({
    query: GET_AUCTIONS,
    variables,
    fetchPolicy: 'no-cache' // Disable caching
  });

  return data;
}

export async function getAuctionsByProfile(profileId: string) {
  const variables = {
    request: {
      where: {
        from: profileId,
        withOpenActions: [
          {
            address: auctionsOaAddress
          }
        ]
      }
    }
  };

  const { data } = await client.query({
    query: GET_AUCTIONS,
    variables
  });

  return data;
}

const GET_PUBLICATIONS_BY_IDS = gql`
  query Publications($request: PublicationsRequest!) {
    publications(request: $request) {
      items {
        ... on Post {
        createdAt
          metadata {
            ... on VideoMetadataV3 {
              id
              title
              tags
              content
              asset {
                video {
                  optimized {
                    uri
                  }
                }
                cover {
                  optimized {
                    uri
                  }
                }
              }
              marketplace {
                description
                externalURL
                animationUrl
                name
              }
            }
            ... on ImageMetadataV3 {
              title
              id
              content
              asset {
                image {
                  optimized {
                    uri
                  }
                }
              }
              marketplace {
                description
                externalURL
                name
                animationUrl
              }
            }
            ... on AudioMetadataV3 {
              title
              id
              content
              asset {
                cover {
                  optimized {
                    uri
                  }
                }
                audio {
                  optimized {
                    uri
                  }
                }
              }
              marketplace {
                description
                externalURL
                name
                animationUrl
              }
            }
            ... on TextOnlyMetadataV3 {
              content
              marketplace {
                name
              }
            }
          }
          openActionModules {
            ... on SimpleCollectOpenActionSettings {
              type
              contract {
                chainId
                address
              }
              amount {
                value
                asset {
                  ... on Erc20 {
                    symbol
                  }
                }
              }
              endsAt
              collectLimit
              followerOnly
              collectNft
              recipient
              referralFee
            }
            ... on MultirecipientFeeCollectOpenActionSettings {
              type
              contract {
                chainId
                address
              }
              amount {
                value
                asset {
                  ... on Erc20 {
                    symbol
                  }
                }
              }
              endsAt
              collectLimit
              followerOnly
              collectNft
              referralFee
              recipients {
                recipient
                split
              }
            }
            ... on UnknownOpenActionModuleSettings {
              initializeCalldata
              initializeResultData
              verified
              signlessApproved
              sponsoredApproved
              type
              collectNft
              contract {
                address
                chainId
              }
            }
          }
          isHidden
          by {
            id
            handle {
              fullHandle
              localName
              ownedBy
            }
            metadata {
              displayName
              picture {
                ... on ImageSet {
                  optimized {
                    height
                    mimeType
                    uri
                    width
                  }
                }
                ... on NftImage {
                  image {
                    optimized {
                      height
                      mimeType
                      uri
                      width
                    }
                  }
                  collection {
                    address
                    chainId
                  }
                  tokenId
                }
              }
            }
          }
          stats {
            countOpenActions
          }
            id
        }
      }
      pageInfo {
        prev
        next
      }
    }
  }
`;

export async function getPublicationsByIds(publicationIds: string[]) {
  const variables = {
    request: {
      where: {
        publicationIds: publicationIds
      }
    }
  };

  try {
    const { data } = await client.query({
      query: GET_PUBLICATIONS_BY_IDS,
      variables,
      fetchPolicy: 'no-cache' // Disable caching
    });

    return {
      publications: data.publications.items,
      pageInfo: data.publications.pageInfo,
    };

  } catch (error) {
    console.error('Error fetching publications:', error);
    return {
      publications: [],
      pageInfo: null,
      error: "Error fetching publications: " + error
    };
  }
}

const GET_AUCTIONS_BY_IDS = gql`
  query Publications($request: PublicationsRequest!) {
    publications(request: $request) {
      items {
        ... on Post {
          id
          metadata {
            ... on VideoMetadataV3 {
              asset {
                cover {
                  optimized {
                    uri
                  }
                }
                video {
                  optimized {
                    uri
                  }
                }
              }
              title
              hideFromFeed
            }
            ... on ImageMetadataV3 {
              asset {
                image {
                  optimized {
                    uri
                  }
                }
              }
              title
              hideFromFeed
            }
            ... on AudioMetadataV3 {
              asset {
                cover {
                  optimized {
                    uri
                  }
                }
                audio {
                  optimized {
                    uri
                  }
                }
              }
              title
              hideFromFeed
            }
          }
          createdAt
          by {
            id
            handle {
              localName
              suggestedFormatted {
                localName
              }
            }
            metadata {
              picture {
                ... on ImageSet {
                  optimized {
                    uri
                  }
                }
                ... on NftImage {
                  image {
                    optimized {
                      uri
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getAuctionsByIds(publicationIds: string[]) {
  const variables = {
    request: {
      where: {
        publicationIds: publicationIds
      }
    }
  };

  const { data } = await client.query({
    query: GET_AUCTIONS_BY_IDS,
    variables,
    fetchPolicy: 'no-cache' // Disable caching
  });

  return data;
}


const GET_PUBLICATIONS_ACTED_BY = gql`
query Publications($request: PublicationsRequest!) {
    publications(request: $request) {
      items {
        ... on Post {
          id
          metadata {
            ... on VideoMetadataV3 {
              asset {
                cover {
                  optimized {
                    uri
                  }
                }
                video {
                  optimized {
                    uri
                  }
                }
              }
              title
              hideFromFeed
              content
            }
            ... on ImageMetadataV3 {
              asset {
                image {
                  optimized {
                    uri
                  }
                }
              }
              title
              hideFromFeed
              content
            }
            ... on AudioMetadataV3 {
              asset {
                cover {
                  optimized {
                    uri
                  }
                }
                audio {
                  optimized {
                    uri
                  }
                }
              }
              title
              hideFromFeed
              content
            }
          }
          createdAt
          by {
            id
            handle {
              localName
              suggestedFormatted {
                localName
              }
            }
            metadata {
              picture {
                ... on ImageSet {
                  optimized {
                    uri
                  }
                }
                ... on NftImage {
                  image {
                    optimized {
                      uri
                    }
                  }
                }
              }
            }
          }
          openActionModules {
            ... on SimpleCollectOpenActionSettings {
              collectLimit
              collectNft
              type
              amount {
                value
                asset {
                  ... on Erc20 {
                    contract {
                      address
                    }
                  }
                }
              }
            }
            ... on MultirecipientFeeCollectOpenActionSettings {
              type
              collectNft
              collectLimit
              amount {
                value
                asset {
                  ... on Erc20 {
                    contract {
                      address
                    }
                  }
                }
              }
            }
            ... on UnknownOpenActionModuleSettings {
              collectNft
              contract {
                address
              }
              type
            }
          }
          isHidden
        }
      }
        pageInfo {
        next
        prev
      }
    }
}
`;

export async function getPublicationsActedBy(ProfileId: ProfileId, cursor: string | null = null) {
  const variables = {
    request: {
      where: {
        withOpenActions: [
          {
            category: "COLLECT",
            address: AUCTION_OPEN_ACTION_MODULE_ADDRESS
          }
        ],
        actedBy: ProfileId,
        publicationTypes: "POST"
      },
      cursor, 
      limit: "Fifty" 
    }
  };

  const { data } = await client.query({
    query: GET_PUBLICATIONS_ACTED_BY,
    variables,
    fetchPolicy: 'no-cache' // Disable caching
  });

  return data;
}

const GET_PROFILE_ID_BY_HANDLE = gql`
    query Profile($request: ProfileRequest!) {
      profile(request: $request) {
        id
      }
    }
`;

export async function getProfileIdByHandle(handle: string) {
  const variables = {
    request: {
      forHandle: 'lens/'+ handle,
    }
  };

  const { data } = await client.query({
    query: GET_PROFILE_ID_BY_HANDLE,
    variables
  });

  return data;
}