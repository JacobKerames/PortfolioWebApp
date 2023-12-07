import React, { createContext, useState, useContext } from 'react';

const TerminalContext = createContext();

export const TerminalProvider = ({ children }) => {
    const [isTerminalVisible, setIsTerminalVisible] = useState(true);
    const [terminalOutputs, setTerminalOutputs] = useState([]);

    const addTerminalOutput = (text, type) => {
        setTerminalOutputs(outputs => [...outputs, { type, content: text }]);
    };

    const clearTerminalOutputs = () => {
        setTerminalOutputs([]);
    };

    return (
        <TerminalContext.Provider value={
            {
                isTerminalVisible,
                setIsTerminalVisible,
                terminalOutputs,
                addTerminalOutput,
                clearTerminalOutputs
            }
        }>
            {children}
        </TerminalContext.Provider>
    );
};

export const useTerminalContext = () => useContext(TerminalContext);
