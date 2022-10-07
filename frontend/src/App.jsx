import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Header from './components/Header';
import Welcome from './components/Welcome';

import './App.css'

function App () {
  return (
    <>
      <Header />
      <Welcome />
      {/* <Routes>
        <Route path="/introduction" exact element={<Introduction />} />
        <Route path="user/register" exact element={<RegisterForm />} />
        <Route path="user/login" exact element={<LoginForm />} />
        <Route path="user/:id" exact element={<MyPage />} />
      </Routes> */}
    </>
  )
}

export default App
