import React from "react";
import style from './Users.module.css';
import userPhoto from '../../img/avatar.png';
import { NavLink } from 'react-router-dom';

const User = ({follow, unfollow, followingInProgress, users, }) => {
    return (
        <div>
            {users.map(u => <div className={style.users} key={u.id}>
                <NavLink to={'/profile/' + u.id}>
                    <div className={style.imgName}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="img" />
                        <h3>{u.name}</h3>
                    </div>
                </NavLink>
                <div className={style.location}>
                    {/* <div>{u.status}</div> */}
                    {/* <div>{'u.aboutMe'}</div> */}
                </div>
                <div className={style.but}>{u.followed 

                ? <button disabled={followingInProgress.some(id => id === u.id)} 
                onClick={() => { unfollow(u.id) }}>Unfollow</button> 

                : <button disabled={followingInProgress.some(id => id === u.id)} 
                onClick={() => { follow(u.id) }}>Follow</button>}

                </div>
                <h4 className={style.status}>
                    {u.status}
                </h4>
            </div>)}
        </div>
    )
}

export default User