"use client";

import React, { createContext, useState, useContext } from "react";

interface TerminalOutput {
  type: string;
  content: string | React.ReactNode;
}

interface TerminalContextType {
  isTerminalVisible: boolean;
  setIsTerminalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  terminalOutputs: TerminalOutput[];
  addTerminalOutput: (text: string | React.ReactNode, type: string) => void;
  clearTerminalOutputs: () => void;
  isInputFocused: boolean;
  setIsInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TerminalProviderProps {
  children: React.ReactNode;
}

const TerminalContext = createContext<TerminalContextType | null>(null);

export const TerminalProvider: React.FC<TerminalProviderProps> = ({
  children,
}) => {
  const [isTerminalVisible, setIsTerminalVisible] = useState<boolean>(true);
  const [terminalOutputs, setTerminalOutputs] = useState<TerminalOutput[]>([]);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const addTerminalOutput = (text: string | React.ReactNode, type: string) => {
    setTerminalOutputs((outputs) => [...outputs, { type, content: text }]);
  };

  const clearTerminalOutputs = () => {
    setTerminalOutputs([]);
  };

  return (
    <TerminalContext.Provider
      value={{
        isTerminalVisible,
        setIsTerminalVisible,
        terminalOutputs,
        addTerminalOutput,
        clearTerminalOutputs,
        isInputFocused,
        setIsInputFocused,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};

export const useTerminalContext = () => {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error(
      "useTerminalContext must be used within a TerminalProvider"
    );
  }
  return context;
};
