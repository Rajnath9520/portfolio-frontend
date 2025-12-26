import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Achievements from './pages/Achievement';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin';
import ProtectedRoute from "./routes/ProtectedRoute";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <Navbar />
        
        <main>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/achievements" element={<Achievements/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route
                path="/admin"
                element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
            }/>
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;