import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'GROQ_API_KEY is not configured' }, { status: 500 });
    }

    const groq = new Groq({ apiKey });

    const { idea } = await req.json();

    if (!idea) {
      return NextResponse.json({ error: 'Idea is required' }, { status: 400 });
    }

    console.log('📝 Generating content for idea:', idea);

    const prompt = `Generate a catchy social media caption and 5-10 relevant hashtags for the following idea: "${idea}". 
    Return the result strictly in JSON format with keys "caption" and "hashtags" (as an array of strings).`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 500,
    });

    const text = chatCompletion.choices[0]?.message?.content || '';

    // Improved JSON extraction
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response: ' + text);
    const data = JSON.parse(jsonMatch[0]);

    console.log('✅ Caption and hashtags generated');

    const imagePromptCompletion = await groq.chat.completions.create({
      messages: [{
        role: 'user',
        content: `For the idea "${idea}", provide 1-3 keywords for finding relevant images (e.g., for "lion" return "lion wildlife", for "sunset" return "sunset ocean"). Return ONLY the keywords, no quotes or punctuation.`
      }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.6,
      max_tokens: 20,
    });

    let imageKeywords = imagePromptCompletion.choices[0]?.message?.content?.trim() || idea;
    imageKeywords = imageKeywords.replace(/^["']|["']$/g, '').toLowerCase();

    const seed = Math.floor(Math.random() * 1000000);

    console.log('🔍 Searching for images with keywords:', imageKeywords);

    // Use Pexels API for relevant, high-quality free stock photos
    const pexelsApiKey = process.env.PEXELS_API_KEY;

    if (!pexelsApiKey) {
      console.warn('⚠️ PEXELS_API_KEY not configured, using fallback');
      const imageUrl = `https://picsum.photos/seed/${seed}/1024/1024`;
      return NextResponse.json({
        caption: data.caption,
        hashtags: data.hashtags,
        imageUrl,
        imagePrompt: imageKeywords,
        seed
      });
    }

    const pexelsUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(imageKeywords)}&per_page=1&page=${Math.floor(Math.random() * 10) + 1}`;

    try {
      const pexelsResponse = await fetch(pexelsUrl, {
        headers: {
          'Authorization': pexelsApiKey
        }
      });

      const pexelsData = await pexelsResponse.json();

      if (pexelsData.photos && pexelsData.photos.length > 0) {
        const imageUrl = pexelsData.photos[0].src.large2x;
        console.log('✅ Found relevant image from Pexels');

        return NextResponse.json({
          caption: data.caption,
          hashtags: data.hashtags,
          imageUrl,
          imagePrompt: imageKeywords,
          seed
        });
      }
    } catch (pexelsError) {
      console.log('⚠️ Pexels failed, using fallback');
    }

    // Final fallback to Picsum
    const imageUrl = `https://picsum.photos/seed/${seed}/1024/1024`;

    return NextResponse.json({
      caption: data.caption,
      hashtags: data.hashtags,
      imageUrl,
      imagePrompt: imageKeywords,
      seed
    });
  } catch (error: any) {
    console.error('❌ Generation error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate content' }, { status: 500 });
  }
}
