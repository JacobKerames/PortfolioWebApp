import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Terminal from "./components/TerminalComponents/Terminal";
import StockSim from "./components/StockSimComponents/StockSim";

const AppRoutes = [
    {
        index: true,
        element: <Terminal />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/stock-trading-sim',
        element: <StockSim />
    }
];

export default AppRoutes;
