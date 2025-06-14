import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Shop from './pages/Shop';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Add from './pages/Add';
import T from './pages/T';
import Polo from './pages/Polo';
import User from './pages/User';



function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
        
          <Route path="/t" element={
           
              <T />
           
          } />
          <Route path="/polo" element={
          
              <Polo />
         
          } />
          <Route path="/shop" element={
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
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
      </div>
    </>
  )
}

export default App
