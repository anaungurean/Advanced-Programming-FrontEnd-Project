import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import Signup from './Pages/SignUpPage/SignUpPage';
import Home from './Pages/HomePage/HomePage';
import DifficultyOuiz from './Pages/DifficultyTakeAQuiz/DifficultyTakeAQuiz';

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='SignUpPage' element={< Signup />} />
        <Route path="Home" element={<Home />} />
        <Route path="DifficultyOuiz" element={<DifficultyOuiz />} />
       </Routes>
    </Router>
  );
};


export default App;
