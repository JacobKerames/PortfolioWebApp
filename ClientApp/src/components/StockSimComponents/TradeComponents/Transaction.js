import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import StockPerformanceChart from '../StockPerformanceChart';

const Transaction = () => {
    const { ticker } = useParams();

    const [transactionType, setTransactionType] = useState('buy');
    const [quantity, setQuantity] = useState(0);

    const handleTradeConfirmation = () => {
        // Logic to handle trade confirmation
    };

    return (
        <div className="transaction-container">
            {ticker && <StockPerformanceChart ticker={ticker} />}
            <div className="transaction-form">
                {/* Radio buttons and quantity input */}
                <button onClick={handleTradeConfirmation}>Confirm Trade</button>
            </div>
        </div>
    );
};

export default Transaction;
