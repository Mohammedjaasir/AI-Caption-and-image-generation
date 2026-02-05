# 🎨 AI Caption & Image Generator

An intelligent social media content generator powered by AI. Create engaging captions, hashtags, and find relevant images instantly for your digital marketing needs.

![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🤖 **AI-Powered Captions** - Generate engaging social media captions using Groq's Llama 3.3 70B
- 🏷️ **Smart Hashtags** - Automatically generate 5-10 relevant hashtags
- 📸 **Relevant Images** - Find high-quality, relevant images from Pexels
- ⚡ **Real-time Generation** - Fast AI-powered content creation
- 🎨 **Beautiful UI** - Modern, gradient-based interface with smooth animations
- 📱 **Fully Responsive** - Works perfectly on all devices

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Models**: 
  - Groq (Llama 3.3 70B) for text generation
  - Pexels API for images
  - Hugging Face (Stable Diffusion) support
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ and npm
- API Keys (all free):
  - [Groq API Key](https://console.groq.com/keys)
  - [Pexels API Key](https://www.pexels.com/api/)
  - [Hugging Face Token](https://huggingface.co/settings/tokens) (optional)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mohammedjaasir/image-generation.git
   cd image-generation
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Groq API Key - Get from https://console.groq.com/keys
   GROQ_API_KEY=your_groq_api_key_here

   # Pexels API Key - Get from https://www.pexels.com/api/
   PEXELS_API_KEY=your_pexels_api_key_here

   # Hugging Face API Key (Optional) - Get from https://huggingface.co/settings/tokens
   HUGGINGFACE_API_KEY=your_huggingface_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables (GROQ_API_KEY, PEXELS_API_KEY, HUGGINGFACE_API_KEY)
   - Click "Deploy"

Your app will be live at `https://your-app.vercel.app`

## 💡 Usage

1. **Enter Your Idea**: Type any topic or idea (e.g., "lion", "sunset", "technology")
2. **Click Generate**: The AI will create:
   - A catchy social media caption
   - 5-10 relevant hashtags
   - A high-quality relevant image
3. **Copy & Use**: Click the copy buttons to use the content in your posts

## 🔑 Getting API Keys

### Groq API Key (FREE)
1. Visit [console.groq.com/keys](https://console.groq.com/keys)
2. Sign up for a free account
3. Create a new API key
4. Copy and add to `.env.local`

### Pexels API Key (FREE)
1. Visit [pexels.com/api](https://www.pexels.com/api/)
2. Sign up for a free account
3. Go to [pexels.com/api/new](https://www.pexels.com/api/new/)
4. Enter your app name and get your API key
5. Copy and add to `.env.local`

### Hugging Face Token (FREE - Optional)
1. Visit [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Create a free account
3. Generate a new token with "Read" permission
4. Copy and add to `.env.local`

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate/          # Main content generation endpoint
│   │   │   ├── generate-image/    # Image generation endpoint
│   │   │   └── image-proxy/       # Image proxy for CORS
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Main page component
│   └── visual-edits/             # Visual editing utilities
├── .env.local                     # Environment variables (create this)
├── .gitignore                     # Git ignore file
├── .npmrc                         # NPM configuration
├── next.config.ts                 # Next.js configuration
├── package.json                   # Dependencies
├── tailwind.config.ts             # Tailwind CSS configuration
└── vercel.json                    # Vercel configuration
```

## 🎯 Use Cases

- **Digital Marketing**: Create social media posts instantly
- **Content Creators**: Generate engaging captions and hashtags
- **Social Media Managers**: Speed up content creation workflow
- **Businesses**: Create professional marketing content
- **Influencers**: Maintain consistent posting with AI assistance

## 🔧 Configuration

### Customize AI Behavior

Edit `src/app/api/generate/route.ts` to adjust:
- Caption tone and style
- Number of hashtags
- Image search keywords
- Temperature settings

### Customize UI

Edit `src/app/page.tsx` and `src/app/globals.css` to modify:
- Color schemes
- Layout
- Animations
- Typography

## 🐛 Troubleshooting

### Build Errors
- Make sure to use `npm install --legacy-peer-deps`
- Check that all environment variables are set

### API Errors
- Verify your API keys are correct
- Check API rate limits
- Ensure `.env.local` is in the root directory

### Image Loading Issues
- Pexels API has rate limits (check your usage)
- Make sure PEXELS_API_KEY is set correctly

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

**Mohammed Jaasir**
- GitHub: [@Mohammedjaasir](https://github.com/Mohammedjaasir)

## 🙏 Acknowledgments

- [Groq](https://groq.com) - Ultra-fast AI inference
- [Pexels](https://pexels.com) - Free stock photos
- [Hugging Face](https://huggingface.co) - AI models
- [Vercel](https://vercel.com) - Deployment platform
- [Next.js](https://nextjs.org) - React framework

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an issue on GitHub
3. Contact: jaasirjaasir76@gmail.com

## 🌟 Show Your Support

If you like this project, please give it a ⭐ on GitHub!

---

**Made with ❤️ for digital marketers and content creators**
