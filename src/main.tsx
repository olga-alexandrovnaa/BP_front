import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/app";
import { StoreProvider } from "./app/providers/StoreProvider";
// import ErrorBoundary from "antd/es/alert/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <StoreProvider>
        {/* <ErrorBoundary> */}
          <App />
        {/* </ErrorBoundary> */}
    </StoreProvider>
  </BrowserRouter>
  // </React.StrictMode>,
);
