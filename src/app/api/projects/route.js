import { NextResponse } from 'next/server';
import localProjects from '@/lib/projects.json';

const REPO = 'Eashubh128/Eashubh128.github.io';
const FILE_PATH = 'src/lib/projects.json';
const GITHUB_API_URL = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;

export async function GET() {
  try {
    const res = await fetch(GITHUB_API_URL, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` })
      },
      next: { revalidate: 0 } // Disable caching
    });

    if (res.status === 404) {
      // File doesn't exist on GitHub yet, return local version
      return NextResponse.json({ projects: localProjects, sha: null });
    }

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return NextResponse.json({ error: 'Failed to fetch from GitHub', details: errData }, { status: res.status });
    }

    const data = await res.json();
    const content = Buffer.from(data.content, 'base64').toString('utf8');
    
    return NextResponse.json({ projects: JSON.parse(content), sha: data.sha });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { pin, projects, sha } = await req.json();

    if (!pin || pin !== process.env.ADMIN_PIN) {
      return NextResponse.json({ error: 'Unauthorized: Invalid PIN' }, { status: 401 });
    }

    if (!process.env.GITHUB_TOKEN) {
      return NextResponse.json({ error: 'Server configuration error: Missing GITHUB_TOKEN' }, { status: 500 });
    }

    const content = Buffer.from(JSON.stringify(projects, null, 2)).toString('base64');

    const res = await fetch(GITHUB_API_URL, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Update projects via Admin Dashboard',
        content,
        ...(sha ? { sha } : {})
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: 'Failed to update GitHub repository', details: errorData }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
