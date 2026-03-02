import React from 'react';
import { Search, Gamepad2, LayoutGrid, Zap, Puzzle, Trophy, MousePointer2 } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CATEGORIES = [
  { id: 'All', icon: LayoutGrid },
  { id: 'Action', icon: Zap },
  { id: 'Puzzle', icon: Puzzle },
  { id: 'Sports', icon: Trophy },
  { id: 'Idle', icon: MousePointer2 },
  { id: 'Arcade', icon: Gamepad2 },
];

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-brand-border bg-brand-bg/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-accent shadow-lg shadow-brand-accent/20">
              <Gamepad2 className="h-6 w-6 text-white" />
            </div>
            <span className="hidden text-xl font-black tracking-tighter sm:block">
              NOVA<span className="text-brand-accent">GAMES</span>
            </span>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-4 w-4 text-brand-muted" />
            </div>
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-2xl border border-brand-border bg-brand-card py-2.5 pl-11 pr-4 text-sm text-brand-text placeholder-brand-muted focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all"
            />
          </div>

          {/* User Profile / Stats (Placeholder) */}
          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-2 rounded-full border border-brand-border bg-brand-card px-4 py-2 text-xs font-medium">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>1,240 Online</span>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20'
                    : 'bg-brand-card text-brand-muted hover:bg-brand-border hover:text-brand-text'
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.id}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
