// frontend/src/index.js
// This file is often the entry point for Create React App.
// For Vite, main.jsx is typically the entry point.
// If this project is Vite-based (as indicated by main.jsx), this file might not be strictly necessary
// or could be used for other initializations if not the main render root.

// For consistency with some React setups or if you switch from CRA to Vite,
// it might exist. If main.jsx is the true entry point, this file's content
// would typically be in main.jsx.

// Let's assume if this file IS used by Vite (e.g. referenced in index.html instead of main.jsx),
// it would look similar to main.jsx:

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Global styles are typically imported in App.js or here.
// import './assets/styles/global.css'; // If not already in App.js

// TanStack Query (React Query) Setup
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from './reportWebVitals'; // If using CRA's reportWebVitals
// reportWebVitals();


// IMPORTANT: Given that `main.jsx` was created with Vite-specific setup,
// this `index.js` file is likely redundant if Vite is the chosen build tool
// and `public/index.html` points to `src/main.jsx`.
// If this file *were* the entry point, its content would be as above.
// For the purpose of this exercise, we'll create it as specified in the plan.
// The user should ensure their `index.html` script tag points to the correct entry file (`main.jsx` or `index.js`).
// The file structure specified `main.js` (not `jsx`) and `index.js`. Assuming `main.jsx` is the Vite standard.
// Will rename `main.jsx` to `main.js` if that was the strict intention, though `.jsx` is common for files with JSX.
// For now, keeping `main.jsx` as it's standard for Vite + React.
// This `index.js` will mirror the setup in case it's an alternative entry or a legacy from CRA.

console.log("frontend/src/index.js loaded. If using Vite with main.jsx, this file might be redundant.");
