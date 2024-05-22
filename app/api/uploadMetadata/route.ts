//"use server";

import { NextRequest } from "next/server";
import { getIrys } from "../irys";

async function POST(req: NextRequest) {
    if (!req.body) {
        return new Response(JSON.stringify({ error: 'No metadata provided' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    
    const { metadata } = await req.json();
    console.log("Received metadata:", metadata);
    const serialized = JSON.stringify(metadata);

    try {
        const irys = await getIrys();       
        const receipt = await irys.upload(serialized, {
          tags: [{ name: "Content-Type", value: "application/json" }],
        });
        
        return new Response(JSON.stringify({ receiptId: receipt.id }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.error('Error during Irys upload:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: (error as Error).message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}

export { POST };
