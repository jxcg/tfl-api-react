import { useState } from 'react'
import Search from './Components/Search'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Unified from './Components/Unified';


function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path='/Search' element={<Search /> } />
      <Route path='/AllLines' element={<Unified /> } />
      </Routes>
    </Router>

  )
}

export default App
