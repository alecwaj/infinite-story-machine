interface ImageRequestData {
  key: string;
  prompt: string;
  negative_prompt: string | null;
  width: string;
  height: string;
  samples: string;
  num_inference_steps: string;
  seed: string | null;
  guidance_scale: number;
  safety_checker: string;
  multi_lingual: string;
  panorama: string;
  self_attention: string;
  upscale: string;
  embeddings_model: string | null;
  webhook: string | null;
  track_id: string | null;
}

export async function generateImage(prompt: string): Promise<any> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestData: ImageRequestData = {
    key:
      process.env.NEXT_PUBLIC_STABILITY_API_KEY! ||
      process.env.STABILITY_API_KEY!, // Replace with your actual key
    prompt,
    negative_prompt: null,
    width: '512',
    height: '512',
    samples: '1',
    num_inference_steps: '20',
    seed: null,
    guidance_scale: 7.5,
    safety_checker: 'yes',
    multi_lingual: 'no',
    panorama: 'no',
    self_attention: 'no',
    upscale: 'no',
    embeddings_model: null,
    webhook: null,
    track_id: null,
  };
  console.log('Request data:', requestData);
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(requestData),
    redirect: 'follow',
  };

  try {
    const response = await fetch(
      'https://stablediffusionapi.com/api/v3/text2img',
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log('API response: ', response);
    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
      throw error;
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
