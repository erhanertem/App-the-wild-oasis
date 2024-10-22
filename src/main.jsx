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
      /**
       * Using window.location.replace("/") causes a full-page reload. This means that the current state of the application is completely cleared, and the browser navigates to the specified URL (/). The entire React app is reloaded, and any potential memory leaks or problematic state that caused the error are fully reset.
       */
      onReset={() => window.location.replace("/")}
    >
      <StyleSheetManager shouldForwardProp={() => true}>
        <App />
      </StyleSheetManager>
    </ErrorBoundary>
  </StrictMode>
);
