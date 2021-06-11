import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";

import { RestaurantProvider } from "./contexts/restaurant.context";

ReactDOM.render(
  <React.StrictMode>
    <RestaurantProvider>
      <App />
    </RestaurantProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
