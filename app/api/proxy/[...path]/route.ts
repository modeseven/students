import { NextRequest, NextResponse } from 'next/server';

// Get the backend base URL from environment variable
// Default to localhost if not set
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  
  // Reconstruct the full path
  const pathString = path.join('/');
  
  // Get query parameters from the request
  const searchParams = request.nextUrl.searchParams.toString();
  const queryString = searchParams ? `?${searchParams}` : '';
  
  // Build the full URL
  const url = `${BACKEND_URL}/${pathString}${queryString}`;
  
  try {
    // Forward the request to the backend
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // You can add more headers here if needed (e.g., authentication)
      },
    });
    
    // Get the response data
    const data = await response.json();
    
    // Return the data with the same status code
    return NextResponse.json(data, { status: response.status });
    
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from backend' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  
  // Reconstruct the full path
  const pathString = path.join('/');
  
  // Get query parameters from the request
  const searchParams = request.nextUrl.searchParams.toString();
  const queryString = searchParams ? `?${searchParams}` : '';
  
  // Build the full URL
  const url = `${BACKEND_URL}/${pathString}${queryString}`;
  
  // Get request body if present
  let body;
  try {
    body = await request.text();
  } catch (error) {
    body = undefined;
  }
  
  try {
    // Forward the request to the backend
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You can add more headers here if needed (e.g., authentication)
      },
      body: body,
    });
    
    // Get the response data
    const data = await response.json();
    
    // Return the data with the same status code
    return NextResponse.json(data, { status: response.status });
    
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from backend' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  
  // Reconstruct the full path
  const pathString = path.join('/');
  
  // Get query parameters from the request
  const searchParams = request.nextUrl.searchParams.toString();
  const queryString = searchParams ? `?${searchParams}` : '';
  
  // Build the full URL
  const url = `${BACKEND_URL}/${pathString}${queryString}`;
  
  // Get request body if present
  let body;
  try {
    body = await request.text();
  } catch (error) {
    body = undefined;
  }
  
  try {
    // Forward the request to the backend
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });
    
    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
    
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from backend' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  
  const pathString = path.join('/');
  const searchParams = request.nextUrl.searchParams.toString();
  const queryString = searchParams ? `?${searchParams}` : '';
  const url = `${BACKEND_URL}/${pathString}${queryString}`;
  
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
    
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from backend' },
      { status: 500 }
    );
  }
}

