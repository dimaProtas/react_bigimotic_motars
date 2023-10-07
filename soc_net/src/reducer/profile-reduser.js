import {postAPI, profileAPI} from "../api/api.js"

const ADD_POST = "ADD-POST"
const UPDATE_POST = "UPDATE-POST"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"
const DELETE_POST = "DELETE_POST"
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"
const SET_POSTS = "SET_POSTS"
const ADD_LIKE = "ADD_LIKE"
const REMOVE_LIKE = "REMOVE_LIKE"
const TOGGLE_LIKE_REMOVE_LIKE_PROGRESS = "TOGGLE_LIKE_REMOVE_LIKE_PROGRESS"
const TOGGLE_IS_LIKE_POST = "TOGGLE_IS_LIKE_POST"
const SET_COMMENTS = "SET_COMMENTS"
const UPDATE_COMMENT = "UPDATE_COMMENT"
const DELETE_COMMENT = "DELETE_COMMENT"

let initialState = {
    post: [
        // { id: 1, name: 'Dima', message: "Hy, how are you?", likeCount: 14 },
        // { id: 2, name: 'Dima', message: "I not Bot!", likeCount: 76 },
        // { id: 3, name: 'Dima', message: "My first post", likeCount: '6k' },
    ],
    newPostText: '',
    profile: null,
    status: '',
    isLiked: false,
    likeInProgress: [],
    comments: [],
}

export const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_LIKE_POST:
            return {
                ...state,
                isLiked: action.isLiked,
            }
        case TOGGLE_LIKE_REMOVE_LIKE_PROGRESS:
            return {
                ...state,
                likeInProgress: action.isLikePost 
                ? [...state.likeInProgress, action.postId]
                : state.likeInProgress.filter(id => id !== action.postId),
            }

            case ADD_LIKE:
                const updatedPost = state.post.map(post => {
                    if (post.id === action.postId) {
                        return {
                            ...post,
                            like_count: post.like_count + 1,
                            isLiked: true, // Устанавливаем флаг isLiked в true при добавлении лайка
                        };
                    }
                    return post;
                });
                return {
                    ...state,
                    post: updatedPost
                };
            
              
        case REMOVE_LIKE:
            return {
                ...state,
                post: state.post.map(post => {
                if (post.id === action.postId) {
                    return {
                    ...post,
                    like_count: post.like_count - 1,
                    isLiked: false // Устанавливаем флаг isLiked в false при удалении лайка
                    };
                }
                return post;
                })
            };
        
        case UPDATE_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.comment]
            }

        case SET_COMMENTS:
            return {
                ...state,
                comments: [...action.comments],
            }

        case DELETE_COMMENT:
            return {
                ...state, 
                comments: state.comments.filter(c => c.id !== action.commentId)
            }

        case SET_POSTS:
            const camelCasePosts = action.posts.map(post => ({
                ...post,
                isLiked: post.is_liked, // Преобразуем is_liked в isLiked
            }));
            return {
                ...state,
                post: camelCasePosts, // Обновляем список постов
            };

        case ADD_POST:
            // let newPost = {
            //     id: 5,
            //     name: 'Dima',
            //     message: state.newPostText,
            //     likeCount: 0,
            // };

            return {
                ...state,
                newPostText: '',
                post: [...state.post]
            };
        case UPDATE_POST:
            return {
                ...state,
                newPostText: action.text,
            };
        case SET_USER_PROFILE:
            return{
                ...state, 
                profile: action.profile,
                
            };

        case SET_STATUS:
            return{
                ...state, 
                status: action.status
            };

        case DELETE_POST:
            return{
                ...state, 
                post: state.post.filter(p => p.id !== action.postId)
            };


        case SAVE_PHOTO_SUCCESS:
            return{
                ...state, 
                profile: {...state.profile, photos: action.photos}
            };

        default:
            return state;
    }
}
            //Переделали под switch
//     if (action.type === ADD_POST) {
//         let newPost = {
//             id: 5,
//             name: 'Dima',
//             message: state.newPostText,
//             likeCount: 0,
//         };

//         state.post.push(newPost);
//         state.newPostText = '' // обнуление строки в state

//     } else if (action.type === UPDATE_POST) {
//         state.newPostText = action.text;
//     } 
 
//     return state;
// }

export default ProfileReducer


