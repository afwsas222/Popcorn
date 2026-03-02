import React from 'react';
import { Game } from '../types';
import { X, Maximize2, RotateCcw, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GamePlayerProps {
  game: Game | null;
  onClose: () => void;
}

export const GamePlayer: React.FC<GamePlayerProps> = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const toggleFullscreen = () => {
    if (!iframeRef.current) return;
    if (!document.fullscreenElement) {
      iframeRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const reloadGame = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <AnimatePresence>
      {game && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-bg/95 backdrop-blur-xl p-4 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-brand-border bg-brand-card shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-bottom border-brand-border bg-brand-card p-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 overflow-hidden rounded-xl border border-brand-border">
                  <img src={game.thumbnail} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h2 className="text-lg font-bold leading-none">{game.title}</h2>
                  <p className="text-xs text-brand-muted mt-1">{game.category}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={reloadGame}
                  className="rounded-full p-2 text-brand-muted hover:bg-brand-border hover:text-brand-text transition-colors"
                  title="Reload Game"
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="rounded-full p-2 text-brand-muted hover:bg-brand-border hover:text-brand-text transition-colors"
                  title="Fullscreen"
                >
                  <Maximize2 className="h-5 w-5" />
                </button>
                <a
                  href={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-brand-muted hover:bg-brand-border hover:text-brand-text transition-colors"
                  title="Open in New Tab"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
                <div className="mx-2 h-6 w-px bg-brand-border" />
                <button
                  onClick={onClose}
                  className="rounded-full bg-red-500/10 p-2 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Game Area */}
            <div className="relative flex-1 bg-black">
              <iframe
                ref={iframeRef}
                src={game.url}
                className="h-full w-full border-none"
                allow="autoplay; fullscreen; keyboard; gamepad"
                title={game.title}
              />
            </div>

            {/* Footer Info */}
            <div className="bg-brand-card/50 p-4 text-center">
              <p className="text-xs text-brand-muted">
                Press <kbd className="rounded bg-brand-border px-1.5 py-0.5 font-mono text-[10px]">ESC</kbd> to exit player
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
