import React, { createContext, useState, useContext } from 'react';

const TerminalContext = createContext();

export const TerminalProvider = ({ children }) => {
    const [isTerminalVisible, setIsTerminalVisible] = useState(true);

    return (
        <TerminalContext.Provider value={{ isTerminalVisible, setIsTerminalVisible }}>
            {children}
        </TerminalContext.Provider>
    );
};

export const useTerminalVisibility = () => useContext(TerminalContext);
