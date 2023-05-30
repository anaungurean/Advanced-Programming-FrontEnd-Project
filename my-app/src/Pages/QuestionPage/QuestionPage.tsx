import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Nav from '../NavBar/NavBar';
import Frame from '../../Components/Frame';
import './QuestionPage.css';

interface QuizData {
  idUser: number;
  idSubject: number;
  difficulty: number;
  question: Question;
  answers: Answer[];
  score: string;
}

interface Question {
  id: number;
  subjectId: number;
  questionText: string;
  questionDifficulty: number;
  score: string;
  answersQuestion: Answer[]; // Update: Use 'answersQuestion' instead of 'answers'
}

interface Answer {
  id: number;
  questionId: number;
  answerText: string;
  correct: number;
  chosen: boolean;
}



const Body: React.FC<{}> = () => {
  const { difficulty, subjectId } = useParams();
  const token = localStorage.getItem('token') || '';
  const [questions, setQuestions] = useState<QuizData[]>([]); // Update: Use 'QuizData' instead of 'QuizQuestion'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const [selectedChoices, setSelectedChoices] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate();

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleChoiceSelect = (id: number) => {
    const newSelectedChoices = { ...selectedChoices };
    newSelectedChoices[id] = !newSelectedChoices[id];
    setSelectedChoices(newSelectedChoices);
    const updatedQuestions = [...questions];
    const currentQuestion = updatedQuestions[currentQuestionIndex];
    currentQuestion.answers.forEach((answer) => {
      if (answer.id === id) {
        answer.chosen = !answer.chosen;
      }
    });
    setQuestions(updatedQuestions);
  };

  const handleFinishMockExam = async () => {
    let totalQuestions = 0;
    let correctAnswers = 0;

    questions.forEach((question) => {
      let correctCount = 0;
      let chosenCount = 0;

      question.answers.forEach((answer) => {
        if (answer.correct) {
          correctCount++;
          if (answer.chosen) {
            chosenCount++;
          }
        } else if (answer.chosen) {
          chosenCount--;
        }
      });

      if (correctCount > 0) {
        totalQuestions++;
        correctAnswers += Math.max(chosenCount, 0) / correctCount;
      } else if (chosenCount === 0 && correctCount === 0) {
        totalQuestions++;
        correctAnswers += 0;
      } else if (chosenCount === 0) {
        totalQuestions++;
        correctAnswers += 1;
      }

      const score = correctCount === 0 ? 0 : Math.max(chosenCount, 0) / correctCount;
      question.score = score.toFixed(2);
    });

    const grade = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
    const formattedGrade = grade.toFixed(2);

    const quizData = {
      id: 0,
      idUser: 0, // Set the user ID accordingly
      totalScore: formattedGrade,
      quizQuestions: questions.map((question) => ({
        id: 0,
        quiz: 'string',
        idQuestion: question.question.id,
        idAnswer: question.answers.find((answer) => answer.chosen)?.id || 0,
        score: Number(question.score),
      })),
    };
console.log(quizData);
    try {
      const response = await fetch('http://localhost:8085/quizzes/7', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(quizData),
      });
      console.log(quizData);

      if (response.ok) {
        // Handle success scenario
        console.log('Quiz submitted successfully!');
        navigate('/ResultExam');
      } else {
        // Handle error scenario
        console.log('Failed to submit quiz.');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const apiUrl = `http://localhost:8085/questions/quiz?difficulty=${difficulty}&subjectId=${subjectId}`;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(apiUrl, { headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      setQuestions(data);
      setLoading(false);
    };

    fetchQuestions();
  }, [apiUrl, token]);

  return (
    <div className="body">
      {loading ? (
        <Frame>
          <div className="loading">Loading questions...</div>
        </Frame>
      ) : currentQuestion ? (
        <div className="questionPart">
          <div className="questionQuery">
            <h1 className="question">
              {currentQuestionIndex + 1}/{questions.length} {currentQuestion.question.questionText}
            </h1>
          </div>

          <div className="questionAnswers">
            <ul>
              {currentQuestion.answers.map((answer) => (
                <li key={`${answer.id}`} className="choice">
                  <label>
                    <input
                      type="checkbox"
                      name={`choice-${answer.id}`}
                      checked={selectedChoices[answer.id] || false}
                      onChange={() => handleChoiceSelect(answer.id)}
                    />
                    {answer.answerText}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <Frame>
          <div className="loading">No questions available.</div>
        </Frame>
      )}

      <div className="button-container1">
        <button
          className="button1"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous Question
        </button>

        <button
          className="button1"
          onClick={
            currentQuestionIndex < questions.length - 1 ? handleNextQuestion : handleFinishMockExam
          }
        >
          {currentQuestionIndex === questions.length - 1 ? (
            <Link to="/ResultExam">Finish the mock exam</Link>
          ) : (
            'Next Question'
          )}
        </button>
      </div>
    </div>
  );
};

const QuestionPage = () => {
  return (
    <div>
      <Nav />
      <Body />
    </div>
  );
};

export default QuestionPage;
