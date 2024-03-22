import React from 'react'
// import './App.css'
import "./styles.css";
import { Routes, Route } from 'react-router-dom';

import { Products, RegisterUser1, Login1, SingleProduct } from './components/pages/index.js';
import Navbar from './components/Navbar.jsx';

function App() {


  return (
    <main className="App">
      <Navbar />
      <Routes>


        
        {/* <Route path="/" element={<InitialView />} /> */}
        <Route path="/" element={<Products />} />
        <Route path="/register" element={<RegisterUser1 />} />
        <Route path="/login" element={<Login1 />} />
        <Route path="/product/:id" element={<SingleProduct />} />



      </Routes>
    </main>
  )
}

export default App
