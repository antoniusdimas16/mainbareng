import React from 'react';
import { Button } from '@heroui/react';
import { googleLoginAction } from '@/actions/goAuth';


export default function SocialLogin() {
    
  return (
    <form action={googleLoginAction}>
      <Button type="submit" color="primary" variant="light" className="w-full">
        Continue with Google
      </Button>
    </form>
  );
}