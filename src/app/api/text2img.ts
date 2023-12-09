// pages/api/text2img.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// Define the type for the request body
interface RequestData {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Construct the request to the external API
    const requestData: RequestData = JSON.parse(req.body);

    const response = await fetch(
      'https://stablediffusionapi.com/api/v3/text2img',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      }
    );

    const data = await response.text();

    // Send back the response from the external API
    res.status(200).json({ data });
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

/* Example response
	{
		"status": "success",
		"generationTime": 1.3200268745422363,
		"id": 12202888,
		"output": [
			"https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/e5cd86d3-7305-47fc-82c1-7d1a3b130fa4-0.png"
		],
		"meta": {
			"H": 512,
			"W": 512,
			"enable_attention_slicing": "true",
			"file_prefix": "e5cd86d3-7305-47fc-82c1-7d1a3b130fa4",
			"guidance_scale": 7.5,
			"model": "runwayml/stable-diffusion-v1-5",
			"n_samples": 1,
			"negative_prompt": " ((out of frame)), ((extra fingers)), mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), (((tiling))), ((naked)), ((tile)), ((fleshpile)), ((ugly)), (((abstract))), blurry, ((bad anatomy)), ((bad proportions)), ((extra limbs)), cloned face, glitchy, ((extra breasts)), ((double torso)), ((extra arms)), ((extra hands)), ((mangled fingers)), ((missing breasts)), (missing lips), ((ugly face)), ((fat)), ((extra legs))",
			"outdir": "out",
			"prompt": "ultra realistic close up portrait ((beautiful pale cyberpunk female with heavy black eyeliner)) DSLR photography, sharp focus, Unreal Engine 5, Octane Render, Redshift, ((cinematic lighting)), f/1.4, ISO 200, 1/160s, 8K, RAW, unedited, symmetrical balance, in-frame",
			"revision": "fp16",
			"safetychecker": "no",
			"seed": 3499575229,
			"steps": 20,
			"vae": "stabilityai/sd-vae-ft-mse"
		}
	}
*/
