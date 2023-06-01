import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Nav from '../NavBar/NavBar';
import styles from './ViewMyQuizAnswers.module.css';
import Frame from '../../Components/Frame';
import { useParams } from 'react-router-dom';

interface Subject {
  id: number;
  title: string;
}

interface Question {
  id: number;
  subject: Subject;
  questionText: string;
  questionDifficulty: number;
}

interface Answer {
  id: number;
  answerText: string;
  correct: boolean;
  chosen: boolean;
}

interface QuestionWithAnswers {
  question: Question;
  answers: Answer[];
  score: number;
}

interface QuizData {
  finalScore: number;
  questionWithAnswersList: QuestionWithAnswers[];
}

const Body: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const { quizId } = useParams<{ quizId: string }>();

  const token = localStorage.getItem('token') || '';
  const apiUrl = `http://localhost:8085/quizzes/${quizId}/with-questions-answers`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, { headers: { 'Authorization': `Bearer ${token}` } });
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchData();
  }, []);

  if (!quizData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quiz Result</h1>
      <h3 className={styles.score}>Final Score: {quizData.finalScore}.00%</h3>
      <div className={styles.questions}>
        {quizData.questionWithAnswersList.map((questionWithAnswers) => (
          <div key={questionWithAnswers.question.id} className={styles.question}>
            <h3 className={styles.question}>Question: {questionWithAnswers.question.questionText}</h3>
            <ul className={styles.answers}>
              {questionWithAnswers.answers.map((answer, index) => (
                <li
                key={answer.id}
                className={`${styles.answer} ${
                  answer.correct ? styles.correct : ''} 
                  ${
                  answer.chosen ? styles.chosen : ''
                }
                 ${ answer.correct && answer.chosen ? styles.chosen : ''}
                  ${!answer.correct && answer.chosen ? styles.incorrect : ''}`
              }
              >
                <span className={styles.index}>{`${index + 1}. `}</span>
                {answer.answerText}
              </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const ViewMyQuizAnswers = () => {
  return (
    <body>
      <Nav />
      <Frame>
        <Body />
      </Frame>
    </body>
  );
};

export default ViewMyQuizAnswers;
