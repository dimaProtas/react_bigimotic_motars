import React from 'react';
import s from './Header.module.css';
import line from "./../../img/line.png"
import { NavLink } from 'react-router-dom';
import { IoExitOutline } from "react-icons/io5";

const Header = (props) => {

    return (
        <header className={ s.header }>
            <img src={line} alt="ava" />
            <div className={ s.header_text }>Bigimotic Motors</div>
            <div className={s.login}>
                {props.isAuth 
                ? <div>{props.login} <button onClick={props.logout}><IoExitOutline /></button> </div> 
                : <NavLink to={'login/'}>Login</NavLink>}
            </div>
            <div className={s.register}>
                {props.isAuth 
                ? <div></div> 
                : <NavLink to={'register/'}>Register</NavLink>}
            </div>
        </header>
    )
}

export default Header
