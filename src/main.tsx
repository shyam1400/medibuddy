import React from 'react';
import { createRoot } from 'react-dom/client';
import SearchBar from '/Users/shyam/Desktop/medibuddy/SearchBar';

const container = document.getElementById('root');

if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <SearchBar />
  </React.StrictMode>
);
