"use client";

import { useState } from 'react';
import StockPerformanceChart from '../../components/StockPerformanceChart';
import { useSearchParams } from 'next/navigation';

const Transaction: React.FC = () => {
    const searchParams = useSearchParams();
    const ticker = searchParams.get('ticker'); // Replace 'ticker' with the actual query param name

    const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy');
    const [quantity, setQuantity] = useState<number>(0);

    const handleTradeConfirmation = () => {
        // Logic to handle trade confirmation
    };

    return (
        <div className="transaction-container">
            <h1>{ticker}</h1>
            {ticker && <StockPerformanceChart ticker={ticker} />}
            <div className="transaction-form">
                <div>
                    <label>
                        <input
                            type="radio"
                            value="buy"
                            checked={transactionType === 'buy'}
                            onChange={() => setTransactionType('buy')}
                        />
                        Buy
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="sell"
                            checked={transactionType === 'sell'}
                            onChange={() => setTransactionType('sell')}
                        />
                        Sell
                    </label>
                </div>
                <div>
                    <label>
                        Quantity
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(0, e.target.valueAsNumber))}
                            min="0"
                        />
                    </label>
                </div>
                <button onClick={handleTradeConfirmation}>Confirm Trade</button>
            </div>
        </div>
    );
};

export default Transaction;
