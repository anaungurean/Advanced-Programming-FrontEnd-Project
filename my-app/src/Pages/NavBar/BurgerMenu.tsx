import React from 'react'
import styles from './NavBar.module.css'
import {useState,useRef} from 'react'
import img_burger from './Images/menu.png';
import { Link } from 'react-router-dom';

const handleLogout = () => {
    localStorage.clear();
  };

const BurgerMenu: React.FC<{}> =()=>
{
    const[open,setOpen]=useState<boolean>(false); 
    const dropdownRef=useRef<HTMLDivElement>(null);
    const handleDropDownFocus=(state:boolean)=>
    {setOpen(!state);};
    console.log(open, dropdownRef.current);
    const handleClickOutsideDropDown=(e:any)=>
    {
      if(open && !dropdownRef.current?.contains(e.target as Node))
       setOpen(false);
    };
    window.addEventListener("click",handleClickOutsideDropDown)
    return (
      <div className={styles['burgerMenu-container']} ref={dropdownRef}>
        <button onClick={(e)=>handleDropDownFocus(open)}> <img src={img_burger} alt="" /> </button>
        {open &&(
          <ul>
         <li><a href="/Home">Home</a></li>
         <li><a href="/Profile">Profile</a></li>
         <li>
            <Link to='/' onClick={handleLogout}> Logout </Link>
          </li>
         </ul>
        )
        }
      </div>
    )
}

export default BurgerMenu

