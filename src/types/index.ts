export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    thumbnailUrl: string;
    heroUrl: string;
    sport: string;
    duration: string;
    category: 'live' | 'upcoming' | 'replay';
    views: number;
    rating: number;
    tags: string[];
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    watchlist: string[];
    recentlyWatched: string[];
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  }
  
  export interface EventsState {
    events: Event[];
    loading: boolean;
    error: string | null;
  }