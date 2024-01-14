import React, { createContext, useState, useContext, ReactNode } from 'react';

interface NavItem {
    path: string;
    label: string;
}

interface NavMenuContextType {
    displayName: string;
    setDisplayName: React.Dispatch<React.SetStateAction<string>>;
    navItems: NavItem[];
    updateNavItems: (items: NavItem[]) => void;
}

const defaultContextValue: NavMenuContextType = {
    displayName: "PortfolioWebApp",
    setDisplayName: () => {},
    navItems: [],
    updateNavItems: () => {}
};

export const NavMenuContext = createContext<NavMenuContextType>(defaultContextValue);

export const useNavMenuContext = () => useContext(NavMenuContext);

interface NavMenuProviderProps {
    children: ReactNode;
}

export const NavMenuProvider: React.FC<NavMenuProviderProps> = ({ children }) => {
    const [displayName, setDisplayName] = useState<string>("PortfolioWebApp");
    const [navItems, setNavItems] = useState<NavItem[]>([]);

    const updateNavItems = (items: NavItem[]) => {
        setNavItems(items);
    };

    return (
        <NavMenuContext.Provider value={{ displayName, setDisplayName, navItems, updateNavItems }}>
            {children}
        </NavMenuContext.Provider>
    );
};
