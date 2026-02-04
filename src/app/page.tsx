'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Image as ImageIcon, Hash, Type, Loader2, Copy, Check, Send, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

interface GeneratedContent {
  caption: string;
  hashtags: string[];
  imageUrl: string;
  imagePrompt: string;
  seed: number;
}

export default function Home() {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });

      if (!response.ok) throw new Error('Failed to generate');

      const data = await response.json();
      setResult(data);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copied to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 font-sans selection:bg-purple-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-20 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-400 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AI-Powered Content Engine</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
            Idea to Content <br /> in Seconds
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
            Transform your simple ideas into professional images, captions, and viral hashtags automatically.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-20"
        >
          <form onSubmit={handleGenerate} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex flex-col md:flex-row gap-2 bg-zinc-900 p-2 rounded-2xl border border-zinc-800">
              <Input
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Describe your idea (e.g. A futuristic coffee shop in Mars)"
                className="bg-transparent border-none text-lg h-14 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-zinc-600"
              />
              <Button
                type="submit"
                disabled={loading || !idea.trim()}
                className="h-14 px-8 bg-white text-black hover:bg-zinc-200 transition-all rounded-xl font-semibold flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div className="space-y-6">
                <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-xl overflow-hidden group">
                  <div className="relative aspect-square bg-zinc-950 flex items-center justify-center">
                    {!imageError ? (
                      <>
                        <img
                          src={result.imageUrl}
                          alt={result.imagePrompt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onLoad={() => toast.success('Image generated!')}
                          onError={() => {
                            console.error('Image load failed:', result.imageUrl);
                            setImageError(true);
                            toast.error('Failed to load image');
                          }}
                        />
                        <div className="absolute bottom-4 right-4">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="rounded-full bg-black/50 backdrop-blur-md border-white/10 hover:bg-black/70"
                            onClick={() => window.open(result.imageUrl, '_blank')}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-6 text-zinc-500">
                        <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Image generation preview unavailable.</p>
                        <Button
                          variant="link"
                          className="text-purple-400 mt-2"
                          onClick={() => window.open(result.imageUrl, '_blank')}
                        >
                          Try Direct Link
                        </Button>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 border-t border-zinc-800 bg-zinc-900/50">
                    <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                      <ImageIcon className="w-3 h-3" /> Image Prompt
                    </p>
                    <p className="text-sm text-zinc-300 italic">"{result.imagePrompt}"</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="flex items-center gap-2 text-sm font-medium text-zinc-400 uppercase tracking-wider">
                      <Type className="w-4 h-4 text-purple-400" />
                      Caption
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-zinc-500 hover:text-white"
                      onClick={() => copyToClipboard(result.caption, 'Caption')}
                    >
                      {copiedField === 'Caption' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-lg text-zinc-100 leading-relaxed">
                    {result.caption}
                  </p>
                </Card>

                <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="flex items-center gap-2 text-sm font-medium text-zinc-400 uppercase tracking-wider">
                      <Hash className="w-4 h-4 text-blue-400" />
                      Hashtags
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-zinc-500 hover:text-white"
                      onClick={() => copyToClipboard(result.hashtags.join(' '), 'Hashtags')}
                    >
                      {copiedField === 'Hashtags' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.hashtags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm"
                      >
                        {tag.startsWith('#') ? tag : `#${tag}`}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Toaster position="bottom-right" theme="dark" />
      </main>

      <footer className="relative z-10 py-10 text-center border-t border-zinc-900 mt-20">
        <p className="text-zinc-600 text-sm">
          Powered by Gemini AI & Pollinations.ai
        </p>
      </footer>
    </div>
  );
}
