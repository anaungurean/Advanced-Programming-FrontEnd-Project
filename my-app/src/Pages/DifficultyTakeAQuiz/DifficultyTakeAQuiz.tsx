import React from 'react';
import Nav from '../NavBar/NavBar';
import styles from './DifficultyTakeAQuiz.module.css';
import img_low from './Images/low.png';
import img_medium from './Images/medium.png';
import img_high from './Images/high.png';
import img_surpriza from './Images/surpriza.png';
import { useParams, Link, useNavigate } from 'react-router-dom';


 

const DifficultyQuestion:React.FC<{}> = () => {

    const { subjectId } = useParams<{ subjectId: string }>();
    const easy = 1; 
    const medium = 2; 
    const hard = 3; 
    const progressive = 4; 


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
          <Link to={`/Question/${subjectId}/${hard}`}>
            <img src={img_high} alt="" className={styles['body--img']} />
          </Link>
        </ul>

        <ul className={styles['link--image']}>
          <Link to={`/Question/${subjectId}/${progressive}`}>
            <img src={img_surpriza} alt="" className={styles['body--img']} />
          </Link>
        </ul>
      </div>
    </body>
  );
};

export default DifficultyQuestion;
