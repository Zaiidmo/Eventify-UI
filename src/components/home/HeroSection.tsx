import React from 'react';
import { Play, Plus, Info } from 'lucide-react';
import { Event } from '@/types';

interface HeroSectionProps {
  event: Event;
}

const HeroSection: React.FC<HeroSectionProps> = ({ event }) => {
  return (
    <div className="relative h-[80vh] w-full">
      <img
        src={event.heroUrl}
        alt={event.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {event.title}
        </h1>
        
        <div className="flex items-center gap-4 text-white mb-4">
          <span className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            {event.rating}
          </span>
          <span>•</span>
          <span>{event.duration}</span>
          <span>•</span>
          <span className="capitalize">{event.sport}</span>
          {event.category === 'live' && (
            <>
              <span>•</span>
              <span className="text-red-500 font-semibold">LIVE</span>
            </>
          )}
        </div>
        
        <p className="text-gray-200 max-w-2xl mb-8">
          {event.description}
        </p>
        
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded hover:bg-white/90 transition">
            <Play className="w-5 h-5" />
            Part
          </button>
          <button className="flex items-center gap-2 px-8 py-3 bg-gray-500/50 text-white rounded hover:bg-gray-500/70 transition backdrop-blur-sm">
            <Info className="w-5 h-5" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;