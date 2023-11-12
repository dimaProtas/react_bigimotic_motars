import userAPI from '../api/api.js';
import updateObjectInArray from '../utils/object-halpers.js'

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_FRIENDS_UPDATE = "SET_FRIENDS_UPDATE"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const SET_TOTAL_FRIENDS_COUNT = "SET_TOTAL_FRIENDS_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"
const RESET_USER_AUTH_DATA = "RESET_USER_AUTH_DATA"
const SET_NEXT_USERS = "SET_NEXT_USERS"


let initialState = {
    users: [],
    friends: [],
    offset: 0,
    totalCountUsers: 100,
    totalFriendsCount: 0,
    limit: 5,
    isFetching: false,
    followingInProgress: [],
    next: ''
}

const UsersReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_NEXT_USERS:
            // Фильтруем пользователей по id, чтобы исключить дубли
            // const filteredUsers = action.users.results.filter(user => !state.users.some(existingUser => existingUser.id === user.id));
            return {
                ...state,
                users: [...state.users, ...action.nextUsers.results],
                next: action.nextUsers.next,
            };
        

        case FOLLOW:
            const newFollowedUser = state.users.find(user => user.id === action.userID);
            return {
                ...state, 
                users: updateObjectInArray(state.users, action.userID, "id", {followed: true}),
                totalFriendsCount: state.totalFriendsCount + 1,
                friends: [...state.friends, newFollowedUser]
                // users: state.users.map(u => {
                //     if (u.id === action.userID) {
                //         return {...u, followed: true}
                //     }
                //     return u
                // })
                }
        case UNFOLLOW:
            const updatedFriends = state.friends.filter(friend => friend.id !== action.userID);
            return {
                ...state, 
                users: updateObjectInArray(state.users, action.userID, "id", {followed: false}) ,
                totalFriendsCount: state.totalFriendsCount - 1,
                friends: updatedFriends
                // Заменил код вспомогательной функцией, которая работает автоматически
                // users: state.users.map(u => {
                //     if (u.id === action.userID) {
                //         return {...u, followed: false}
                //     }
                //     return u
                // })
            };
        // case SET_USERS:
        //     return {
        //         ...state,
        //         users: [...action.users], //...state.users, убрал потому что дублируются пользователи
        //     }
        case SET_USERS:
            return {
              ...state,
              users: [...action.users.results],
              friends: [...state.friends],
              next: action.users.next,
            };

            

        case SET_FRIENDS_UPDATE:
            const filteredFriends = action.friends.filter(friend => !state.friends.some(existingUser => existingUser.id === friend.id));
            return {
                ...state,
                users: [...state.users],
                totalFriendsCount: state.totalFriendsCount,
                friends: [...state.friends, ...filteredFriends],
                followingInProgress: [...state.followingInProgress]
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalCountUsers: action.count,
            }
            case SET_TOTAL_FRIENDS_COUNT:
                const friendsCount = action.users.reduce((count, user) => {
                    if (user.followed) {
                        return count + 1;
                    }
                    return count;
                }, 0);
                return {
                    ...state,
                    totalFriendsCount: friendsCount,
                    friends: [...state.friends],
                }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching 
                ? [...state.followingInProgress, action.userID]
                : state.followingInProgress.filter(id => id !== action.userID),
                friends: [...state.friends]
            }
        case RESET_USER_AUTH_DATA:
            return {
                ...initialState
            }
        default:
            return state
    }
}
    
//     if (action.type === SEND_MESSAGE) {
//         let newMessage = {
//             id: 6,
//             user: 'Valera',
//             message: state.new_message,
//         };

//         state.messages.push(newMessage);
//         state.new_message = '' // обнуление строки в state
//     } else if (action.type === UPDATE_MESSAGE) {
//         state.new_message = action.text;
//     }

//     return state
// }

export default UsersReducer


export const getNextUsers = () => async (dispatch, getState) => {
    const { next } = getState().UsersPage; // Замените yourReducerName на имя вашего редьюсера
    // debugger;
    try {
        if (next !== null) {
            const response = await userAPI.getNextUsers(next.slice(26));
            dispatch(nextUsers(response));
        }

    } catch (error) {
        console.error("Error while loading next users:", error);
    }
};


//здесь код thunk(инкапсулировали код из User.jsx b UserContainer.jsx)
export const selectorUsers = () => {
    return async (dispatch) => {

        dispatch(toggelIsFetching(true))
        const data = await userAPI.getUser()
        dispatch(toggelIsFetching(false));
        dispatch(setUsers(data));
        dispatch(setTotalUsersCount(data.count));
        // dispatch(setCurrentPage(currentPage))
    }
}

export const selectFriends = () => {
    return async (dispatch) => {
        const data = await userAPI.getFriends()
        dispatch(setTotalFiendsCount(data))
        dispatch(setFriends(data))
    }
}


const followunfollow = async (dispatch, userID, apiMethod, actionCreated) => { // рефакторинг обьеденил две функции в одну
    dispatch(toggelFollowingProgress(true, userID))

    let response = await apiMethod(userID)

    if (response.data.resultCode === 0) {
        dispatch(actionCreated(userID)) 
    }
    dispatch(toggelFollowingProgress(false, userID));
}


export const unfollow = (userID) => {
    return async (dispatch) => {
        followunfollow(dispatch, userID, userAPI.unfollow.bind(userAPI), unfollowSuccess)
    }
}
export const follow = (userID) => {
    return async (dispatch) => {
        followunfollow(dispatch, userID, userAPI.follow.bind(userAPI), followSuccess)
    }
}


//Вывод стрелочной ф-и без return возможен, если функция только возвращает обьекты, после => нужно обернуть в ()
export const followSuccess = (userID) => ({ type: FOLLOW, userID })
export const unfollowSuccess = (userID) => ({ type: UNFOLLOW, userID })
export const setUsers = (users, friends) => ({ type: SET_USERS, users, friends })
export const setFriends = (friends) => ({ type: SET_FRIENDS_UPDATE, friends })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
export const setTotalFiendsCount = (users) => ({ type: SET_TOTAL_FRIENDS_COUNT, users: users })
export const toggelIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggelFollowingProgress = (isFetching, userID) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID })
export const nextUsers = (nextUsers) => ({type: SET_NEXT_USERS, nextUsers: nextUsers})