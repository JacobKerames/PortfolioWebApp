import React, { useState } from 'react';
import debounce from 'lodash.debounce';

const SearchBar = ({ tickers, value, onChange, onSearch }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch();
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="search"
                    className="search-bar"
                    placeholder="Search for a ticker symbol"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>
        </div>
    );
};

export default SearchBar;
