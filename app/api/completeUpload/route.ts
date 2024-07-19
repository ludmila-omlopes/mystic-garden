import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import path from 'path';

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

        const uploadDir = path.join(process.cwd(), 'uploads', fileName);
        console.log('Reading directory:', uploadDir);

        const fileParts = await fs.promises.readdir(uploadDir);
        console.log('File parts:', fileParts);

        fileParts.sort((a, b) => parseInt(a) - parseInt(b));

        const fileBuffer = Buffer.concat(
            await Promise.all(
                fileParts.map(part => fs.promises.readFile(path.join(uploadDir, part)))
            )
        );

        console.log('File buffer created, size:', fileBuffer.length);

        const storage = new ThirdwebStorage({
            clientId: process.env.THIRDWEB_CLIENT_ID,
            secretKey: process.env.THIRDWEB_SECRET_KEY,
        });
        const ipfsUri = await storage.upload(fileBuffer);
        console.log('Uploaded to IPFS:', ipfsUri);

        // Clean up the upload directory
        await Promise.all(fileParts.map(part => fs.promises.unlink(path.join(uploadDir, part))));
        await fs.promises.rmdir(uploadDir);
        console.log('Cleaned up upload directory');

        return NextResponse.json({ ipfsUri });
    } catch (error) {
        console.error('Error completing upload:', error);
        return NextResponse.json({ error: 'Error completing upload' }, { status: 500 });
    }
}
