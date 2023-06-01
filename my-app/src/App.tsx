import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import Signup from './Pages/SignUpPage/SignUpPage';
import Home from './Pages/HomePage/HomePage';
import DifficultyOuiz from './Pages/DifficultyTakeAQuiz/DifficultyTakeAQuiz';
import Quiz from './Pages/TakeAQuizPage/TakeAQuizPage'
import Question from './Pages/QuestionPage/QuestionPage'
import MyResults from './Pages/MyResultsPage/MyResultsPage'
import ResultQuiz from './Pages/ResultQuiz/ResultQuiz';
import Ranking from './Pages/Ranking/Ranking';
import ProfilePage from './Pages/ProfilePage/ProfilPage';

 
import ViewMyQuizAnswers from './Pages/ViewMyQuizAnswers/ViewMyQuizAnswers';
 
const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='SignUpPage' element={< Signup />} />
        <Route path="Home" element={<Home />} />
        <Route path="/DifficultyOuiz/:subjectId" element={<DifficultyOuiz />}/>        
        <Route path="Quiz" element={<Quiz />} />
        <Route path="Question/:subjectId/:difficulty" element={<Question /> }/>
        <Route path="MyResults" element={<MyResults />} />
        <Route path="/ResultQuiz" element={<ResultQuiz />} />
        <Route path="/Ranking" element={<Ranking />} />
        <Route path="/Profile" element={<ProfilePage />} /> 
        <Route path="ViewMyQuizAnswers/:quizId" element={<ViewMyQuizAnswers />}> </Route>

 
     </Routes>
    </Router>
  );
};


export default App;
