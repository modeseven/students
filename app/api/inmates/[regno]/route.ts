import { NextRequest, NextResponse } from 'next/server';
import { getInmateByRegno } from '../../mockDatabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ regno: string }> }
) {
  const { regno } = await params;
  
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Find inmate by registration number
  const inmate = getInmateByRegno(regno);
  
  if (!inmate) {
    return NextResponse.json(
      { error: 'Inmate not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({
    regno: inmate.regno,
    firstName: inmate.firstName,
    lastName: inmate.lastName,
    facility: inmate.facility,
    fullName: `${inmate.firstName} ${inmate.lastName}`
  });
}
