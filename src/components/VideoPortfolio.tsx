import { useState } from 'react';
import { videosData, getEmbedUrl, getThumbnailUrl, Video } from '@/data/videos';
import { Play, X } from 'lucide-react';
import PixelCard from './PixelCard';

const VideoCard = ({ video, onPlay }: { video: Video; onPlay: (video: Video) => void }) => {
  return (
    <PixelCard className="group overflow-hidden p-0">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={getThumbnailUrl(video)}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onPlay(video)}
            className="w-16 h-16 flex items-center justify-center border-4 border-primary bg-background hover:bg-primary hover:text-background transition-all animate-pixel-pulse"
          >
            <Play size={32} fill="currentColor" />
          </button>
        </div>
        {/* Featured Badge */}
        {video.featured && (
          <div className="absolute top-2 right-2 font-pixel text-pixel-xs px-2 py-1 bg-secondary text-secondary-foreground border-2 border-secondary">
            ★ FEATURED
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-pixel text-pixel-sm text-primary mb-2 line-clamp-2">
          {video.title}
        </h3>
        <p className="font-silkscreen text-sm text-muted-foreground mb-3 line-clamp-2">
          {video.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {video.tags.map((tag) => (
            <span
              key={tag}
              className="font-silkscreen text-xs px-2 py-1 bg-muted text-muted-foreground border border-border"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </PixelCard>
  );
};

const VideoModal = ({ video, onClose }: { video: Video; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-background transition-all z-10"
      >
        <X size={24} />
      </button>

      {/* Video Container */}
      <div className="w-full max-w-4xl animate-fade-in-up">
        <div className="pixel-border">
          <div className="aspect-video bg-muted">
            <iframe
              src={getEmbedUrl(video)}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div className="mt-4 text-center">
          <h3 className="font-pixel text-pixel-base text-primary mb-2">{video.title}</h3>
          <p className="font-silkscreen text-muted-foreground">{video.description}</p>
        </div>
      </div>
    </div>
  );
};

const VideoPortfolio = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const filteredVideos = filter === 'featured' 
    ? videosData.filter(v => v.featured) 
    : videosData;

  return (
    <section id="portfolio" className="py-20 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-pixel text-pixel-xs text-muted-foreground block mb-2">
            {'// VIDEO TUTORIAL'}
          </span>
          <h2 className="font-pixel text-pixel-lg md:text-pixel-xl text-primary text-glow mb-4">
            PORTFOLIO VIDEO
          </h2>
          <p className="font-silkscreen text-muted-foreground max-w-2xl mx-auto">
            Koleksi video tutorial dan dokumentasi project jaringan Mikrotik
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`pixel-btn ${filter === 'all' ? '' : 'pixel-btn-outline'}`}
          >
            SEMUA ({videosData.length})
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`pixel-btn ${filter === 'featured' ? 'pixel-btn-secondary' : 'pixel-btn-outline'}`}
          >
            ★ FEATURED ({videosData.filter(v => v.featured).length})
          </button>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <div
              key={video.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <VideoCard video={video} onPlay={setSelectedVideo} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl mb-4 block">📹</span>
            <p className="font-pixel text-pixel-sm text-muted-foreground">
              TIDAK ADA VIDEO
            </p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </section>
  );
};

export default VideoPortfolio;
