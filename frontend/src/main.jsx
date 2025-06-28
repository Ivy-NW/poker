// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import './index.css'; // If you have a separate index.css for Vite specific base styles
// Global styles are typically imported in App.js or here.
// If global.css is already in App.js, it might not be needed here unless it sets up root elements.

// TanStack Query (React Query) Setup
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: true, // Refetch on window focus
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// Note for Vite:
// Vite uses src/main.jsx as the entry point by default for React projects.
// Ensure your public/index.html has a div with id="root":
// <div id="root"></div>
// And a script tag for this file:
// <script type="module" src="/src/main.jsx"></script>
