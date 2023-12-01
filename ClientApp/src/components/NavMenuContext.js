import React, { createContext, useState, useContext } from 'react';

export const NavMenuContext = createContext();

export const useNavMenuContext = () => useContext(NavMenuContext);

export const NavMenuProvider = ({ children }) => {
    const [displayName, setDisplayName] = useState("PortfolioWebApp");
    const [navItems, setNavItems] = useState([]);

    // Function to update navigation items based on certain logic
    const updateNavItems = (items) => {
        setNavItems(items);
    };

    return (
        <NavMenuContext.Provider value={{ displayName, setDisplayName, navItems, updateNavItems }}>
            {children}
        </NavMenuContext.Provider>
    );
};
