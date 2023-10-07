import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import FriendsNav from './FrendsNav/FrendsNav';

const Nav = ({totalFriendsCount, friends}) => {
    const randomFriends = friends.sort(() => 0.5 - Math.random()).slice(0, 3);
    return (
        <nav className={ s.nav }>
            <div className={ s.item }>
                <NavLink to='/profile' className = { navData => navData.isActive ? s.active : s.item }>Profile</NavLink>
            </div>
            <div className={ s.item }>
                <NavLink to='/dialogs' className = { navData => navData.isActive ? s.active : s.item }>Messages</NavLink>
            </div>
            <div className={ s.item }>
                <NavLink to='/news' className = { navData => navData.isActive ? s.active : s.item }>News</NavLink>
            </div>
            <div className={ s.item }>
                <NavLink to='/music' className = { navData => navData.isActive ? s.active : s.item }>Music</NavLink>
            </div>
            <div className={ s.item }>
                <NavLink to='/users' className = { navData => navData.isActive ? s.active : s.item }>Users</NavLink>
            </div>
            <div className={ s.item }>
                <NavLink to='/settings' className = { navData => navData.isActive ? s.active : s.item }>Settings</NavLink>
            </div>
            <div className={ `${s.friends} + ' ' + ${ s.item } `}>
                <NavLink to='/friends' className = { navData => navData.isActive ? s.active : s.item }>
                <div className={s.friendLabel}>
                    <span className={ s.sticker }>{totalFriendsCount}</span>
                    Friends
                </div>
                    </NavLink>              
                <div className={s.img_friends}>
                    {randomFriends.map(p => <FriendsNav name={p.name} photo={p.photos.small} id={p.id} key={p.id} />)}
                </div>
            </div>
        </nav>
    )
}

export default Nav