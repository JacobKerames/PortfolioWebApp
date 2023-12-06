import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import TerminalWindow from './components/TerminalComponents/TerminalWindow';
import { NavMenuProvider } from './components/NavMenuContext';
import './custom.css';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <NavMenuProvider>
                <Routes>
                    {/* Define the route for Terminal without Layout */}
                    <Route path="/" element={<TerminalWindow />} />

                    {/* Map over the rest of the routes and apply Layout */}
                    {AppRoutes.map((route, index) => {
                        const { element, path } = route;
                        // Check if the current route is not the Terminal
                        if (path !== "/") {
                            return (
                                <Route key={index} path={path} element={<Layout>{element}</Layout>} />
                            );
                        }
                        return null; // For the terminal route, we already have an element defined
                    })}
                </Routes>
            </NavMenuProvider>
        );
    }
}
