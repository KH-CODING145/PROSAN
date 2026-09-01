import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { fetchYoutubeVideos } from '../../services/youtubeApi';
import { YoutubeVideoItem } from '../../types';
import { siteConfig } from '../../config/siteConfig';
import { SectionTitle } from '../common/SectionTitle';
import { Badge } from '../common/Badge';
import { Youtube, Play, Eye, Calendar, ExternalLink } from 'lucide-react';

export const YoutubeSection: React.FC = () => {
  const [videos, setVideos] = useState<YoutubeVideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await fetchYoutubeVideos();
        if (isMounted) setVideos(res.videos);
      } catch (e) {
        console.warn('Failed to load YouTube videos', e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, []);

  const featuredVideo = videos.find(v => v.isFeatured) || videos[0];
  const restVideos = videos.filter(v => v.id !== featuredVideo?.id);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Engineering Content"
          title="YouTube Video Breakdowns & Tutorials"
          description="In-depth video tutorials covering advanced React 19 patterns, autonomous agent architectures, and high-performance system design."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Featured Video Card */}
          {featuredVideo && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs hover:border-red-500/40 transition-all flex flex-col group"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center group-hover:bg-slate-950/30 transition-colors">
                  <a
                    href={featuredVideo.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch ${featuredVideo.title} on YouTube`}
                    className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform"
                  >
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </a>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="rose" size="sm" dot>
                    Featured Deep Dive
                  </Badge>
                </div>
                {featuredVideo.duration && (
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-slate-950/80 rounded text-[11px] font-mono text-white">
                    {featuredVideo.duration}
                  </div>
                )}
              </div>

              <div className="p-6 space-y-3">
                <a
                  href={featuredVideo.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white hover:text-red-500 transition-colors line-clamp-2"
                >
                  {featuredVideo.title}
                </a>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {featuredVideo.description}
                </p>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    {featuredVideo.views} views
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {featuredVideo.publishedAt}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Secondary Video List */}
          <div className="lg:col-span-5 space-y-4">
            {restVideos.map((video) => (
              <motion.a
                key={video.id}
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-red-500/40 hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-all group"
              >
                <div className="relative w-32 sm:w-36 aspect-video rounded-xl overflow-hidden bg-slate-950 shrink-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-red-600/90 text-white flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-red-500 transition-colors">
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 mt-2">
                    <span>{video.views} views</span>
                    <span>•</span>
                    <span>{video.publishedAt}</span>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* View Channel CTA */}
            <div className="pt-2">
              <a
                href={siteConfig.profile.social.youtube || 'https://youtube.com/@kimsan2000'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-red-600/10 text-red-600 dark:text-red-400 hover:bg-red-600/20 text-xs sm:text-sm font-semibold border border-red-500/20 transition-colors"
              >
                <Youtube className="w-4 h-4" />
                <span>Subscribe on YouTube Channel (@kimsan2000)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
