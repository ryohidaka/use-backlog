import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BacklogProvider } from "..";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BacklogProvider>
      <App />
    </BacklogProvider>
  </React.StrictMode>,
);
