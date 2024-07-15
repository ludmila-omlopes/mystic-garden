
export async function getPointsByWallet(wallet: string): Promise<number> {
  try {
    const response = await fetch(`/api/getPoints?wallet=${wallet}`);
    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Error fetching points by wallet:', error);
    return 0;
  }
}

/*export async function getPointsByWalletList(wallets: string[]): Promise<number> {
  try {
    return await stack.getPoints(wallets);
  } catch (error) {
    console.error('Error fetching points by wallet list:', error);
    return 0;
  }
}

export async function getLeaderboardRankByWallet(wallet: string): Promise<number> {
  try {
    return await stack.getLeaderboardRank(wallet);
  } catch (error) {
    console.error('Error fetching leaderboard rank by wallet:', error);
    return 0;
  }
}

export async function getLeaderboard(): Promise<{
  leaderboard: {
    address: string;
    points: number;
    identities: any;
  }[];
  stats: {
    total: number;
  };
  metadata: {
    label: string;
    bannerUrl: string;
    description: string;
    name: string;
    createdAt: string;
    url: string;
    primaryColor: string;
  };
} | null> {
  try {
    return await stack.getLeaderboard();
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return null;
  }
}*/
