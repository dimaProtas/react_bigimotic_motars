import React from 'react';
// import NewsPosts from './NewsPost/NewsPosts.jsx'
import s from './News.module.css';
import Post from '../Profile/MyPost/Post/Post.jsx';
import { AiOutlineHistory } from "react-icons/ai";


const News = (props) => {
    const handleGetNextNews = () => {
        props.getNextNews()
    };
    
    return (
        <div>
            {props.news.slice().map(n => {
                const commentsForPost = props.comments.filter(comment => comment.post === n.id);
                // debugger
                return (
                    <Post 
                        key={n.id}
                        name={n.author.name}
                        authorId={n.author.id}
                        message={n.message}
                        likeCount={n.like_count}
                        img={n.author.photos.large}
                        createdAt={n.created_at}
                        authorizedUserId={props.authorizedUserId} 
                        postId={n.id}
                        postDelete={props.postDelete}
                        isLiked={n.is_liked}
                        like={props.like}
                        likeRemove={props.likeRemove}
                        photo_post={n.photo_post_url}
                        comments={commentsForPost} // Передаем отфильтрованные комментарии
                        postComment={props.postComment}
                        deleteComment={props.deleteComment}
                     />
                )
            })}
            <div className={s.load_message} onClick={handleGetNextNews}><AiOutlineHistory /></div>
        </div>
        
    )
}

export default News;