import React, { useState, useEffect } from 'react';

const SearchBar = ({ value, onChange, onSearch }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [submittedValue, setSubmittedValue] = useState('');

    const fetchData = async (query) => {
        if (query === '') {
            setSuggestions([]);
            return;
        }
        try {
            const response = await fetch(`https://localhost:7130/StockApi/ticker-search/${query}`);
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(value);
    };

    const handleOnChange = (e) => {
        const newValue = e.target.value;
        onChange(newValue);
        fetchData(newValue);
    };

    useEffect(() => {
        if (submittedValue) {
            onSearch(submittedValue);
            setSubmittedValue('');
        }
    }, [submittedValue]);

    const handleSuggestionClick = (suggestion) => {
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
