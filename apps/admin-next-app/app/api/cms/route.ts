import { NextRequest, NextResponse } from 'next/server';
import { cmsGraphql } from '@/lib/cms';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { query, variables, key } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'GraphQL query is missing in the request payload' },
        { status: 400 }
      );
    }

    // Make the CMS request
    const cmsResponse = await cmsGraphql({
      CMS_BASE_URL: process.env.CMS_BASE_URL || '',
      CMS_STATIC_TOKEN: process.env.CMS_STATIC_TOKEN || '',
    }).query(query, variables);

    console.log('cmsResponse', cmsResponse);

    if (!cmsResponse || !cmsResponse[key]) {
      return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 }
      );
    }

    // Return successful response
    return NextResponse.json(cmsResponse[key]);

  } catch (error) {
    console.error('Error in CMS API route:', error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    );
  }
}

// Optionally, you can also handle GET requests if needed
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
} 