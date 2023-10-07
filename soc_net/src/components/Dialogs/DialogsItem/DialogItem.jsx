import React, { useState } from 'react';
import s from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';
import userImg from '../../../img/avatar.png'


const DialogItem = (props) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleSelect = () => {
        setIsSelected(true);
        props.getMessagesUser(props.id)
    }
    return (
        <div>
            <img className={ s.dialogImg } src={isSelected ? (props.photo ? props.photo : userImg) : userImg} alt='img' />
            <div className={ s.dialog }>
                <NavLink to={'/dialogs/' + props.id} className = { navData => navData.isActive ? s.active : s.dialog } onClick={handleSelect}>
                    {props.name}
                    </NavLink>
            </div>
        </div>
        
    )
}


export default DialogItem;