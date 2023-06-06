import React from 'react';
import Nav from '../NavBar/NavBar';
import styles from './DifficultyTakeAQuiz.module.css';
import img_low from './Images/single.png';
import img_medium from './Images/multiple.png';
import img_surpriza from './Images/progressive.png';
import { useParams, Link, useNavigate } from 'react-router-dom';


 

const DifficultyQuestion:React.FC<{}> = () => {

    const { subjectId } = useParams<{ subjectId: string }>();
    const easy = 1; 
    const medium = 2; 
    const userId = localStorage.getItem('userId');



  return (
    <body>
      <Nav />
      <div className={styles['body--img--container']}>
        <ul className={styles['link--image']}>
          <Link to={`/Question/${subjectId}/${easy}`}>
            <img src={img_low} alt="" className={styles['body--img']} />
          </Link>
        </ul>

        <ul className={styles['link--image']}>
          <Link to={`/Question/${subjectId}/${medium}`}>
            <img src={img_medium} alt="" className={styles['body--img']} />
          </Link>
        </ul>
 
        <ul className={styles['link--image']}>
          <Link to={`/ProgressiveQuiz/${userId}/${subjectId}`}>
            <img src={img_surpriza} alt="" className={styles['body--img']} />
          </Link>
        </ul>
      </div>
    </body>
  );
};

export default DifficultyQuestion;
