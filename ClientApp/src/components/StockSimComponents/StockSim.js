import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavMenuContext } from '../NavMenuContext';
import Dashboard from './Dashboard';

const StockSim = () => {
    const { setDisplayName, updateNavItems } = useNavMenuContext();

    const stockSimNavItems = [
        { path: '/stock-trading-sim', label: 'Dashboard' },
        { path: '/stock-trading-sim/trade', label: 'Trade' },
        { path: '/stock-trading-sim/performance', label: 'Performance' },
        { path: '/stock-trading-sim/account', label: 'Account' },
    ];

    useEffect(() => {
        // Set display name and navigation items for StockSim
        setDisplayName("Stock Trading Simulator");
        updateNavItems(stockSimNavItems);

        return () => {
            // Reset display name and navigation items when unmounting
            setDisplayName("PortfolioWebApp");
            updateNavItems([]); // Assuming you want to clear the nav items on unmount
        };
    }, []);

    return (
        <div>
            <Routes>
                <Route index element={<Dashboard />} />
            </Routes>
        </div>
    );
};

export default StockSim;
