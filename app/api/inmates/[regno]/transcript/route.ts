import { NextRequest, NextResponse } from 'next/server';
import { getTranscriptByRegno } from '../../../mockDatabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ regno: string }> }
) {
  const { regno } = await params;
  
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Get transcript data from mock database
  const transcript = getTranscriptByRegno(regno);
  
  if (!transcript) {
    return NextResponse.json(
      { error: 'Transcript not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(transcript);
}
