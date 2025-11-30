import { useState  } from 'react';
import { type User } from '../types';
import {type  SearcherProps } from '../types';

export const Searcher = ({ users, searchTerm, setSearchTerm }: SearcherProps) => {
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const levenshteinDistance = (a: string, b: string): number => {
    const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
    return matrix[a.length][b.length];
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term); 

    if (term) {
      const lowerTerm = term.toLowerCase();
      const filteredUsers = users.filter((u) => u.userName.toLowerCase().includes(lowerTerm));

      if (filteredUsers.length === 0) {
        const suggested = users
          .map((u) => ({ 
            ...u, 
            distance: levenshteinDistance(lowerTerm, u.userName.toLowerCase()) 
          }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 5) as User[]; 
        
        setSuggestions(suggested);
      } else {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="searcher-container">
      <input
        type="text"
        placeholder="Buscar por alias"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id}>{suggestion.userName} (Sugerencia)</li>
          ))}
        </ul>
      )}
    </div>
  );
};