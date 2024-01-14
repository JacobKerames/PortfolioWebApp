import React, { useState, useContext } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import Link from 'next/link';
import { NavMenuContext } from './NavMenuContext';
import { useTerminalContext } from './TerminalComponents/TerminalContext';
import { IconContext } from "react-icons";
import { GoTerminal } from "react-icons/go";

interface NavItemType {
    path: string;
    label: string;
}

const NavMenu = () => {
    const { displayName, navItems } = useContext(NavMenuContext);
    const { setIsTerminalVisible } = useTerminalContext();
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    const handleReturnToTerminalClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsTerminalVisible(true);
    };

    return (
        <header>
            <Navbar className="navbar-expand-md mb-3" container>
                <div className="d-flex justify-content-between w-100">
                    <NavbarBrand tag={Link} to="/">{displayName}</NavbarBrand>
                    <NavItem className="navbar-nav">
                        <button className="terminal-button" onClick={handleReturnToTerminalClick}>
                            <span className="icon-text">
                                <IconContext.Provider value={{ className: "react-icon" }}>  
                                    <GoTerminal />
                                </IconContext.Provider>
                                <span> Terminal</span>
                            </span>
                        </button>
                    </NavItem>
                    <NavbarToggler onClick={toggleNavbar} className="navbar-dark" />
                </div>
                <Collapse isOpen={!collapsed} navbar>
                    <ul className="navbar-nav">
                        {navItems.map((item: NavItemType, index: number) => (
                            <NavItem key={index}>
                                <NavLink tag={Link} className="nav-link" to={item.path}>
                                    {item.label}
                                </NavLink>
                            </NavItem>
                        ))}
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
};

export default NavMenu;
