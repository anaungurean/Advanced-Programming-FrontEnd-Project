import React, { useState, useEffect } from 'react';
import Nav from '../NavBar/NavBar';
import imagine from '../HomePage/Images/wallpaper.jpg'
import styles from './TakeAQuiz.module.css'
import { useNavigate } from 'react-router-dom';
import Frame from '../../Components/Frame'

interface Subject {
  id: number;
  title: string;
 
}


const Body: React.FC<{}> = () => {
    
    const navigate = useNavigate();
    const goToTakeExam = (courseId: number) => {
        navigate(`/QuestionMockExam/${courseId}`);
    };

    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(`http://localhost:8085/subjects`);
        const data = await response.json();
        setSubjects(data);
        setIsLoading(false);
    };
    fetchData();
}, []);

    return ( 
       <div className={styles['container']}>
         <div className={styles['column']}>
                    <div className={styles['body--title']}>
                        Let’s prepare you for exams!
                    </div>
                </div>
                <div className={styles['column']}>
                    <div className={styles['body--subtitle']}>
                          {isLoading ? 'Loading...' : (subjects.length > 0 ? 'Subjects: ' : 'No subjects available.')}
                    </div>
                </div>

                <div className={styles['column']}>
                    <div className={styles['body--line']}></div>
                </div>

            {Array.isArray(subjects) && subjects.length > 0 && subjects.map(subject => (
                  <div className={styles['subject-container']} key={subject.title}>
                  <div className={styles['subject-title']}>
               {subject.id}. {subject.title}
            </div>

              <button onClick={() => goToTakeExam(subject.id)}>Start</button>
             </div>
            ))}
    </div>
 
    )
}

const TakeAQuizPage = () => {
  return (
    <body>
            <Nav />
            <Frame> 
                <Body />
            </Frame>       
    </body>
  )
}

export default TakeAQuizPage