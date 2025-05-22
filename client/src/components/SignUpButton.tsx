'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';

const SignUpButton = () => {
  const router = useRouter();

  const handleSignUp = () => {
    // Navigate to sign up page
    router.push('/auth/signup');
  };

  return (
    <Button onClick={handleSignUp} variant="secondary" size="lg">
      Sign Up Now - It's Free!
    </Button>
  );
};

export default SignUpButton;
