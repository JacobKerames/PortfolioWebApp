"use client";

import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useRouter } from 'next/navigation';

const Trade: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const router = useRouter();

    const handleSearch = () => {
        const ticker = searchQuery.toUpperCase();
        router.push(`/stock-trading-sim/trade/transaction/${ticker}`);
    };

    return (
        <div className="trade-container">
            <h1>Make a Trade</h1>
            <SearchBar value={searchQuery} onChange={setSearchQuery} onSearch={handleSearch} />
        </div>
    );
};

export default Trade;
