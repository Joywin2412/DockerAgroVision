import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App2";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./pages/context";
// import { Provider } from "react-redux";
// import store from './store/now';
// import { createStore } from 'redux'

// const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>

        <App />

      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
