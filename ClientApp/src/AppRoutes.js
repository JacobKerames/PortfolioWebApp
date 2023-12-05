import Terminal from "./components/TerminalComponents/Terminal";
import StockSim from "./components/StockSimComponents/StockSim";

const AppRoutes = [
    {
        index: true,
        element: <Terminal />
    },
    {
        path: '/stock-trading-sim/*',
        element: <StockSim />
    },
];

export default AppRoutes;
