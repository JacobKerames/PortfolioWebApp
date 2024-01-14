"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTerminalContext } from "./TerminalContext";
import Terminal from "./Terminal";

const TerminalWindow = () => {
  const {
    isTerminalVisible,
    setIsTerminalVisible,
    addTerminalOutput,
    clearTerminalOutputs,
  } = useTerminalContext();
  const [isMaximized, setIsMaximized] = useState(false);
  const terminalWindowClass = `terminal-window ${
    isMaximized ? "maximized" : ""
  }`;
  const pathname = usePathname();
  const isIndexPage = pathname === "/";

  // Function to handle close button click
  const handleCloseClick = () => {
    if (isIndexPage) {
      addTerminalOutput(
        "Run a project before closing the terminal.\n",
        "error"
      );
    } else {
      clearTerminalOutputs();
      setIsTerminalVisible(false);
    }
  };

  // Function to toggle the minimize state
  const handleMinimizeClick = () => {
    if (isIndexPage) {
      addTerminalOutput(
        "Run a project before minimizing the terminal.\n",
        "error"
      );
    } else {
      setIsTerminalVisible(false);
    }
  };

  // Function to toggle the maximize state
  const handleMaximizeClick = () => {
    setIsMaximized(!isMaximized);
  };

  // Effect to check the URL path and show the terminal on the index page
  useEffect(() => {
    if (pathname === "/") {
      setIsTerminalVisible(true);
    }
  }, [pathname, setIsTerminalVisible]);

  useEffect(() => {
    // Function to focus on the terminal input
    const focusOnTerminalInput = () => {
      const inputElement = document.querySelector(
        ".terminal-input"
      ) as HTMLInputElement;
      if (inputElement) {
        inputElement.focus();
      }
    };

    // Add click event listener to the whole document
    document.addEventListener("click", focusOnTerminalInput);

    return () => {
      // Clean up: Remove event listener
      document.removeEventListener("click", focusOnTerminalInput);
    };
  }, []);

  return (
    <React.Fragment>
      {isTerminalVisible && (
        <div className={terminalWindowClass}>
          <div className="title-bar">
            <div className="title-bar-controls">
              <button aria-label="Close" onClick={handleCloseClick}></button>
              <button
                aria-label="Minimize"
                onClick={handleMinimizeClick}
              ></button>
              <button
                aria-label="Maximize"
                onClick={handleMaximizeClick}
              ></button>
            </div>
            <div className="title-bar-text">Terminal</div>
          </div>
          <Terminal />
        </div>
      )}
    </React.Fragment>
  );
};

export default TerminalWindow;
