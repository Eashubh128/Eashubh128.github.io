import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    // If running locally without env vars, return a mock number so the site doesn't break
    if (!process.env.KV_REST_API_URL && !process.env.UPSTASH_REDIS_REST_URL) {
      return NextResponse.json({ views: 42 }, { status: 200 });
    }

    let views;
    if (action === 'increment') {
      // Increment the 'site_views' counter by 1
      views = await redis.incr('site_views');
    } else {
      // Just fetch the current count without incrementing
      views = await redis.get('site_views') || 0;
    }
    
    return NextResponse.json({ views }, {
      headers: {
        'Cache-Control': 'no-store', // Prevent Next.js from caching the view count
      },
    });
  } catch (error) {
    console.error('Error fetching view count:', error);
    return NextResponse.json({ views: null }, { status: 500 });
  }
}
