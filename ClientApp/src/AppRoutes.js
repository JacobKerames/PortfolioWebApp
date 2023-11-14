import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Terminal from "./components/Terminal";

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
  }
];

export default AppRoutes;
