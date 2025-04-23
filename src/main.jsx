import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import Dashboard from './pages/Dashboard.jsx'
import Auth from './pages/Auth.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import About from './pages/About.jsx'
import Book from './pages/Book.jsx'
import Contact from './pages/Contact.jsx'
import LibraAI from './pages/LibraAI.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<Book />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/libra-ai" element={<LibraAI />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
