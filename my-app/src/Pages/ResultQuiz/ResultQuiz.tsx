import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../NavBar/NavBar';
import styles from './ResultQuiz.module.css';
import Frame from '../../Components/Frame';

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
  answersQuestion: Answer[];
}

interface Answer {
  id: number;
  questionId: number;
  answerText: string;
  correct: number;
  chosen: boolean;
  score: string;
}

const Body: React.FC<{}> = () => {
  const location = useLocation();
  const { questions, grade }: { questions: QuizData[], grade: string } = location.state || {};
  console.log(questions);

  const totalQuestions = questions.length;
  const correctAnswers = questions.reduce(
    (count, question) =>
      count +
      question.answers.filter((answer) => answer.correct && answer.chosen).length,
    0
  );
  const finalScore = ((correctAnswers / totalQuestions) * 100).toFixed(2);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quiz Result</h1>
       <h3 className={styles.score}>Final Score: {grade}%</h3>
      {questions.map((quizData) => (
        <div key={quizData.question.id}>
          <h3 className={styles.question}>Question: {quizData.question.questionText}</h3>
          <ul>
            {quizData.answers.map((answer, index) => (
              <li
                key={answer.id}
                className={`${styles.answer} ${
                  answer.correct ? styles.correct : ''} 
                  ${
                  answer.chosen ? styles.chosen : ''
              
                }
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
  );
};

const ResultQuiz = () => {
  return (
    <body>
      <Nav />
      <Frame>
        <Body />
      </Frame>
    </body>
  );
};

export default ResultQuiz;
