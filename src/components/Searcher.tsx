import { useState, useEffect } from 'react';
import { type User } from '../types';
import { type SearcherProps } from '../types';
import useAuth from '../hooks/useAuth';
import useDebounce from '../hooks/useDebounce';

export const Searcher = ({ users, searchTerm, setSearchTerm }: SearcherProps) => {
    const { id } = useAuth();
    const [suggestions, setSuggestions] = useState<User[]>([]);
    const [inputValue, setInputValue] = useState(searchTerm);
    
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

    const processSearch = () => {
        const term = inputValue;
        setSearchTerm(term); 

        if (term) {
            const lowerTerm = term.toLowerCase();
            const filteredUsers = users.filter((u) => u.userName.toLowerCase().includes(lowerTerm));
            if (filteredUsers.length === 0) {
                const suggested = users.filter((u) => u.id !== id)
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

    useDebounce(processSearch, 300); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSuggestionClick = (userName: string) => {
        setInputValue(userName);
        setSearchTerm(userName); 
        setSuggestions([]); 
    };

    useEffect(() => {
        setInputValue(searchTerm);
    }, [searchTerm]);

    return (
        <div className="searcher-container">
            <input
                type="text"
                placeholder="Buscar por alias"
                value={inputValue} 
                onChange={handleInputChange} 
                className="search-input"
            />
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    <h3>Sugerencias</h3>
                    {suggestions.map((suggestion) => (
                        <li 
                            key={suggestion.id} 
                            onClick={() => handleSuggestionClick(suggestion.userName)}
                            className="suggestion-item" 
                        >
                            {suggestion.userName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};