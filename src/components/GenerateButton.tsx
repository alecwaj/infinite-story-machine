'use client';

import { Button } from '@/components/ui/button';
import { generateImage } from '@/lib/generateImage';
import { useState } from 'react';

export function GenerateButton(prompt: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  async function onSubmit(prompt: string) {
    const response = await generateImage(prompt);
    console.log('res', response);
    if (response.status === 200) {
      setImageUrl(response);
    }
  }

  return (
    <>
      <Button onClick={() => onSubmit(prompt)}>Generate</Button>

      {imageUrl && <img src={imageUrl} alt={'Generated image'} />}
    </>
  );
}
