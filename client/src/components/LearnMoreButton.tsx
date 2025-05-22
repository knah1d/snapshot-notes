'use client';

import React from 'react';
import Button from './Button';

const LearnMoreButton = () => {
  const handleLearnMore = () => {
    // Scroll to features section
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Button onClick={handleLearnMore} variant="outline" size="lg">
      Learn More
    </Button>
  );
};

export default LearnMoreButton;
