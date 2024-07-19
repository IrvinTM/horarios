import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ADS235 } from "./pages/ADS235";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
    {
        path: "/ads235",
        element: <ADS235/>
    }
  ]);