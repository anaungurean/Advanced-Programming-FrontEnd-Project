import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import Signup from './Pages/SignUpPage/SignUpPage';
import Home from './Pages/HomePage/HomePage';
import DifficultyOuiz from './Pages/DifficultyTakeAQuiz/DifficultyTakeAQuiz';
import Quiz from './Pages/TakeAQuizPage/TakeAQuizPage'
import MyResults from './Pages/MyResults/MyResultsPage'

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='SignUpPage' element={< Signup />} />
        <Route path="Home" element={<Home />} />
        <Route path="DifficultyOuiz" element={<DifficultyOuiz />} />
        <Route path="Quiz" element={<Quiz />} />
        <Route path="MyResults" element={<MyResults />} />
     </Routes>
    </Router>
  );
};


export default App;
