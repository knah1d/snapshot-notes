'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';

const ViewNotesButton = () => {
  const router = useRouter();

  const handleViewNotes = () => {
    // Navigate to notes page
    router.push('/notes');
  };

  return (
    <Button onClick={handleViewNotes}>View All Notes</Button>
  );
};

export default ViewNotesButton;
