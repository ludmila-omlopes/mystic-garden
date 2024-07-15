// Import the getAuctions function
import { getAuctions, getPublicationsByIds } from '../lensGraphql';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publicationIds = searchParams.getAll('publicationIds');

    if (!publicationIds || publicationIds.length === 0) {
      return NextResponse.json({ message: 'No publication IDs provided' }, { status: 400 });
    }

    const publications = await getPublicationsByIds(publicationIds);
    const publicationsData = JSON.parse(publications).data.publications.items;

    return NextResponse.json({
      message: 'Publications fetched successfully',
      data: publicationsData,
    });
  } catch (error) {
    console.error('Error fetching publications:', error);
    return NextResponse.json({ message: 'Failed to fetch publications' }, { status: 500 });
  }
}
