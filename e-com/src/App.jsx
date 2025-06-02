import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Landing from './pages/Landing';
import Shop from './pages/Shop';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  

  return (
    <>
   <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing
         />} />
     <Route path="/home" element={<Home />} />
         <Route path="/about" element={<About />} />
            <Route path="/contact" element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        } /> <Route path="/shop" element={
          <ProtectedRoute>
            <Shop />
          </ProtectedRoute>
        } />
                          <Route path="/sign" element={<Signup />} />
            </Routes>
    </div>
     
    </>
  )
}

export default App
