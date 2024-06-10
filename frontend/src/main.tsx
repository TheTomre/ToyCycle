import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "./store/store";
import Auth0ProviderWithNavigate from "./features/auth/Auth0ProviderWithNavigate";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false // Disable refetching on window focus
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Auth0ProviderWithNavigate>
            <App />
          </Auth0ProviderWithNavigate>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
