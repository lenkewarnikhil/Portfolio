import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Blog from './Blog.jsx'

// Keep the existing main.css import if they use it, else index.css
import './css/main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog/:slug" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
