import axios from 'axios';
import { YoutubeVideoItem } from '../types';

const FALLBACK_VIDEOS: YoutubeVideoItem[] = [
  {
    id: 'yt-1',
    title: 'Architecting Autonomous Multi-Agent AI Systems in React & TypeScript',
    description: 'A deep-dive tutorial demonstrating how to connect Gemini 2.5 Flash with deterministic state machines and WebSocket frontends.',
    publishedAt: '2 weeks ago',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    views: '18.4K',
    duration: '24:15',
    videoUrl: 'https://youtube.com/@kimsan2000',
    isFeatured: true
  },
  {
    id: 'yt-2',
    title: 'React 19 Server Actions & Performance Optimization Masterclass',
    description: 'Step-by-step breakdown of eliminating render bottlenecks and optimizing Core Web Vitals to achieve 100/100 Lighthouse scores.',
    publishedAt: '1 month ago',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    views: '12.8K',
    duration: '18:40',
    videoUrl: 'https://youtube.com/@kimsan2000'
  },
  {
    id: 'yt-3',
    title: 'Production-Grade Playwright Browser Automation & Self-Healing Bots',
    description: 'How to build resilient headless browser bots that survive dynamic website updates and DOM mutations with automated vision fallbacks.',
    publishedAt: '2 months ago',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    views: '24.1K',
    duration: '31:05',
    videoUrl: 'https://youtube.com/@kimsan2000'
  }
];

export async function fetchYoutubeVideos(): Promise<{
  videos: YoutubeVideoItem[];
  isFallback: boolean;
}> {
  const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  if (!channelId || !apiKey || channelId === 'YOUR_YOUTUBE_CHANNEL_ID') {
    return {
      videos: FALLBACK_VIDEOS,
      isFallback: true
    };
  }

  try {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=6`,
      { timeout: 5000 }
    );

    const items = res.data.items || [];
    const videos: YoutubeVideoItem[] = items.map((item: any, idx: number) => ({
      id: item.id.videoId || `yt-${idx}`,
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
      views: '15K+',
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      isFeatured: idx === 0
    }));

    return { videos: videos.length > 0 ? videos : FALLBACK_VIDEOS, isFallback: false };
  } catch (error) {
    console.warn('YouTube API fetch failed, using fallback video list.', error);
    return {
      videos: FALLBACK_VIDEOS,
      isFallback: true
    };
  }
}
