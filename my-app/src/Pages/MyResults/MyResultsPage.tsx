import React, { useState, useEffect } from 'react';
import Nav from '../NavBar/NavBar';
import styles from './MyResultsPage.module.css'
import { useNavigate } from 'react-router-dom';
import Frame from '../../Components/Frame'


const Body: React.FC<{}> = () => {
    

    return ( 
       <div className={styles['container']}>
         <div className={styles['column']}>
                    <div className={styles['body--title']}>
                        My exam scores
                    </div>
                </div>
                <div className={styles["column"]}>
                    <div className={styles["course-container--header"]}>
                        <div className={styles["difficulty--container"]}>Difficulty</div>
                        <div className={styles["date--container"]}>Date</div>
                        <div className={styles["exam--container"]}>Subject Title</div>
                        <div className={styles["score--container"]}>Score</div>
                        <div className={styles["button--container"]}></div>
                    </div>
                </div>

                <div className={styles['column']}>
                    <div className={styles['body--line']}></div>
                </div>

                <div className={styles["course-container"]}>
                    
                    <div className={styles["difficulty--container"]}>1</div>
                    <div className={styles["date--container"]}> data</div>
                    <div className={styles["exam--container"]}>examen</div>
                    <div className={styles["score--container"]}>6</div>
                    <div className={styles["button--container"]}>
                    <button>
                        View My Exam Answers
                    </button>
                    </div>
                </div>

                
    </div>
 
    )
}

const MyResults = () => {
  return (
    <body>
            <Nav />
            <Frame> 
                <Body />
            </Frame>       
    </body>
  )
}

export default MyResults