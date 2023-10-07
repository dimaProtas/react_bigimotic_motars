import {createSelector} from 'reselect'; 

const getUsersSelector = (state) => {
    return state.UsersPage.users || []     
}

export const getUsers =  createSelector(getUsersSelector, (users) => {
    return users.filter(u => true);
})

const getFriendsSelector = (state) => {
    return state.UsersPage.friends     
}

export const getFriends = createSelector(getFriendsSelector, (friends) => {
    return friends.filter(u => true);
})

export const getTotalFriendsCount = (state) => {
    return state.UsersPage.totalFriendsCount
}

export const getPageSize = (state) => {
    return state.UsersPage.pageSize      
}

export const getTotalCountUsers = (state) => {
    return state.UsersPage.totalCountUsers       
}

export const getCurrentPage = (state) => {
    return state.UsersPage.currentPage       
}

export const getIsFetching = (state) => {
    return state.UsersPage.isFetching       
}

export const getFollowingInProgress = (state) => {
    return state.UsersPage.followingInProgress       
}

