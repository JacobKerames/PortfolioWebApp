import React from 'react';
import Terminal from './Terminal';
import './Terminal.css';

const TerminalWindow = () => {
    return (
        <div className="terminal-window">
            <div className="title-bar">
                <div className="title-bar-controls">
                    <button aria-label="Close"></button>
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                </div>
                <div className="title-bar-text">Terminal</div>
            </div>
            <Terminal />
        </div>
    );
};

export default TerminalWindow;
