import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GetAllProducts from './components/Products.jsx'
import RegisterUser from './components/RegisterUser.jsx';
import Login from './components/Login.jsx';

function App() {


  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<InitialView />} /> */}
          <Route path="/" element={<GetAllProducts />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<Login />} />



        </Routes>
      </Router>
   
     
    </>
  )
}

export default App
