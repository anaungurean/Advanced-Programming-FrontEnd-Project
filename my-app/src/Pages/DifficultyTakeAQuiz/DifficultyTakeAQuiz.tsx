import React from 'react';
import Nav from '../NavBar/NavBar';
import styles from './DifficultyTakeAQuiz.module.css'
import img_low from './Images/low.png';
import img_medium from './Images/medium.png';
import img_high from './Images/high.png';
import img_surpriza from './Images/surpriza.png';
import { Link } from 'react-router-dom';

const Body: React.FC<{}> = () => {
    return (

    <>
    <div className={styles['body--img--container']}>
        <ul className={styles['link--image']} >
            <Link to='/Home'>
                <img src={img_low} alt="" className={styles['body--img']} />
            </Link>
        </ul>

        <ul className={styles['link--image']} >
            <Link to='/Home'>
                <img src={img_medium} alt="" className={styles['body--img']} />
            </Link>
        </ul>

        <ul className={styles['link--image']} >
            <Link to='/Home'>
                <img src={img_high} alt="" className={styles['body--img']} />
            </Link>
        </ul>

        <ul className={styles['link--image']} >
            <Link to='/Home'>
                <img src={img_surpriza} alt="" className={styles['body--img']} />
            </Link>
        </ul>
    </div>
    </>
    )
}

function Home() {
    return (
        <body>
            <Nav />
            <Body />
        </body>
    );
}

export default Home;