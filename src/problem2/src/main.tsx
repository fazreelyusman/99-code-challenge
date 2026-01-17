import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { registerSW } from 'virtual:pwa-register'
import PWAInstallPrompt from './components/PWAInstallPrompt'

registerSW();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <PWAInstallPrompt />
  </React.StrictMode>
)
