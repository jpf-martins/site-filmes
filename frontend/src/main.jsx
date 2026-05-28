import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { NOME_APP } from './config/app.js'
import "bootstrap/dist/css/bootstrap.min.css";

document.title = NOME_APP;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
