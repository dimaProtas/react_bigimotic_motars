import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import s from './Scroll.module.css'
import { AiOutlineReload } from "react-icons/ai";
// import { connect } from 'react-redux';

// export function withRouter(Child){
//     return(props)=>{
  
//        const match  = {params: useParams()};
//        return <Child {...props}  match = {match}/>
//    }
//   }

const Scroll = (props) => {

    const { id } = useParams()

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY === 0 && !props.loadingOlderMessages) {
            // Достигли верхней границы страницы, загрузите более старые сообщения
            props.getOlderMessages(id);
            props.setShowScrollIcon(true);
          } else {
            props.setShowScrollIcon(false);
          }
        };
      
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
          };
        }, [props, id]);

    return (
        <div>
          {props.showScrollIcon && (<p className={s.ScrollIcon}><AiOutlineReload /></p>)}
        </div>
    )
}


export default Scroll;