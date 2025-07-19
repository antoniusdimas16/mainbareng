//import * as arctic from 'arctic';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

//import { createSession } from '@/services/auth';
//import { getUserByEmail } from '@/services/user';
import { google } from '@/utils/arctic';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

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

   // Coba cari user berdasarkan email
  let user = await prisma.users.findUnique({ where: { email: userInfo.email } });

  // Jika belum ada, buat user baru
  if (!user) {
    user = await prisma.users.create({
      data: {
        email: userInfo.email,
        first_name: userInfo.given_name,
        last_name: userInfo.family_name,
      },
    });
  }

  // Buat payload dan token JWT
  const payload = {
    userId: user.id,
    email: user.email,
    first_name: user.first_name,
  };

  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  // Simpan ke cookie
  cookieStore.set('token', jwtToken, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 hari
    secure: process.env.NODE_ENV === 'production',
  });

  // Redirect ke /event   
      redirect('/event');
}