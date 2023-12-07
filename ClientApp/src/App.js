import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import Home from './components/Home';
import TerminalWindow from './components/TerminalComponents/TerminalWindow';
import { TerminalProvider } from './components/TerminalComponents/TerminalContext';
import { NavMenuProvider } from './components/NavMenuContext';
import './custom.css';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <TerminalProvider>
                <NavMenuProvider>
                    <TerminalWindow />

                    <Routes>
                        <Route path="/" element={<Home />} />

                        {AppRoutes.map((route, index) => {
                            const { element, path } = route;
                            if (path !== "/") {
                                return (
                                    <Route key={index} path={path} element={
                                        <Layout>
                                            {element}
                                        </Layout>
                                    }/>
                                );
                            }
                            return null;
                        })}
                    </Routes>
                </NavMenuProvider>
            </TerminalProvider>
        );
    }
}
