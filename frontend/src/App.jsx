import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


import Navbar from './components/Navbar';
import Welcome from './components/Pages/Welcome';
import Introduction from './components/Pages/Introduction';
import Login from './components/Pages/Login';

import './App.css'

function App () {
  return (
    <>
      <Navbar />
      <Welcome />
      <Router>
        <Routes>
          <Route path="introduction" element={<Introduction />} />
          <Route path="login" element={<Login />} />
          <Route path="welcome" element={<Welcome />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
