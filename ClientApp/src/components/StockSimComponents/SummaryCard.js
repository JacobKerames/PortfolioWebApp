import React from 'react';

const SummaryCard = ({ title, value, icon }) => {
    return (
        <div className="summary-card">
            <div className="card-title">
                <i className={`fas ${icon}`}></i>
                {title}
            </div>
            <div className="card-value">{value}</div>
        </div>
    );
};

export default SummaryCard;
