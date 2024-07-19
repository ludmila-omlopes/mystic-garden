import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from 'fs';
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import path from 'path';
import os from 'os';

export async function POST(req: NextRequest) {
    try {
        let formData;

        try {
            formData = await req.formData();
        } catch (e) {
            console.error("Error parsing formData:", e);
            const body = await req.json();
            formData = new FormData();
            formData.append('fileName', body.fileName);
        }

        const fileName = formData.get('fileName') as string;

        console.log('Received fileName:', fileName);

        if (!fileName) {
            console.log('No fileName provided');
            return NextResponse.json({ error: 'No fileName provided' }, { status: 400 });
        }

        const tempDir = path.join(os.tmpdir(), 'uploads', fileName);
        console.log('Reading directory:', tempDir);

        const fileParts = await fs.readdir(tempDir);
        console.log('File parts:', fileParts);

        fileParts.sort((a, b) => parseInt(a) - parseInt(b));

        const fileBuffer = Buffer.concat(
            await Promise.all(
                fileParts.map(part => fs.readFile(path.join(tempDir, part)))
            )
        );

        console.log('File buffer created, size:', fileBuffer.length);

        const storage = new ThirdwebStorage({
            clientId: process.env.THIRDWEB_CLIENT_ID,
            secretKey: process.env.THIRDWEB_SECRET_KEY,
        });
        const ipfsUri = await storage.upload(fileBuffer);
        console.log('Uploaded to IPFS:', ipfsUri);

        // Clean up the temporary directory
        await Promise.all(fileParts.map(part => fs.unlink(path.join(tempDir, part))));
        await fs.rmdir(tempDir);
        console.log('Cleaned up temporary directory');

        return NextResponse.json({ ipfsUri });
    } catch (error) {
        console.error('Error completing upload:', error);
        return NextResponse.json({ error: 'Error completing upload' }, { status: 500 });
    }
}
