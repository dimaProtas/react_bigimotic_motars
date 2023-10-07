import React, { useState } from 'react';
import s from './Post.module.css';
import { format, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import { AiOutlineHeart, AiOutlineDelete, AiFillHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import CommentForm from './CommentsPost/CommentForm.jsx';
import CommentComponent from './CommentComponent/CommentCompanent.jsx';
import ConfirmationModal from '../../../Common/ModalConfirmation/ConfirmationModal';
import { NavLink } from 'react-router-dom';


const Post = (props) => {
  const commentsForPost = props.comments.filter(comment => comment.post === props.postId);
  const countPost = commentsForPost.length;
  const parsedDate = parseISO(props.createdAt); // Преобразуем ISO 8601 строку в объект Date
  const formattedDate = format(parsedDate, 'HH:mm - dd MMM yyyy', { locale: ruLocale }); // Форматируем дату

  const [showComments, setShowComments] = useState(false); // Состояние для отображения комментариев

  const toggleComments = () => {
    setShowComments(!showComments); // Изменение состояния при клике на кнопку
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
};

const handleConfirmDelete = () => {
    setIsModalOpen(false);
    props.postDelete(props.postId)
};

const handleCancelDelete = () => {
    setIsModalOpen(false);
};

  return (
    <div>
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
      <div className={s.name_user}>{props.name}</div>
      <div>{props.message}</div>
      <div className={s.photo_post}>{props.photo_post ? <img src={props.photo_post} alt="photo_post" /> : null}</div>
    </div>

    <div>
      <CommentForm postId={props.postId} postComment={props.postComment} toggleComments={toggleComments} />
    </div>
  </div>

  <div className={s.conteinerIcon}>
      <div className={s.deleteIcon}>
        {props.authorizedUserId === props.authorId && (
          <span onClick={handleDeleteClick}>
            <AiOutlineDelete className={s.like_icon_delet} />
          </span>      
        )}
        {isModalOpen && (
                <ConfirmationModal
                    message="Вы уверены, что хотите удалить этот пост?"
                    onCancel={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                />
            )}       
      </div>

    <div className={s.icons}>
      <div className={s.commentLikeContainer}>
        <span className={s.icon_comment} onClick={toggleComments}>
          <BiCommentDetail />
          <span className={s.count}>{countPost}</span>
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



        {showComments && (
      <div>
        {commentsForPost.map(comment => (
          <CommentComponent authorName={comment.comment_author.name} text={comment.message} 
          createdAt={comment.created_at} authorPhoto={comment.comment_author.photos.small} key={comment.id} 
          commentId={comment.id} deleteComment={props.deleteComment} authorizedUserId={props.authorizedUserId} 
          commentAuthorId={comment.comment_author.id} authorId={comment.comment_author.id} />
        ))}
      </div>
        )}
    </div>
  )
}

export default Post