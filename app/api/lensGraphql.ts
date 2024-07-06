export async function getAuctions() {
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
                address: "0x857b5e09d54AD26580297C02e4596537a2d3E329"
              }
            ]
          }
        }
      }
    };
  
    const ENDPOINT = 'https://api-v2.lens.dev';
  
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
  