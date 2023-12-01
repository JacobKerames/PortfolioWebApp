import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Terminal from "./components/Terminal";
import StockSimulator from "./components/StockSimulator";

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
        path: '/stock-simulator',
        element: <StockSimulator />
    }
];

export default AppRoutes;
