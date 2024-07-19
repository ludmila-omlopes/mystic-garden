import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const chunk = formData.get('chunk') as Blob;
        const chunkIndex = formData.get('chunkIndex') as string;
        const totalChunks = formData.get('totalChunks') as string;
        const fileName = formData.get('fileName') as string;

        if (!chunk || !chunkIndex || !totalChunks || !fileName) {
            return NextResponse.json({ error: 'Missing data' }, { status: 400 });
        }

        const chunkBuffer = Buffer.from(await chunk.arrayBuffer());
        const uploadDir = path.join(process.cwd(), 'uploads', fileName);
        await fs.mkdir(uploadDir, { recursive: true });
        const chunkPath = path.join(uploadDir, `${chunkIndex}`);

        await fs.writeFile(chunkPath, chunkBuffer);
        return NextResponse.json({ message: 'Chunk uploaded successfully' });
    } catch (error) {
        console.error('Error uploading chunk:', error);
        return NextResponse.json({ error: 'Error uploading chunk' }, { status: 500 });
    }
}
