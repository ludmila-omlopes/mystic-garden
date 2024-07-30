import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextRequest, NextResponse } from 'next/server';

const formatPrivateKey = (key) => key.replace(/\\n/g, '\n');

export async function POST(req: NextRequest) {
  try {
    // Initialize auth
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: formatPrivateKey(process.env.GOOGLE_PRIVATE_KEY),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const { email, website, artCategory, profileId, handle, additionalInfo } = await req.json();
    
    const doc = new GoogleSpreadsheet("1jnCwXlWmSijkrNmyJQhqDXYk_4zRILR5PTM4GzYrdxc", serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // Ensure headers are set
    const headers = ['Timestamp','ProfileId','Handle','Email', 'Website', 'ArtCategory', 'Additional'];
    await sheet.loadHeaderRow(); // Explicitly load the header row
    if (!sheet.headerValues || sheet.headerValues.length === 0) {
      await sheet.setHeaderRow(headers);
    }

    // Get the current timestamp
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'UTC', hour12: false });

    await sheet.addRow({
      Timestamp: timestamp,
      ProfileId: profileId,
      Handle: handle,
      Email: email,
      Website: website,
      ArtCategory: artCategory,
      Additional: additionalInfo     
    });

    return NextResponse.json({ message: 'Profile submitted successfully' });
  } catch (error) {
    console.error('Failed to submit profile:', error);
    return NextResponse.json({ error: 'Failed to submit profile' }, { status: 500 });
  }
}
