'use client';

import React, { useState, useEffect } from 'react';

export function Likes({ id }: { id: string }) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      const response = await fetch(`/api/likes?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setLikes(data.likes);
      setHasLiked(data.hasLiked);
    };
    fetchLikeStatus();
  }, [id]);

  const handleLike = async () => {
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    } else {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setLikes(prev => prev + 1);
        setHasLiked(true);
      }
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-2 my-10'>
      <button onClick={handleLike} className='cursor-pointer'>
        {hasLiked ? (
          <span>❤️</span>
        ) : (
          <span>♡</span>
        )}
      </button>
      <span className='text-muted-foreground'>
        {likes} Likes
      </span>
    </div>
  );
}
