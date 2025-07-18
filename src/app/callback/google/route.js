//import * as arctic from 'arctic';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

//import { createSession } from '@/services/auth';
//import { getUserByEmail } from '@/services/user';
import { google } from '@/utils/arctic';
//import { redirect } from 'next/dist/server/api-utils';
//import prisma from '@/utils/prisma';

export async function GET(request) {
  const cookieStore = await cookies();
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const codeVerifier = cookieStore.get('codeVerifier')?.value;

 
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const accessToken = tokens.accessToken();

    const res = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const userInfo = await res.json();

 //  return Response.json({message: 'OK', userInfo})
 

  redirect('/event');
}