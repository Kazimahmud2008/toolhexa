import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search for tools...",
  className = ""
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch?.('');
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-20 py-4 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 shadow-card hover:shadow-glow"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-12 flex items-center pr-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <Button
            type="submit"
            size="sm"
            variant="hero"
            className="rounded-lg"
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;