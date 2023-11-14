import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import Terminal from './components/Terminal';
import './custom.css';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Routes>
                {/* Define the route for Terminal without Layout */}
                <Route path="/" element={<Terminal />} />

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
        );
    }
}