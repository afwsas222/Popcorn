import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { GameCard } from './components/GameCard';
import { GamePlayer } from './components/GamePlayer';
import { Game } from './types';
import gamesDataRaw from './games.json';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Sparkles, Clock } from 'lucide-react';

const gamesData = (Array.isArray(gamesDataRaw) ? gamesDataRaw : (gamesDataRaw as any).default || []) as Game[];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  const filteredGames = useMemo(() => {
    return (gamesData as Game[]).filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-accent/30">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero / Featured Section (Only show when not searching) */}
        {!searchQuery && selectedCategory === 'All' && (
          <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="relative h-[300px] overflow-hidden rounded-3xl border border-brand-border bg-brand-card group cursor-pointer" onClick={() => setActiveGame(gamesData[0] as Game)}>
                <img 
                  src="https://picsum.photos/seed/featured/1200/600" 
                  alt="Featured" 
                  className="h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <div className="flex items-center gap-2 text-brand-accent mb-2">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">Featured Game</span>
                  </div>
                  <h1 className="text-4xl font-black tracking-tighter text-white mb-2">SLOPE UNBLOCKED</h1>
                  <p className="max-w-md text-brand-muted text-sm">Experience the ultimate speed challenge. Navigate the neon slopes and beat the high score.</p>
                  <button className="mt-6 rounded-full bg-brand-accent px-8 py-3 font-bold text-white shadow-xl shadow-brand-accent/20 hover:bg-brand-accent/90 transition-all">
                    Play Now
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex-1 rounded-3xl border border-brand-border bg-brand-card p-6">
                <div className="flex items-center gap-2 text-orange-500 mb-4">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Trending Now</span>
                </div>
                <div className="space-y-4">
                  {gamesData.slice(1, 4).map((game, i) => (
                    <div key={game.id} className="flex items-center gap-4 group cursor-pointer" onClick={() => setActiveGame(game as Game)}>
                      <span className="text-2xl font-black text-brand-muted/20">{i + 1}</span>
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-brand-border">
                        <img src={game.thumbnail} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm group-hover:text-brand-accent transition-colors">{game.title}</h4>
                        <p className="text-[10px] text-brand-muted uppercase tracking-wider">{game.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-brand-border bg-brand-card p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-brand-border p-2">
                    <Clock className="h-5 w-5 text-brand-muted" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Recently Added</h4>
                    <p className="text-[10px] text-brand-muted">2 new games today</p>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-brand-card bg-brand-border overflow-hidden">
                      <img src={`https://picsum.photos/seed/game${i}/50/50`} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Game Grid */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-black tracking-tight">
            {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory === 'All' ? 'All Games' : `${selectedCategory} Games`}
            <span className="ml-3 text-sm font-medium text-brand-muted">({filteredGames.length})</span>
          </h2>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredGames.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} onClick={setActiveGame} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="rounded-full bg-brand-card p-6 mb-4 border border-brand-border">
                <Sparkles className="h-10 w-10 text-brand-muted" />
              </div>
              <h3 className="text-xl font-bold">No games found</h3>
              <p className="text-brand-muted">Try searching for something else or check another category.</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                className="mt-6 text-brand-accent font-bold hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Game Player Modal */}
      <GamePlayer game={activeGame} onClose={() => setActiveGame(null)} />

      {/* Footer */}
      <footer className="mt-20 border-t border-brand-border bg-brand-card/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-accent">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-black tracking-tighter">
                NOVA<span className="text-brand-accent">GAMES</span>
              </span>
            </div>
            <div className="flex gap-8 text-sm text-brand-muted">
              <a href="#" className="hover:text-brand-text transition-colors">About</a>
              <a href="#" className="hover:text-brand-text transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-text transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-brand-text transition-colors">Contact</a>
            </div>
            <p className="text-xs text-brand-muted/60">
              © 2026 Nova Games. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
