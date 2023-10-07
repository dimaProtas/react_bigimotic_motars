import React from "react";
import preloader from '../../../img/preloader.gif';
import style from './Preloader.module.css';

const Preloader = () => {
    return(
        <div className={style.preloader}>
            <img src={preloader} alt='img' />
        </div>
    )
}

export default Preloader