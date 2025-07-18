"use server";

import * as arctic from "arctic";
//import { google, generateState, generateCodeVerifier } from "@/utils/arctic";

import { google } from "@/utils/arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function googleLoginAction() {
  const cookieStore = await cookies();

  const state = arctic.generateState();  
  const codeVerifier = arctic.generateCodeVerifier();
  const scopes = ['openid', 'profile', 'email'];
  const url = google.createAuthorizationURL(state, codeVerifier, scopes);

  cookieStore.set('codeVerifier', codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 5,
    path: '/',
  });

console.log("➡️ Google Login URL:", url.toString());

  redirect(url.toString());
}
