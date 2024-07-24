import { NextRequest, NextResponse } from "next/server";
import { airdropStack } from "../stackClient";

export async function POST(req: NextRequest) {
  try {
    const { userWallet, points, event , uniqueId } = await req.json();

    await airdropStack.track(event, {
        points: points,
        account: userWallet,
        uniqueId: uniqueId
      });

    return NextResponse.json({ message: `Awarded ${points} points to wallet ${userWallet} for the ${event} event.` });
  } catch (error) {
    console.error('Error awarding points:', error);
    return NextResponse.json({ error: 'Error awarding points' }, { status: 500 });
  }
}
