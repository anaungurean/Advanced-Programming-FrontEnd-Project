import React, { useState, useEffect } from 'react';
import Nav from '../NavBar/NavBar';
import Frame from '../../Components/Frame';
import styles from '../Ranking/Ranking.module.css'

interface QuizClasament {
  id: number;
  title: string;
  averageScore: number ;
  totalQuizzes: number;
  quizzesDifficulty1: number;
  quizzesDifficulty2: number;
  quizzesDifficulty3: number;
}

const Body: React.FC<{}> = () => {
  const [quizClasament, setQuizClasament] = useState<QuizClasament[]>([]);

  useEffect(() => {
    const fetchQuizClasament = async () => {
      try {
        const response = await fetch('http://localhost:8085/quizzes/clasament/66');
        const data = await response.json();
        setQuizClasament(data);
      } catch (error) {
        console.error('Error fetching quiz clasament:', error);
      }
    };

    fetchQuizClasament();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles['body--title']}>Ranking</div>
      </div>
      {quizClasament.length > 0 ? (
        <div className={styles.column}>
          <div className={styles['body--line']}></div>
          <div className={styles['course-container--header']}>
          <div className={styles['id--container']}>Id</div>            
          <div className={styles['exam--container']}>Title</div>
          <div className={styles['score--container']}>Score</div>            
          <div className={styles['total--container']}>Total Quizzes</div>
          <div className={styles['dif--container']}>Quizzes Difficulty 1</div>
          <div className={styles['dif--container']}>Quizzes Difficulty 2</div>
          <div className={styles['dif--container']}>Progressive quizzes</div>

     
           </div>
          {quizClasament.map((quiz,index) => (
            <div key={quiz.id} className={styles['course-container']}>
              <div className={styles['id--container']}>{index + 1}</div>
              <div className={styles['exam--container']}>{quiz.title}</div>
              <div className={styles['score--container']}>{quiz.averageScore}</div>
              <div className={styles['total--container']}>{quiz.totalQuizzes}</div>
              <div className={styles['dif--container']}>{quiz.quizzesDifficulty1}</div>
              <div className={styles['dif--container']}>{quiz.quizzesDifficulty2}</div>
              <div className={styles['dif--container']}>{quiz.quizzesDifficulty3}</div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading quiz info...</p>
      )}
    </div>
  );
};

const Ranking = () => {
  return (
    <body>
      <Nav />
      <Frame>
        <Body />
      </Frame>
    </body>
  );
};

export default Ranking;
