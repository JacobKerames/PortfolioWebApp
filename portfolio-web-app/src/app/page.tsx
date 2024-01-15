"use client";

import { useEffect, useRef } from "react";
import { useTerminalContext } from "./components/TerminalComponents/TerminalContext";
import TerminalWindow from "./components/TerminalComponents/TerminalWindow";

const Home = () => {
  const { terminalOutputs, isInputFocused } = useTerminalContext();

  const endOfPageRef = useRef<HTMLDivElement>(null);

  // Auto-scrolling effect to keep the latest terminal output in view.
  useEffect(() => {
    if (endOfPageRef.current) {
      endOfPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalOutputs, isInputFocused]);

  return (
    <>
      <div className="home-container">
        <TerminalWindow />
      </div>
      <div ref={endOfPageRef} />
    </>
  );
};

export default Home;
