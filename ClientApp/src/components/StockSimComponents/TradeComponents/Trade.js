import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Trade = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        const ticker = searchQuery.toUpperCase();
        navigate(`/stock-trading-sim/trade/transaction/${ticker}`);
    };

    return (
        <div className="trade-container">
            <h1>Make a Trade</h1>
            <SearchBar value={searchQuery} onChange={setSearchQuery} onSearch={handleSearch} />
        </div>
    );
};

export default Trade;
