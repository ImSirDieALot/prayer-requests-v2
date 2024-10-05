import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//components
import Header from './components/Header';
import NavBar from './components/NavBar';

//pages
import AddCategories from './pages/AddCategories';
import Home from './pages/Home';
import NewRequests from './pages/NewRequests';

function App() {
  return (
    <Router>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/newRequests" element={<NewRequests />} />
        <Route path="/addCategory" element={<AddCategories />} />
      </Routes>
    </Router>
  );
}

export default App;
