import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyleSheetManager } from "styled-components";
import { ErrorBoundary } from "react-error-boundary";

import App from "./App.jsx";
import ErrorFallback from "./ui/ErrorFallback.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary
      // Identify the fallback component when an erro boundary is caught
      FallbackComponent={ErrorFallback}
      // Error boundary reset handler
      onReset={() => window.location.replace("/")}
    >
      <StyleSheetManager shouldForwardProp={() => true}>
        <App />
      </StyleSheetManager>
    </ErrorBoundary>
  </StrictMode>
);
