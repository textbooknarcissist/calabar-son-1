import React from 'react';
import { SOCIAL_POSTS } from '../constants';
import { Instagram } from 'lucide-react';

const SocialProof: React.FC = () => {
  return (
    <section id="community-section" className="py-24 md:py-32 bg-white dark:bg-black transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 font-heading">STYLED BY YOU</h3>
          <p className="text-black/40 dark:text-white/40 uppercase tracking-[0.2em] text-sm">Tag #CalabarSon to be featured</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {SOCIAL_POSTS.map((post) => (
            <button
              key={post.id}
              className="relative group w-full overflow-hidden break-inside-avoid border border-black/5 dark:border-white/5 hover:border-blue-500 transition-colors"
              aria-label={`View ${post.username} on Instagram`}>
              <img
                src={post.image}
                alt={post.username}
                className="w-full h-[300px] sm:h-[400px] object-cover dark:contrast-125 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                <div className="text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Instagram className="w-8 h-8 mx-auto mb-4 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-lg tracking-tight text-white group-hover:text-blue-300 transition-colors">{post.username}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;