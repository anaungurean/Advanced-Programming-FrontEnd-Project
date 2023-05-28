import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import Signup from './Pages/SignUpPage/SignUpPage';

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='SignUpPage' element={< Signup />} />
       </Routes>
    </Router>
  );
};


export default App;
