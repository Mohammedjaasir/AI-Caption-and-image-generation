import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const apiKey = process.env.HUGGINGFACE_API_KEY;

        if (!apiKey) {
            console.error('HUGGINGFACE_API_KEY not found');
            return NextResponse.json({ error: 'HUGGINGFACE_API_KEY is not configured' }, { status: 500 });
        }

        const hf = new HfInference(apiKey);
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        console.log('🎨 Generating image with prompt:', prompt);

        // Generate image using Stable Diffusion
        const blob = await hf.textToImage({
            model: 'stabilityai/stable-diffusion-2-1',
            inputs: prompt,
            parameters: {
                negative_prompt: 'blurry, bad quality, distorted, ugly',
                num_inference_steps: 20,
            }
        });

        console.log('✅ Image generated successfully');

        // Convert Blob to base64
        const buffer = Buffer.from(await blob.arrayBuffer());
        const base64Image = buffer.toString('base64');
        const dataUri = `data:image/png;base64,${base64Image}`;

        console.log('✅ Image converted to base64, size:', Math.round(base64Image.length / 1024), 'KB');

        return NextResponse.json({
            success: true,
            imageUrl: dataUri
        });
    } catch (error: any) {
        console.error('❌ Image generation error:', error.message);
        return NextResponse.json({
            success: false,
            error: error.message || 'Failed to generate image'
        }, { status: 500 });
    }
}
