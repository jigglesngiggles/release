import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js'; // Adjust this import based on your folder structure
import UploadPage from './components/UploadForm.js'; // Adjust this import based on your folder structure

function App() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/upload">Upload Video</Link></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </div>
  );
}

export default App;

