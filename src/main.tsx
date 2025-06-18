import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'
import App from './App.tsx'
import AppkitProvider from './context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppkitProvider>
      <Provider store={store}>
      <App />
      </Provider>
    </AppkitProvider>
  </StrictMode>,
)
