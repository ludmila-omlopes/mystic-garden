import axios from 'axios';

export const fetchData = async (url: string, params?: object): Promise<any> => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw new Error(`Failed to fetch data from ${url}`);
  }
};
