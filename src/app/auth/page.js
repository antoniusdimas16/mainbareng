import React from 'react';
import { Button } from '@heroui/react';
import { googleLoginAction } from '@/actions/goAuth';


export default function SocialLogin() {
    
  return (
    <form action={googleLoginAction}>
      <div className="text-center space-y-4">
       
        <p className="text-sm text-gray-600">
          Not a member yet?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Join the Club
          </a>
        </p>
         <p className="text-gray-500">or</p>
        <Button
          type="submit"
          className="w-full bg-gray-50 text-gray-900 font-medium border border-gray-300 hover:bg-gray-200"
        >
          <img src="/assets/google.png" alt="Google Logo" className="w-4 h-4" />
          Continue with Google
        </Button>
      </div>
    </form>
  );
}