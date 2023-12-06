import TerminalWindow from "./components/TerminalComponents/TerminalWindow";
import StockSim from "./components/StockSimComponents/StockSim";

const AppRoutes = [
    {
        index: true,
        element: <TerminalWindow />
    },
    {
        path: '/stock-trading-sim/*',
        element: <StockSim />
    },
];

export default AppRoutes;
