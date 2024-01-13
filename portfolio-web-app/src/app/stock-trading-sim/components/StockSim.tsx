import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNavMenuContext } from '../../components/NavMenuContext';

interface NavItem {
  path: string;
  label: string;
}

const StockSim: React.FC = () => {
    const { setDisplayName, updateNavItems } = useNavMenuContext();
    const router = useRouter();

    useEffect(() => {
        const stockSimNavItems: NavItem[] = [
            { path: '/stock-trading-sim', label: 'Dashboard' },
            { path: '/stock-trading-sim/trade', label: 'Trade' },
            { path: '/stock-trading-sim/performance', label: 'Performance' },
            { path: '/stock-trading-sim/account', label: 'Account' },
        ];

        setDisplayName("Stock Trading Simulator");
        updateNavItems(stockSimNavItems);

        return () => {
            setDisplayName("PortfolioWebApp");
            updateNavItems([]);
        };
    }, [setDisplayName, updateNavItems]);

    const goToDashboard = () => {
        router.push('/stock-trading-sim');
    };

    const goToTradePage = () => {
        router.push('/stock-trading-sim/trade');
    };

    const goToPerformancePage = () => {
        router.push('/stock-trading-sim/performance');
    };

    const goToAccountPage = () => {
        router.push('/stock-trading-sim/account');
    };

    return (
        <div>
            <button onClick={goToDashboard}>Dashboard</button>
            <button onClick={goToTradePage}>Trade</button>
            <button onClick={goToPerformancePage}>Performance</button>
            <button onClick={goToAccountPage}>Account</button>
        </div>
    );
};

export default StockSim;
