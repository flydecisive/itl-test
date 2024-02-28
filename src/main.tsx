import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/store.tsx";
import "./globalStyles.module.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/">
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
