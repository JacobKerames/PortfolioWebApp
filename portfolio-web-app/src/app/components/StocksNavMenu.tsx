'use client';

import Link from 'next/link';
import { useTerminalContext } from './TerminalComponents/TerminalContext';
import { IconContext } from "react-icons";
import { GoTerminal } from "react-icons/go";

const StocksNavMenu = () => {
    const { setIsTerminalVisible } = useTerminalContext();

    const handleReturnToTerminalClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsTerminalVisible(true);
    };

    return (
        <header>
            <nav className="flex justify-between items-center p-4 shadow-lg" style={{ backgroundColor: '#02040A', borderBottom: '1px solid #30363D' }}>
                <Link href="/stocks" className="text-lg font-bold">Stock Trading Simulator</Link>
                <button className="terminal-button" onClick={handleReturnToTerminalClick}>
                    <span className="icon-text">
                        <IconContext.Provider value={{ className: "react-icon" }}>  
                            <GoTerminal />
                        </IconContext.Provider>
                        <span> Terminal</span>
                    </span>
                </button>
            </nav>
        </header>
    );
};

export default StocksNavMenu;
