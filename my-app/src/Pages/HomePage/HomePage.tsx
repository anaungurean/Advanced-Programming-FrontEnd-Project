import React from 'react';
import Nav from '../NavBar/NavBar';
import styles from './HomePage.module.css'
import img_quiz from './Images/takequiz.png';
import img_results from './Images/results.png';
import img_clasament from './Images/clasament.png';
import { Link } from 'react-router-dom';

const Body: React.FC<{}> = () => {
    return (

    <>
    <div className={styles['body--img--container']}>
        <ul className={styles['link--image']} >
            <Link to='/Quiz'>
                <img src={img_quiz} alt="" className={styles['body--img']} />
            </Link>
        </ul>

        <ul className={styles['link--image']} >
            <Link to='/MyResults'>
                <img src={img_results} alt="" className={styles['body--img']} />
            </Link>
        </ul>

        <ul className={styles['link--image']} >
            <Link to='/Home'>
                <img src={img_clasament} alt="" className={styles['body--img']} />
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