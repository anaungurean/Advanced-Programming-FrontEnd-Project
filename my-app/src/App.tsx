import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import Home from './Pages/HomePage/HomePage';

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="Home" element={<Home />} />
         {/* Add more routes for other pages */}
      </Routes>
    </Router>
  );
};


export default App;
