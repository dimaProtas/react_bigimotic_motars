import React from 'react';
import s from './FrendsNav.module.css';
import userPhoto from "../../../img/avatar.png";
import { NavLink } from 'react-router-dom';


const FrendsNav = (props) => {
    return (
        <div>
            <NavLink to={'/profile/' + props.id}>
                <img src={props.photo != null ? props.photo : userPhoto} alt="img" />
                <div className={s.name}>{props.name}</div>
            </NavLink>
        </div>
    )
}

export default FrendsNav;
