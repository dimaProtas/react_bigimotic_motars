import React from "react";
import { NavLink } from "react-router-dom";
import s from '../../Profile/MyPost/Post/Post.module.css';
import { format, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import { AiOutlineHeart, AiOutlineDelete, AiFillHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";

const NewsPosts = (props) => {
    const parsedDate = parseISO(props.createdAt); // Преобразуем ISO 8601 строку в объект Date
    const formattedDate = format(parsedDate, 'HH:mm - dd MMM yyyy', { locale: ruLocale }); // Форматируем дату


    return (
        <div className={s.item}>

            <div className={s.avaDateContainer}>
            <NavLink to={'/profile/' + props.authorId}>
            <img className={s.avatar} src={props.img ? props.img : 'https://cdn.flamp.ru/b497df0c38f9d53c49e5c10665326e9c_1920.jpg'} alt="ava" />
            </NavLink>    
            <div className={s.date_post}>
                {formattedDate}
            </div>

            </div>
    
    
            <div className={s.container}>
                <div>
                <NavLink to={'/profile/' + props.authorId}>
                <div className={s.name_user}>{props.name}</div>
                </NavLink>
                <div>{props.message}</div>
                <div className={s.photo_post}>{props.photo_post ? <img src={props.photo_post} alt="photo_post" /> : null}</div>
                </div>
            </div>

  <div className={s.conteinerIcon}>
      <div className={s.deleteIcon}>
        {props.authorizedUserId === props.authorId && (
          <span>
            <AiOutlineDelete className={s.like_icon_delet} />
          </span>      
        )}
        {/* {isModalOpen && (
                <ConfirmationModal
                    message="Вы уверены, что хотите удалить этот пост?"
                    onCancel={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                />
            )}        */}
      </div>

            <div className={s.icons}>
            <div className={s.commentLikeContainer}>
                <span className={s.icon_comment}>
                <BiCommentDetail />
                <span className={s.count}>4</span>
                </span>

                <div className={s.like_icon}>
                <span onClick={() => {
                    // debugger;
                    if (props.isLiked) {
                    props.likeRemove(props.postId);
                    } else {
                    props.like(props.postId);
                    }
                }}>
                    {props.isLiked ? <AiFillHeart className={s.iconLike} /> : <AiOutlineHeart className={s.icon} />}
                </span>
                <div className={s.num_like}>
                    {props.likeCount}
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>


    )
}

export default NewsPosts 