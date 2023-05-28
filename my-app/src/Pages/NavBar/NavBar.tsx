import React from 'react';
import styles from './NavBar.module.css'
import { Link } from "react-router-dom";
import img_logo from './Images/logo.png';
import MenuDropDown from './MenuDropDown';
import BurgerMenu from './BurgerMenu';
function Nav(){
  return (
    <nav className={styles.navbar}> 
          <div className={styles['logo-container']}>
            <img src={img_logo} alt=""/>
          </div>

           
        <div className={styles['links-container']}>
          <ul className={styles['link']} >
            <Link to="/Student">Home</Link>
          </ul>

          <ul className={styles['link']} >
            <Link to="/ProfileStudent">Profile</Link>
           </ul>
              
           <ul className={styles['menu']}>
            <MenuDropDown/>
          </ul>
        </div>

        <BurgerMenu/>
    </nav>
  )
}

export default Nav