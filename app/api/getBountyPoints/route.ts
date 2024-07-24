import { bountyStack } from "@/app/api/stackClient";
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wallet = searchParams.get('wallet');

    if (!wallet) {
      return NextResponse.json({ message: 'Getting bounty points: Wallet address is required' }, { status: 400 });
    }

    const points = await bountyStack.getPoints(wallet);

    return NextResponse.json({
      message: 'Bounty points fetched successfully',
      data: points,
    });
  } catch (error) {
    console.error('Error fetching bounty points:', error);
    return NextResponse.json({ message: 'Failed to fetch bounty points' }, { status: 500 });
  }
}
