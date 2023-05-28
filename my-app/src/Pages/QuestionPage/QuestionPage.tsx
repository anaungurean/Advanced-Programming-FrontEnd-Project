import React, { useState, useEffect } from 'react';
import Nav from '../NavBar/NavBar';
import Frame from '../../Components/Frame';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './QuestionPage.css'

interface Question {
  id: number;
  subjectId: number;
  questionText: string;
  questionDifficulty: number;
}

interface Answer {
  id: number;
  questionId: number;
  answerText: string;
  correct: number;
}

interface QuizData {
  question: Question;
  answers: Answer[];
}

const Body: React.FC<{}> = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { difficulty } = useParams<{ difficulty: string }>();

  const [questions, setQuestions] = useState<QuizData[]>([]);
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
        answer.correct = answer.correct === 0 ? 1 : 0;
      }
    });
    setQuestions(updatedQuestions);
  };

  const handleFinishMockExam = () => {
    let totalQuestions = 0;
    let correctAnswers = 0;

    questions.forEach((question) => {
      let correctCount = 0;
      let chosenCount = 0;

      question.answers.forEach((answer) => {
        if (answer.correct) {
          correctCount++;
          if (selectedChoices[answer.id]) {
            chosenCount++;
          }
        } else if (selectedChoices[answer.id]) {
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
      // question.question.questionDifficulty = score.toFixed(2);
    });

    const grade = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
    const formattedGrade = grade.toFixed(2);

    const state = {
      questions,
      grade: formattedGrade,
    };

    navigate('/ResultMockExam', { state });
  };

  const apiUrl = `http://localhost:8085/questions/quiz?difficulty=${difficulty}&subjectId=${subjectId}`;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(apiUrl);
      const data: QuizData[] = await response.json();
      console.log(data);
      setQuestions(data);
      setLoading(false);
    };

    fetchQuestions();
  }, [apiUrl]);

  return (
    <div className="body">
      {loading ? (
        <Frame>
          <div className="loading">Loading questions...</div>
        </Frame>
      ) : questions.length > 0 && currentQuestion ? (
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
            <Link to="/ResultMockExam">Finish the mock exam</Link>
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
    <body>
      <Nav />
      <Body />
  
     
    </body>
  );
};

export default QuestionPage;
