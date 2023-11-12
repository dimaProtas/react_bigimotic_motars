import React from 'react';
import { connect } from 'react-redux';
import { getPost, addPost, postDelete, like, likeRemove, getComments, postComment, deleteComment } from '../../../reducer/profile-reduser.js';
import MyPost from './MyPost';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';

export function withRouter(Child){
  return(props)=>{

     const match  = {params: useParams()};
     return <Child {...props}  match = {match}/>
 }
}


class MyPostContainer extends React.Component {
  refreshProfile(userId) {
    this.props.getPost(userId);
    this.props.getComments()
  }

  componentDidMount() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.authorizedUserId;
    }
    this.refreshProfile(userId);
  }

  componentDidUpdate(prevProps) {
    const prevUserId = prevProps.match.params.userId;
    const currentUserId = this.props.match.params.userId;
    
    if (currentUserId !== prevUserId) {
      this.refreshProfile(currentUserId);
    }
  }

  render() {
    const userId = this.props.match.params.userId;
    return (
      <MyPost
        getPost={this.props.getPost}
        post={this.props.posts}
        newText={this.props.newText}
        userId={userId}
        authorizedUserId={this.props.authorizedUserId}
        addPost={this.props.addPost}
        postDelete={this.props.postDelete}
        // isLiked={this.props.isLiked}
        likeRemove={this.props.likeRemove}
        like={this.props.like}
        comments={this.props.comments}
        postComment={this.props.postComment}
        deleteComment={this.props.deleteComment}

      />
    );
  }
}

// const MyPostContainer = (props) => {

//   let store = props.store.getState()

//   const addPost = () => { 
//     // const text = newPostElement.current.value;
//     props.store.dispatch(addPostActionCreated());
//     // props.updateTextPost('');  // Обнуляет строку ввода
//   }

//   const onPostChange = (text) => {
//     let action = updatePostActionCreated(text);
//     props.store.dispatch(action)
//   }

//   return (
//     <MyPost updatePostActionCreated={onPostChange} addPost={addPost} post={store.ProfilePage.post} newText={store.ProfilePage.newPostText} />
//   )
// }

const mapStateToProps = (state) => {
  return {
    posts: state.ProfilePage.post,
    newText: state.ProfilePage.newPostText,
    authorizedUserId: state.auth.userId,
    comments: state.ProfilePage.comments,
    // isLiked: state.ProfilePage.isLiked,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updatePostActionCreated: (text) => {
//       let action = updatePostActionCreated(text);
//       dispatch(action)
//     },
//     addPost: () => {
//       dispatch(addPostActionCreated());
//     }
//   }
// }


// const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost);

export default compose(
  connect(mapStateToProps, {getPost, addPost, postDelete, like, likeRemove, getComments, 
    postComment, deleteComment}),
  withRouter 
) (MyPostContainer)
