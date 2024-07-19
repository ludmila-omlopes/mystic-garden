// lensGraphql.ts

export async function getAuctions() {
  const auctionsOaAddress = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? '0x857b5e09d54AD26580297C02e4596537a2d3E329' : '0xd935e230819AE963626B31f292623106A3dc3B19';
  const graphqlQuery = {
    query: `
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
    `,
    variables: {
      request: {
        where: {
          withOpenActions: [
            {
              address: auctionsOaAddress
            }
          ]
        }
      }
    }
  };

  const ENDPOINT = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? 'https://api-v2.lens.dev' : 'https://api-v2-amoy.lens.dev';

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://sandbox.embed.apollographql.com',
      'Access-Control-Allow-Credentials': 'true'
      // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Include this if your API request requires authentication
    },
    body: JSON.stringify(graphqlQuery),
    cache: 'no-store'
  });

  const data = await response.json();
  return JSON.stringify(data);
}

export async function getAuctionsByProfile(profileId: string) {
  const auctionsOaAddress = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? '0x857b5e09d54AD26580297C02e4596537a2d3E329' : '0xd935e230819AE963626B31f292623106A3dc3B19';
  const graphqlQuery = {
    query: `
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
    `,
    variables: {
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
    }
  };

  const ENDPOINT = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? 'https://api-v2.lens.dev' : 'https://api-v2-amoy.lens.dev';

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Include this if your API request requires authentication
    },
    body: JSON.stringify(graphqlQuery)
  });

  const data = await response.json();
  return JSON.stringify(data);
}

export async function getPublicationsByIds(publicationIds: string[]) {
  const graphqlQuery = {
    query: `
      query Publications($request: PublicationsRequest!) {
        publications(request: $request) {
          items {
            ... on Post {
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
                }
              }
              isHidden
            }
          }
          pageInfo {
            prev
            next
          }
        }
      }
    `,
    variables: {
      request: {
        where: {
          publicationIds: publicationIds
        }
      }
    }
  };

  const ENDPOINT = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? 'https://api-v2.lens.dev' : 'https://api-v2-amoy.lens.dev';

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Include this if your API request requires authentication
    },
    body: JSON.stringify(graphqlQuery)
  });

  const data = await response.json();
  return JSON.stringify(data);
}
