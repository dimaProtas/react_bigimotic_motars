import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getNews } from '../../reducer/news-reduser';
import { postDelete, deleteComment, postComment, getComments } from '../../reducer/profile-reduser'
import { like, likeRemove, getNextOlderNews } from '../../reducer/news-reduser'
import News from './News.jsx';
import { useParams } from 'react-router-dom';

export function withRouter(Child){
  return(props)=>{

     const match  = {params: useParams()};
     return <Child {...props}  match = {match}/>
 }
}

class NewsContainer extends React.Component {

    componentDidMount() {
        // debugger;
        this.props.getNews()
        this.props.getComments()
    }

    render() {
        return (
            <>
                <News 
                    news={this.props.news} 
                    authorizedUserId={this.props.authorizedUserId}
                    postDelete={this.props.postDelete}
                    comments={this.props.comments}
                    postComment={this.props.postComment}
                    deleteComment={this.props.deleteComment}
                    likeRemove={this.props.likeRemove}
                    like={this.props.like}
                    getNextNews={this.props.getNextOlderNews}
                     />
            </>
        )
    }
}


let mapStateToProps = (state) => {
    // debugger;
    return {
        news: state.News.news,
        authorizedUserId: state.auth.userId,
        comments: state.ProfilePage.comments,
    }
}

export default compose (
    connect(mapStateToProps,
        {
            getNews,
            deleteComment,
            postComment,
            like,
            likeRemove,
            postDelete,
            getComments,
            getNextOlderNews,
        }),
    withRouter
) (NewsContainer)