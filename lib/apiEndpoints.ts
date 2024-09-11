// lib/apiEndpoints.ts
export function getApiEndpoint(endpoint: string): string {
    const baseUrl = 'https://lensboard-data.onrender.com/api';
    const envSufix = process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' ? 'DEV' : '';
  
    const endpoints = {
      get1editionsBonsai: `${baseUrl}/get1editionsBonsai${envSufix}`,
      get1editionsBonsaiByCreator: `${baseUrl}/get1editionsBonsaiByCreator${envSufix}`,
      listProfileIdsLikeHandle: `${baseUrl}/listProfileIdsLikeHandle${envSufix}`,
      getAllPublications: `${baseUrl}/get1AllAuctionsAnd1on1s${envSufix}`,
      listTotal1on1Collected: `${baseUrl}/listTotal1on1Collected${envSufix}`,
      list1on1CollectedByProfile: `${baseUrl}/list1on1CollectedByProfile${envSufix}`, //só traz o valor final, e nao os posts
      // Add other endpoints here
    };
  
    return endpoints[endpoint] || '';
  }
  