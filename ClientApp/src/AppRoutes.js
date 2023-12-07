import Home from "./components/Home";
import StockSim from "./components/StockSimComponents/StockSim";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/stock-trading-sim/*',
        element: <StockSim />
    },
];

export default AppRoutes;
