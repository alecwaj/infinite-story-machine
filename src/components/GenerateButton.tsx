'use client';

import { Button } from '@/components/ui/button';
import { generateImage } from '@/lib/generateImage';
import { useState } from 'react';

export function GenerateButton(prompt: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingSuccess, setIsGeneratingSuccess] = useState(false);

  async function onSubmit(prompt: string) {
    const prompt2 = 'A man walking a dog';
    setIsGeneratingImage(true);
    setIsGeneratingSuccess(false);
    const response = await generateImage(prompt2);
    setIsGeneratingImage(false);
    console.log('res', response);
    setIsGeneratingSuccess(true);
    setImageUrl(response.output[0]);
  }

  return (
    <>
      <Button onClick={() => onSubmit(prompt)}>
        {isGeneratingImage ? 'Generating' : 'Generate'}
      </Button>
      {imageUrl && <img src={imageUrl} alt={'Generated image'} />}
    </>
  );
}
