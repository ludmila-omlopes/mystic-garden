import stack from "@/app/api/stackClient";
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wallet = searchParams.get('wallet');

    if (!wallet) {
      return NextResponse.json({ message: 'Wallet address is required' }, { status: 400 });
    }

    const points = await stack.getPoints(wallet);

    return NextResponse.json({
      message: 'Points fetched successfully',
      data: points,
    });
  } catch (error) {
    console.error('Error fetching points:', error);
    return NextResponse.json({ message: 'Failed to fetch points' }, { status: 500 });
  }
}
