import React, { useEffect, useState } from 'react';
import Terminal from './Terminal';
import './Terminal.css';

const TerminalWindow = () => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const terminalWindowClass = `terminal-window ${isMaximized ? 'maximized' : ''}`;

    // Function to toggle the minimize state
    const handleMinimizeClick = () => {
        setIsMinimized(!isMinimized);
    };

    // Function to toggle the maximize state
    const handleMaximizeClick = () => {
        setIsMaximized(!isMaximized);
    };

    useEffect(() => {
        // Function to focus on the terminal input
        const focusOnTerminalInput = () => {
            const inputElement = document.querySelector('.terminal-input');
            if (inputElement) {
                inputElement.focus();
            }
        };

        // Add the class to the body element
        document.body.classList.add('is-terminal-window');

        // Add click event listener to the whole document
        document.addEventListener('click', focusOnTerminalInput);

        return () => {
            // Clean up: Remove class and event listener
            document.body.classList.remove('is-terminal-window');
            document.removeEventListener('click', focusOnTerminalInput);
        };
    }, []);

    return (
        <React.Fragment>
            {!isMinimized &&
                <div className={terminalWindowClass}>
                    <div className="title-bar">
                        <div className="title-bar-controls">
                            <button aria-label="Close" onClick={handleMinimizeClick}></button>
                            <button aria-label="Minimize" onClick={handleMinimizeClick}></button>
                            <button aria-label="Maximize" onClick={handleMaximizeClick}></button>
                        </div>
                        <div className="title-bar-text">Terminal</div>
                    </div>
                    <Terminal />
                </div>
            }
        </React.Fragment>
    );
};

export default TerminalWindow;
