import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";

import "@mui/material";

import { Provider } from "react-redux";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import store from "./Redux/store";
let persistor = persistStore(store); // Creating a persistor to persist the store

const root = ReactDOM.createRoot(document.getElementById("root")); //  root for rendering the app
root.render(
  <Provider store={store}>
    {/* Wrapping the app with the Provider component to provide the Redux store to all components */}
    <PersistGate persistor={persistor}>
      {/* Wrapping the app with PersistGate to delay rendering until the store is rehydrated */}
      <App />
      {/* Rendering the main App component */}
    </PersistGate>
  </Provider>
);
