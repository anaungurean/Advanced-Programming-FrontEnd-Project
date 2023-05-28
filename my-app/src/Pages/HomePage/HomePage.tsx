import React from 'react';
import Nav from '../NavBar/NavBar';
import style from './HomePage.module.css'
import imagine from './Images/wallpaper.jpg'

const Body: React.FC<{}> = () => {
    return (

    <>
    <div className={style['container']}>
        <img src={imagine} className={style['img']}></img>
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