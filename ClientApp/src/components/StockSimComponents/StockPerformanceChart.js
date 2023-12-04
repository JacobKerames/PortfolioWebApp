import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const timeFrames = ['1D', '5D', '1M', '6M', '1Y', '2Y'];

const StockPerformanceChart = ({ ticker }) => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [selectedTimeFrame, setSelectedTimeFrame] = useState('1D');
    const [isDisabled, setIsDisabled] = useState(false);

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
            legend: {
                display: false
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                displayColors: false,
                callbacks: {
                    title: function (tooltipItems) {
                        const date = new Date(tooltipItems[0].raw.t);
                        const month = date.toLocaleString('en-US', { month: 'short' });
                        const day = date.getDate();
                        const year = date.getFullYear();
                        const hour = date.getHours();
                        const minute = date.getMinutes();
                        const hourFormatted = hour % 12 || 12;
                        const minuteFormatted = minute < 10 ? `0${minute}` : minute;
                        const amPm = hour < 12 ? 'AM' : 'PM';

                        return `${month} ${day}, ${year} ${hourFormatted}:${minuteFormatted} ${amPm}`;
                    },
                    label: function (context) {
                        return `${context.parsed.y.toFixed(2)} USD`;
                    }
                }
            }
        },
        hover: {
            mode: 'index',
            intersect: false,
        }
    }

    const fetchData = async (ticker, timeFrame) => {
        const response = await fetch(`https://localhost:7130/StockApi/ticker-performance/${ticker}/${timeFrame}`);
        disableTimeFrames();
        const data = await response.json();

        const results = data.results.map(result => ({
            x: new Date(result.t).toLocaleDateString(),
            y: result.c,
            t: result.t
        }));

        let lineColor = 'black';
        if (results.length > 1) {
            const firstValue = results[0].y;
            const lastValue = results[results.length - 1].y;
            if (firstValue <= lastValue) {
                lineColor = '#81C995';
            } else if (firstValue > lastValue) {
                lineColor = '#F28B82';
            }
        }

        setChartData({
            labels: data.results.map(result => new Date(result.t).toLocaleDateString()),
            datasets: [
                {
                    data: results,
                    fill: false,
                    borderColor: lineColor,
                    lineTension: 0.1
                }
            ]
        });
    };

    useEffect(() => {
        fetchData(ticker, selectedTimeFrame);
    }, [ticker, selectedTimeFrame]);

    const handleTimeFrameChange = (timeFrame) => {
        setSelectedTimeFrame(timeFrame);
        fetchData(ticker, timeFrame);
    };

    const disableTimeFrames = () => {
        setIsDisabled(true);
        setTimeout(() => setIsDisabled(false), 15000);
    };

    return (
        <div className="timeframe-selector">
            <Line data={chartData} options={options} />
            {timeFrames.map((timeFrame) => (
                <button
                    key={timeFrame}
                    disabled={isDisabled}
                    className={selectedTimeFrame === timeFrame ? 'active' : ''}
                    onClick={() => handleTimeFrameChange(timeFrame)}
                >
                    {timeFrame}
                </button>
            ))}
        </div>
    );
};

export default StockPerformanceChart;
