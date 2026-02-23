import { NextResponse ,NextRequest} from 'next/server';
import twilio from 'twilio';

export async function POST(request:any) {
  // Twilio gửi dữ liệu qua Form Data
  const formData = await request.formData();
  const To = formData.get('To');
  
  const twiml = new twilio.twiml.VoiceResponse();

  if (To) {
    const dialOptions = {
      statusCallbackEvent:['completed'],
      statusCallback:'',
      statusCallbackMedthod:'POST'
    }
    const dial = twiml.dial({ 
      
    callerId: process.env.TWILIO_PHONE_NUMBER 
    });
    
    // Kiểm tra nếu To là số điện thoại (E.164) hay là Identity của User
    if (/^\+?[1-9]\d{1,14}$/.test(To)) {
      // dial.number(To,);
      dial.number(
        {
          statusCallback: 'test',
          statusCallbackEvent: ["completed"],
          statusCallbackMethod: "POST",
        },
        To
      );
    } else {
      dial.client(To);
    }
  } else {
    twiml.say("No recipient specified.");
  }

  // Trả về XML với Content-Type phù hợp
  return new NextResponse(twiml.toString(), {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}