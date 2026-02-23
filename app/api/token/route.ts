import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function GET(request:any) {
  const { searchParams } = new URL(request.url);
  const identity = searchParams.get('identity') || 'guest';

  const AccessToken = twilio.jwt.AccessToken;
  const VoiceGrant = AccessToken.VoiceGrant;
  const accessToken = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID || "",
    process.env.TWILIO_API_KEY || "",
    process.env.TWILIO_API_SECRET || "",
    { identity: identity }
  );

  const grant = new VoiceGrant({
    outgoingApplicationSid: process.env.TWILIO_TWIML_APP_SID,
    incomingAllow: true,
  });

  accessToken.addGrant(grant);
  return NextResponse.json({ token: accessToken.toJwt() });
}