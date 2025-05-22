'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';

const GetStartedButton = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    // Navigate to registration page
    router.push('/auth/signup');
  };

  return (
    <Button onClick={handleGetStarted} size="lg">
      Get Started
    </Button>
  );
};

export default GetStartedButton;
