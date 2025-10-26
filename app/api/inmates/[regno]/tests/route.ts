import { NextRequest, NextResponse } from 'next/server';
import { getTestsByRegno } from '../../../mockDatabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ regno: string }> }
) {
  const { regno } = await params;
  
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Get tests data from mock database
  const tests = getTestsByRegno(regno);
  
  if (!tests) {
    return NextResponse.json(
      { error: 'Tests not found for this inmate' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(tests);
}
