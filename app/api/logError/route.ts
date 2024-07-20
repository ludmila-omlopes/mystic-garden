// /app/api/logError/route.js

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { error, stack } = await req.json();

    // Implement your logging logic here
    // For example, you can log to a service like Sentry, LogRocket, etc.
    console.error('Error:', error);
    console.error('Stack:', stack);

    // Optionally, you can add more sophisticated logging, e.g., sending to an external service
    // await someLoggingService.log({ error, stack });

    return NextResponse.json({ message: 'Error logged successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error logging failed:', err);
    return NextResponse.json({ message: 'Failed to log error' }, { status: 500 });
  }
}