export const profileUser = (userId) => {
    return async (dispatch) => {
        const response = await profileAPI.profile(userId)
        dispatch(setUserProfile(response.data));
    }
}

export const deleteComment = (commentId) => {
    return async (dispatch) => {
        await postAPI.deleteComment(commentId)
        dispatch(deleteCommentDispatch(commentId))
    }
}

export const postComment = (message, post) => {
    return async (dispatch) => {
        const response = await postAPI.postComment(message, post)
        dispatch(updateComments(response))
    }
}

export const getComments = () => {
    return async (dispatch) => {
        const response = await postAPI.getComments()
        dispatch(setComments(response))
    }
}

export const getPost = (userId) => {
    return async (dispatch) => {
        if(userId !== undefined) {
            const response = await postAPI.getPost(userId)
            dispatch(setPosts(response))
        }
        
    }
}

export const addPost = (author, message, userId, photPost) => {
    return async (dispatch) => {
        await postAPI.addPost(author, message, userId, photPost)
        dispatch(addPostActionCreated());
        dispatch(updatePostActionCreated(message))
        dispatch(getPost(userId)); // Диспетчер для получения обновленных данных
    }
}

export const postDelete = (postId) => {
    return async (dispatch) => {
        await postAPI.deletePost(postId)
        dispatch(deletePost(postId))

    }
}

export const likeRemoveLike = async (dispatch, postId, apiMethod, actionCreated) => {
    // debugger;
    dispatch(toggleLikeRemoveLikeProgress(true, postId))
    let response = await apiMethod(postId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreated(postId))
    }
    dispatch(toggleLikeRemoveLikeProgress(false, postId))
}

export const like = (postId) => {
    return async (dispatch) => {
        likeRemoveLike(dispatch, postId, postAPI.like.bind(postId), addLikeSuccess)
    };
};

export const likeRemove = (postId) => {
    return async (dispatch) => {
        likeRemoveLike(dispatch, postId, postAPI.dislike.bind(postId), removeLikeSuccess)
    };
};

export const getStatus = (userId) => {
    return async (dispatch) => {
        const response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data));
    }
}

export const updateUserStatus = (userId, status) => {
    return (dispatch) => {
        profileAPI.updateStatus(userId, status)
        .then(response => { // использумем .then, но можно async await как писал выше(короче код)
            if (response.data.resultCode === 0) {
                dispatch(setStatus({'status': status}));
            }
          });

    }
}

export const savePhoto = (file) => {
    return (dispatch) => {
        profileAPI.savePhoto(file)
        .then(response => { // использумем .then, но можно async await как писал выше(короче код)
            if (response.data.resultCode === 0) {
                dispatch(savePhotoSuccess(response.data.data.photos));
            }
          });

    }
}

export const saveProfile = (profile, setStatus) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        const response = await profileAPI.saveProfile(userId, profile)
        // console.log('saveProfile')
        // debugger;
            if (response.data.resultCode === 0) {
                dispatch(profileUser(userId));
            }
            else {
                dispatch(setStatus(response.data.messages[0]))
            }

    }
}


//Вывод стрелочной ф-и без return возможен, если функция только возвращает обьекты, после => нужно обернуть в ()
export const addPostActionCreated = () => ({ type: ADD_POST })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile: profile })
export const updatePostActionCreated = (text) => ({ type: UPDATE_POST, text: text })
export const setStatus = (status) => ({ type: SET_STATUS, status: status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId  })
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos  })
export const setPosts = (posts) => ({ type: SET_POSTS, posts })
export const addLikeSuccess = (postId) => ({ type: 'ADD_LIKE', postId });
export const removeLikeSuccess = (postId) => ({ type: 'REMOVE_LIKE', postId });
export const toggleIsLikePost = (isLiked) => ({ type: TOGGLE_IS_LIKE_POST, isLiked: isLiked });
export const toggleLikeRemoveLikeProgress = (isLiked, postId) => ({ type: TOGGLE_LIKE_REMOVE_LIKE_PROGRESS, isLiked, postId });
export const setComments = (comments) => ({type: SET_COMMENTS, comments: comments})
export const updateComments = (comment) => ({type: UPDATE_COMMENT, comment: comment})
export const deleteCommentDispatch = (commentId) => ({type: DELETE_COMMENT, commentId: commentId})
