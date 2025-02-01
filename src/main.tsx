(window as any).global = window;

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles/styles.css'

import "@nimbus-ds/styles/dist/index.css";
import { Routes } from './routes';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routes />
  </StrictMode>,
)
