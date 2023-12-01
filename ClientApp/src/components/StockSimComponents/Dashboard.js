﻿import React from 'react';
import SummaryCard from './SummaryCard';
import InvestmentSectorsChart from './InvestmentSectorsChart';
import PortfolioPerformanceChart from './PortfolioPerformanceChart';
import RecentTradesTable from './RecentTradesTable';
import './stock-sim.css'; // Make sure to create a corresponding CSS file for styling

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="summary-cards-container">
                <SummaryCard
                    title="Total Portfolio Value"
                    value="$21,324"
                    icon="faWallet" // Assuming you're using FontAwesome icons
                />
                <SummaryCard
                    title="Profit/Loss Overall"
                    value="+$15,692.55"
                    icon="faChartLine"
                />
                <SummaryCard
                    title="Profit/Loss Today"
                    value="-$89.36"
                    icon="faCalendarDay"
                />
            </div>
            <div className="charts-container">
                <InvestmentSectorsChart />
                <PortfolioPerformanceChart />
            </div>
            <RecentTradesTable />
        </div>
    );
};

export default Dashboard;
