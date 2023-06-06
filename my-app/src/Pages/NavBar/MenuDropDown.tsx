import React from 'react'
import styles from './NavBar.module.css'
import {useState,useRef} from 'react'
import { Link } from 'react-router-dom';
 

const handleLogout = () => {
  localStorage.clear();
};
const MenuDropDown:React.FC<{}> = () => {
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
    <div className={styles['menu']} ref={dropdownRef}>
      <button onClick={(e)=>handleDropDownFocus(open)}> Menu</button>
      {open &&(
        <ul>
          <li>
            <Link to='/Quiz'>Take a quiz</Link>  
          </li>
          <li>
            <Link to='/MyResults'>My results</Link>  
          </li>
          <li>
            <Link to='/Ranking'>Ranking</Link>  
          </li>
          <li>
            <Link to='/' onClick={handleLogout}> Logout </Link>
          </li>
       </ul>
      )
      }
    </div>
  )
    }
export default MenuDropDown;