import React, { useState, useEffect } from 'react';
import Nav from '../NavBar/NavBar';
import styles from './MyResultsPage.module.css';
import Frame from '../../Components/Frame';
import { useNavigate } from "react-router-dom";


interface QuizInfo {
  id: number;
  totalScore: number;
  subjectId: number;
  subjectTitle: string;
  difficulty: number;
}

const Body: React.FC<{}> = () => {
  const [quizInfo, setQuizInfo] = useState<QuizInfo[]>([]);

  useEffect(() => {
    fetchQuizInfo();
  }, []);

  const userId = localStorage.getItem('userId');
  const fetchQuizInfo = async () => {
    try {
      
      const response = await fetch(`http://localhost:8085/quizzes/${userId}`);
      if (response.ok) {
        const data: QuizInfo[] = await response.json();
        setQuizInfo(data);
      } else {
        console.error('Failed to fetch quiz info');
      }
    } catch (error) {
      console.error('Error occurred while fetching quiz info:', error);
    }
  };

  const navigate = useNavigate();
  const goToExamAnswers = (quizId: number) => {
    navigate(`/ViewMyQuizAnswers/${quizId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles['body--title']}>My quizzes scores</div>
      </div>
      {quizInfo.length > 0 ? (
        <div className={styles.column}>
             <div className={styles['body--line']}></div>          
            <div className={styles['course-container--header']}>
            <div className={styles['id--container']}>ID</div>
            <div className={styles['exam--container']}>Title of the subject</div>
            <div className={styles['difficulty--container']}>Difficulty</div>
            <div className={styles['score--container']}>Score</div>
            <div className={styles['button--container']}></div>

          </div>
          {quizInfo.map((quiz) => (
            <div key={quiz.id} className={styles['course-container']}>

              <div className={styles['id--container']}>{quiz.id}</div>
              <div className={styles['exam--container']}>{quiz.subjectTitle}</div>
              <div className={styles['difficulty--container']}>{quiz.difficulty}</div>
              <div className={styles['score--container']}>{quiz.totalScore}</div>
              <div className={styles['button--container']}>
                <button onClick={() => goToExamAnswers(quiz.id)}>
                  View my answers
                </button>
              </div>
            </div>
          
          ))}
        </div>
      ) : (
        <p>Loading quiz info...</p>
      )}
    </div>
  );
};

const MyResults = () => {
  return (
    <body>
      <Nav />
      <Frame>
        <Body />
      </Frame>
    </body>
  );
};

export default MyResults;
