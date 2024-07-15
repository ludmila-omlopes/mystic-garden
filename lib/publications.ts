import axios from 'axios';
import { getApiEndpoint } from '@/lib/apiEndpoints';

export const getAllCreatedPublicationsByCreator = async (profileId: string): Promise<string[]> => {
  try {
    // Fetch Bonsai publications by creator
    const bonsaiUrl = getApiEndpoint('get1editionsBonsaiByCreator');
    const bonsaiResponse = await axios.get(bonsaiUrl, { params: { profileId } });
    const bonsaiResult = JSON.parse(bonsaiResponse.data.result);
    const bonsaiPublicationsList = bonsaiResult.publicationsList as string[];
    console.log('bonsaiPublicationsList:', bonsaiPublicationsList);

    // Fetch auction publications by creator
    const auctionsUrl = '/api/getAuctionsByCreator';
    const auctionsResponse = await axios.get(auctionsUrl, { params: { profileId } });
    
    // Extract publication IDs from the auctions response
    const auctionPublicationsList = auctionsResponse.data.data.map((auction: any) => auction.id);
    console.log('auctionPublicationsList:', auctionPublicationsList);

    // Combine both lists
    const combinedPublicationsList = [...bonsaiPublicationsList, ...auctionPublicationsList];

    return combinedPublicationsList;
  } catch (error) {
    console.error('Error fetching publications:', error);
    throw new Error('Failed to fetch publications');
  }
};
