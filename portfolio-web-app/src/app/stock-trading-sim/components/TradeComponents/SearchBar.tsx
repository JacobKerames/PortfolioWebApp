import { useState, useEffect, FormEvent, ChangeEvent } from 'react';

interface SearchBarProps {
    value: string;
    onChange: (newValue: string) => void;
    onSearch: (searchValue: string) => void;
}

interface Suggestion {
    symbol: string;
    name: string;
}

const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [submittedValue, setSubmittedValue] = useState<string>('');

    const fetchData = async (query: string) => {
        if (query === '') {
            setSuggestions([]);
            return;
        }
        try {
            const response = await fetch(`https://localhost:7130/StockApi/ticker-search/${query}`);
            const data: Suggestion[] = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(value);
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
        fetchData(newValue);
    };

    useEffect(() => {
        if (submittedValue) {
            onSearch(submittedValue);
            setSubmittedValue('');
        }
    }, [submittedValue, onSearch]);

    const handleSuggestionClick = (suggestion: Suggestion) => {
        onChange(suggestion.symbol);
        setSuggestions([]);
        setSubmittedValue(suggestion.symbol);
    };

    return (
        <div className="search-bar-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="search"
                    className="search-bar"
                    placeholder="Search for a ticker symbol"
                    value={value}
                    onChange={handleOnChange}
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            {suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} className="suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion.symbol} - {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
