import React from 'react';
import { Game } from '../types';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-brand-card border border-brand-border game-card-hover cursor-pointer"
      onClick={() => onClick(game)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="rounded-full bg-brand-accent p-4 shadow-lg">
            <Play className="h-6 w-6 text-white fill-current" />
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-brand-accent/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-accent backdrop-blur-md border border-brand-accent/30">
            {game.category}
          </span>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-bold text-brand-text group-hover:text-brand-accent transition-colors">
          {game.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-brand-muted">
          {game.description}
        </p>
        <div className="mt-auto pt-4 flex flex-wrap gap-2">
          {game.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] font-mono text-brand-muted/60 uppercase">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
