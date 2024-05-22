import { NextRequest, NextResponse } from "next/server";
import { ThirdwebStorage } from "@thirdweb-dev/storage";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const fileBuffer = Buffer.from(await (file as Blob).arrayBuffer())

        const storage = new ThirdwebStorage({
            clientId: process.env.THIRDWEB_CLIENT_ID,
            secretKey: process.env.THIRDWEB_SECRET_KEY,
        });
        const ipfsUri = await storage.upload(fileBuffer);
        return NextResponse.json({ ipfsUri });
    } catch (error) {
        console.error('Error uploading file to IPFS:', error);
        return NextResponse.json({ error: 'Error uploading file to IPFS' }, { status: 500 });
    }
}
