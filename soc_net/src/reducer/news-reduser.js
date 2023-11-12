import {newsAPI} from "../api/api.js";
import { postAPI } from "../api/api.js";

const SET_NEWS = "SET_NEWS";
const SET_NEXT_NEWS = "SET_NEXT_NEWS";
const ADD_LIKE = "ADD_LIKE";
const REMOVE_LIKE = "REMOVE_LIKE";
const TOGGLE_LIKE_REMOVE_LIKE_PROGRESS = "TOGGLE_LIKE_REMOVE_LIKE_PROGRESS";
const TOGGLE_IS_LIKE_POST = "TOGGLE_IS_LIKE_POST";


let initialState = {
  news: [],
  isLiked: false,
  likeInProgress: [],
  next: "",
  previous: "",
};

export const NewsReducer = (state = initialState, action) => {

    switch (action.type) {
      case TOGGLE_IS_LIKE_POST:
        return {
          ...state,
          isLiked: action.isLiked,
        };
      case TOGGLE_LIKE_REMOVE_LIKE_PROGRESS:
        return {
          ...state,
          likeInProgress: action.isLikePost
            ? [...state.likeInProgress, action.postId]
            : state.likeInProgress.filter((id) => id !== action.postId),
        };

      case ADD_LIKE:
        // debugger
        const updatedPost = state.news.map((news) => {
          if (news.id === action.postId) {
            return {
              ...news,
              like_count: news.like_count + 1,
              is_liked: true, // Устанавливаем флаг isLiked в true при добавлении лайка
            };
          }
          return news;
        });
        return {
          ...state,
          news: updatedPost,
        };

      case REMOVE_LIKE:
        return {
          ...state,
          news: state.news.map((news) => {
            if (news.id === action.postId) {
              return {
                ...news,
                like_count: news.like_count - 1,
                is_liked: false, // Устанавливаем флаг isLiked в false при удалении лайка
              };
            }
            return news;
          }),
        };

      case SET_NEWS: {
        return {
          ...state,
          news: [...action.news.results],
          next: action.news.next,
          previous: action.news.previous,
        };
      }

      case SET_NEXT_NEWS: {
        return {
          ...state,
          news: [...state.news, ...action.news.results],
          next: action.news.next,
          previous: action.news.previous,
        };
      }

      default:
        return state;
    }
}

export const getNews = () => {
  return async (dispach) => {
    const response = await newsAPI.getNewsAll();
    dispach(setNews(response));
  };
};

export const getNextOlderNews = () => {
  return async (dispatch, getState) => {
    const { next } = getState().News;
    if (next !== null) {
      const response = await newsAPI.getOlderNews(next.slice(26));
      dispatch(setNextNews(response));
    }
  }
}

export const likeRemoveLike = async (dispatch, postId, apiMethod, actionCreated) => {
//   debugger;
  dispatch(toggleLikeRemoveLikeProgress(true, postId));
  let response = await apiMethod(postId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreated(postId));
  }
  dispatch(toggleLikeRemoveLikeProgress(false, postId));
};

export const like = (postId) => {
    // debugger;
  return async (dispatch) => {
    likeRemoveLike(dispatch, postId, postAPI.like.bind(postId), addLikeSuccess);
  };
};

export const likeRemove = (postId) => {
  return async (dispatch) => {
    likeRemoveLike(
      dispatch,
      postId,
      postAPI.dislike.bind(postId),
      removeLikeSuccess
    );
  };
};

export default NewsReducer

//Вывод стрелочной ф-и без return возможен, если функция только возвращает обьекты, после => нужно обернуть в ()
// export const sendMessageActionCreated = () => ({ type: SEND_MESSAGE })
// export const updateMessageActionCreated = (message) => ({ type: UPDATE_MESSAGE, message: message})
export const setNews = (news) => ({type: SET_NEWS, news: news})
export const setNextNews = (news) => ({type: SET_NEXT_NEWS, news: news})
export const addLikeSuccess = (postId) => ({ type: 'ADD_LIKE', postId });
export const removeLikeSuccess = (postId) => ({ type: 'REMOVE_LIKE', postId });
export const toggleIsLikePost = (isLiked) => ({ type: TOGGLE_IS_LIKE_POST, isLiked: isLiked });
export const toggleLikeRemoveLikeProgress = (isLiked, postId) => ({ type: TOGGLE_LIKE_REMOVE_LIKE_PROGRESS, isLiked, postId });


