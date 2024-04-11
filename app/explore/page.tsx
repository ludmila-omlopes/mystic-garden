'use client'

// Import necessary libraries and components
import { useState, useEffect } from 'react';
import { usePublications } from '@lens-protocol/react-web';
import Post from '@/components/post'; // Import the Post component

export default function ExplorePage({ publications }) {
    return (
      <div>
        {publications?.map(publication => (
          <Post key={publication.id} publication={publication} /> // Use the Post component
        ))}
      </div>
    );
  }