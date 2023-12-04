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
