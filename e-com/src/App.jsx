import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Add from './pages/Add';
import Jewelry from './pages/Jewelry';
import User from './pages/User';
import WomenCol from "./pages/WomenCol"
import Footer from './components/Footer';


function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
           <Route path="/" element={<Home />} />
        
          <Route path="/jewelry" element={
           
              <Jewelry/>
           
          } />
          <Route path="/women" element={
          
              <WomenCol/>
         
          } />
         

          
          <Route path="/cart" element={
            <ProtectedRoute>
              <Add />
            </ProtectedRoute>
          } />
            <Route path="/user" element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          } />
          <Route path="/sign" element={<Signup />} />

      
         
        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App
