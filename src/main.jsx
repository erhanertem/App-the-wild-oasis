import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { StyleSheetManager } from "styled-components";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={() => true}>
      {/* FILTERS UNKNOWN PROPS FOR STYLED-COMPONENTS */}
      <App />
    </StyleSheetManager>
  </React.StrictMode>
);
