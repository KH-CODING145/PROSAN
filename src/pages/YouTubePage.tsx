import React, { useState, useEffect } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { SectionTitle } from '../components/common/SectionTitle';
import { fetchYoutubeVideos } from '../services/youtubeApi';
import { YoutubeVideoItem } from '../types';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { 
  Youtube, 
  Play, 
  Eye, 
  Calendar, 
  ExternalLink, 
  RefreshCw, 
  Sparkles,
  Users,
  Video,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';

export const YouTubePage: React.FC = () => {
  const [videos, setVideos] = useState<YoutubeVideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [activeVideo, setActiveVideo] = useState<YoutubeVideoItem | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchYoutubeVideos();
      setVideos(data.videos);
      setIsFallback(data.isFallback);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer
      title="Engineering Video Tutorials & Architecture Breakdowns"
      description="Deep-dive full-stack software architecture masterclasses, AI agent tutorials, and live coding sessions on YouTube by PRO SAN."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionTitle
          tag="Developer Masterclasses"
          title="Video Tutorials & Architecture Breakdowns"
          description="In-depth video tutorials covering modern React 19, Gemini multi-agent systems, headless browser automation, and scalable backend design."
        />

        {/* Channel Banner Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-950 border border-red-500/20 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg shrink-0">
              <Youtube className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold">PRO SAN Dev Tutorials</h3>
                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-mono font-semibold">Verified</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-mono mt-0.5">
                Technical Education • Architecture Walkthroughs • 100K+ Dev Views
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              asAnchor
              href="https://youtube.com/@kimsan2000"
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<Youtube className="w-4 h-4" />}
            >
              Subscribe on YouTube
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={loadData}
              disabled={isLoading}
              leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs hover:border-red-500/40 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Video Thumbnail */}
                <div
                  onClick={() => setActiveVideo(video)}
                  className="relative aspect-video w-full overflow-hidden bg-slate-950 cursor-pointer"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors" />

                  {/* Play Button Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {video.duration && (
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-slate-950/80 text-white font-mono text-[11px] backdrop-blur-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {video.duration}
                    </span>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-5 space-y-2.5">
                  <h4 
                    onClick={() => setActiveVideo(video)}
                    className="text-base font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 cursor-pointer"
                  >
                    {video.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-red-500" />
                    {video.views} views
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {video.publishedAt}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Player Modal */}
        <Modal
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          title={activeVideo?.title || 'Video Player'}
          size="xl"
        >
          {activeVideo && (
            <div className="space-y-4">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950">
                {activeVideo.videoUrl.includes('watch?v=') ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideo.videoUrl.split('watch?v=')[1]}?autoplay=1`}
                    title={activeVideo.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <Youtube className="w-16 h-16 text-red-500" />
                    <div>
                      <h4 className="text-lg font-bold text-white">{activeVideo.title}</h4>
                      <p className="text-sm text-slate-400 max-w-md mt-1">{activeVideo.description}</p>
                    </div>
                    <Button
                      variant="primary"
                      asAnchor
                      href={activeVideo.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      leftIcon={<ExternalLink className="w-4 h-4" />}
                    >
                      Watch on YouTube Channel
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono text-slate-500">
                  {activeVideo.views} views • {activeVideo.publishedAt}
                </span>
                <a
                  href={activeVideo.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  Open in YouTube <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </PageContainer>
  );
};
