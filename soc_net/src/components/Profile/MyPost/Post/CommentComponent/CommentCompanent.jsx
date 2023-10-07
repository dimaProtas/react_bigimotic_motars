import React, {useState} from "react";
import s from './СommentComp.module.css';
import { format, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import {AiOutlineClose} from "react-icons/ai";
import ConfirmationModal from "../../../../Common/ModalConfirmation/ConfirmationModal.jsx"
import { NavLink } from 'react-router-dom';


const CommentComponent = (props) => {
    const parsedDate = parseISO(props.createdAt); // Преобразуем ISO 8601 строку в объект Date
    const formattedDate = format(parsedDate, 'HH:mm - dd MMM yyyy', { locale: ruLocale }); // Форматируем дату

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setIsModalOpen(false);
        props.deleteComment(props.commentId);
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={s.comment}>
            <div className={s.commentHeader}>
            <NavLink to={'/profile/' + props.authorId}>
                <img className={s.authorPhoto} src={props.authorPhoto} alt='ava' />
            </NavLink>
                <div className={s.containerNameIcon}>
                    <div><span className={s.authorName}>{props.authorName}</span></div>
                    {props.authorizedUserId === props.commentAuthorId ? 
                    <div className={s.iconDel}><AiOutlineClose onClick={handleDeleteClick} /></div> : null}
                    {isModalOpen && (
                <ConfirmationModal
                    message="Вы уверены, что хотите удалить этот комментарий?"
                    onCancel={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                />
            )}                    
                </div>
                
            </div>
            <p className={s.commentText}>{props.text}</p>
            <span className={s.commentTimestamp}>{formattedDate}</span>
        </div>
    )
}

export default CommentComponent
