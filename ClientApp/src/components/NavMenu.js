import React, { useState, useContext } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { NavMenuContext } from './NavMenuContext';
import { useTerminalContext } from './TerminalComponents/TerminalContext';
import './NavMenu.css';

const NavMenu = () => {
    const { displayName, navItems } = useContext(NavMenuContext);
    const { setIsTerminalVisible } = useTerminalContext();
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    const handleReturnToTerminalClick = (e) => {
        e.preventDefault();
        setIsTerminalVisible(true);
    };

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/">{displayName}</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem className="terminal-return-nav-item">
                            <NavLink tag={Link} className="text-dark" onClick={handleReturnToTerminalClick}>Show Terminal</NavLink>
                        </NavItem>
                        {navItems.map((item, index) => (
                            <NavItem key={index}>
                                <NavLink tag={Link} className="text-dark" to={item.path}>
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
