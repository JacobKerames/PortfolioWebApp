import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const timeFrames = ['1D', '5D', '1M', '6M', '1Y', '5Y', 'Max'];

const StockPerformanceChart = ({ ticker }) => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [selectedTimeFrame, setSelectedTimeFrame] = useState('1D');

    const options = {
        elements: {
            point: {
                radius: 0
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    maxTicksLimit: 5
                }
            },
            y: {
                grid: {
                    display: true
                }
            }
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        hover: {
            mode: 'index',
            intersect: false,
        }
    }

    const handleTimeFrameChange = (timeFrame) => {
        setSelectedTimeFrame(timeFrame);
        fetchData(ticker, timeFrame);
    };

    // Function to fetch data based on ticker and time frame
    const fetchData = async (ticker, timeFrame) => {
        const response = await fetch(`https://localhost:7130/StockApi/ticker/${ticker}?timeFrame=${timeFrame}`);
        const data = await response.json();

        setChartData({
            labels: data.results.map(result => new Date(result.t).toLocaleDateString()),
            datasets: [
                {
                    label: `${ticker} Stock Price`,
                    data: data.results.map(result => result.c),
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    fill: false,
                }
            ]
        });
    };

    // Fetch data when the component mounts and when ticker or selectedTimeFrame changes
    useEffect(() => {
        fetchData(ticker, selectedTimeFrame);
    }, [ticker, selectedTimeFrame]);

    return (
        <div className="timeframe-selector">
            {timeFrames.map((timeFrame) => (
                <button
                    key={timeFrame}
                    className={selectedTimeFrame === timeFrame ? 'active' : ''}
                    onClick={() => handleTimeFrameChange(timeFrame)}
                >
                    {timeFrame}
                </button>
            ))}
            <Line data={chartData} options={options} />
        </div>
    );
};

export default StockPerformanceChart;
