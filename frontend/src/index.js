import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import App from "./App";
import theme from "./theme";
import { AppContextProvider } from "./context";

ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <React.StrictMode>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </React.StrictMode>
      </ThemeProvider>
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
  document.getElementById("root")
);
