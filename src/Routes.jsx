import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ADS235 } from "./pages/ADS235";
import { GPO135 } from "./pages/GPO135";
import { IGE135 } from "./pages/IGE135";
import { PDN135 } from "./pages/PDN135";
import { PMM135 } from "./pages/PMM135";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/ads235",
    element: <ADS235 />,
  },
  {
    path: "/gpo135",
    element: <GPO135 />,
  },
  {
    path: "/ige135",
    element: <IGE135 />,
  },
  {
    path: "/pdn135",
    element: <PDN135 />,
  },
  {
    path: "/pmm135",
    element: <PMM135 />,
  },
]);
