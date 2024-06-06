// lib/apiEndpoints.ts
export function getApiEndpoint(endpoint: string): string {
    const baseUrl = 'https://lensboard-data.onrender.com/api';
    const envSufix = process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' ? 'DEV' : '';
  
    const endpoints = {
      get1editionsBonsai: `${baseUrl}/get1editionsBonsai${envSufix}`,
      get1editionsBonsaiByCreator: `${baseUrl}/get1editionsBonsaiByCreator${envSufix}`,
      listProfileIdsLikeHandle: `${baseUrl}/listProfileIdsLikeHandle${envSufix}`,
      // Add other endpoints here
    };
  
    return endpoints[endpoint] || '';
  }
  