import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTerminalVisibility } from './TerminalContext';
import Terminal from './Terminal';
import './Terminal.css';

const TerminalWindow = () => {
    const { isTerminalVisible, setIsTerminalVisible } = useTerminalVisibility();
    const [isMaximized, setIsMaximized] = useState(false);
    const terminalWindowClass = `terminal-window ${isMaximized ? 'maximized' : ''}`;
    const terminalRef = useRef();
    const location = useLocation();
    const isIndexPage = location.pathname === '/';

    // Function to handle close button click
    const handleCloseClick = () => {
        if (terminalRef.current) {
            if (isIndexPage) {
                terminalRef.current.addOutput('Run a project before closing the terminal.\n', 'error');
            } else {
                terminalRef.current.clearOutputs();
                setIsTerminalVisible(false);
            }
        }
    };

    // Function to toggle the minimize state
    const handleMinimizeClick = () => {
        if (terminalRef.current) {
            if (isIndexPage) {
                terminalRef.current.addOutput('Run a project before minimizing the terminal.\n', 'error');
            } else {
                setIsTerminalVisible(false);
            }
        }
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

        // Add click event listener to the whole document
        document.addEventListener('click', focusOnTerminalInput);

        return () => {
            // Clean up: Remove event listener
            document.removeEventListener('click', focusOnTerminalInput);
        };
    }, []);

    return (
        <React.Fragment>
            {isTerminalVisible &&
                <div className={terminalWindowClass}>
                    <div className="title-bar">
                        <div className="title-bar-controls">
                            <button aria-label="Close" onClick={handleCloseClick}></button>
                            <button aria-label="Minimize" onClick={handleMinimizeClick}></button>
                            <button aria-label="Maximize" onClick={handleMaximizeClick}></button>
                        </div>
                        <div className="title-bar-text">Terminal</div>
                    </div>
                    <Terminal ref={terminalRef} />
                </div>
            }
        </React.Fragment>
    );
};

export default TerminalWindow;
