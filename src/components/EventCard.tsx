import React from 'react';
import { Play, Plus, Star } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  size?: 'small' | 'large';
}

const EventCard: React.FC<EventCardProps> = ({ event, size = 'small' }) => {
  const isLarge = size === 'large';

  return (
    <div 
      className={`relative group ${
        isLarge ? 'col-span-2 row-span-2' : ''
      }`}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={event.thumbnailUrl}
          alt={event.title}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            isLarge ? 'h-[400px]' : 'h-[200px]'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className={`text-white font-bold ${
            isLarge ? 'text-2xl' : 'text-lg'
          }`}>
            {event.title}
          </h3>
          
          <div className="flex items-center gap-2 text-gray-200 mt-2">
            <span className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              {event.rating}
            </span>
            <span>•</span>
            <span>{event.duration}</span>
            <span>•</span>
            <span className="capitalize">{event.sport}</span>
          </div>
          
          {isLarge && (
            <p className="text-gray-300 mt-2 line-clamp-2">
              {event.description}
            </p>
          )}
        </div>

        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors">
            <Plus className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors">
            <Play className="w-5 h-5 text-white" />
          </button>
        </div>

        {event.category === 'live' && (
          <div className="absolute top-4 left-4 px-2 py-1 bg-red-600 text-white text-sm font-medium rounded">
            LIVE
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;