import axios from "axios";

export const instans = axios.create({
    withCredentials: true,
    // baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    // headers: {'API-KEY': '326b0522-c61e-4d4e-a7df-aae77c6de2db'}
    baseURL: 'http://127.0.0.1:8000/api/'
})


// Добавляем interceptor для автоматического добавления токена в заголовок запроса
instans.interceptors.request.use(config => {
    const token = localStorage.getItem('userToken'); // Получаем токен из localStorage
    // const refreshToken = localStorage.getItem('refreshToken'); // Получаем токен из localStorage
    // console.log('Access token retrieved from localStorage:', `Bearer ${token}`);
    // console.log('refreshToken', `Bearer ${refreshToken}`);
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

export const musicAPI ={
    getMusic() {
        return instans.get(`music/track/`).then(response => {
            return response.data
        })
    }
}

export const newsAPI = {
    getNewsAll() {
        return instans.get(`news/`).then(response => {
            return response.data
        })
    },

    getOlderNews(url) {
        return instans.get(url).then(response => {
            return response.data
        })
    },
}

export const messagesAPI = {
    getOlderMessages(userId, limit, offset) {
        return instans.get(`messages/${userId}/?limit=${limit}&offset=${offset}`).then(response => {
            return response.data           
        })
    },

    getMessagesUser(userId) {
        return instans.get(`messages/${userId}/?limit=10&offset=0`, {
            headers: {
                'Content-Type': "application/json"
            }
        }).then(response => {
            return response.data
        })
    },

    sendMessage(recipient, text) {
        let result = instans.post(`send-message/`, {recipient, text})
        return result
    }
}


export const postAPI = {
    postComment(message, post) {
        return instans.post(`post/comments/`, {message, post}).then(response => {
            return response.data
        })
    },

    deleteComment(commentId) {
        return instans.delete(`comments/${commentId}/delete`).then(response => {
            return response.data
        })
    },

    getComments() {
        return instans.get(`post/comments/`).then(response => {
            return response.data
        })
    },

    getPost(userId) {
        return instans.get(`user/post/${userId}`).then(response => {
            return response.data
        })
    },

    addPost(author, message, userId, photPost) {
        const formData = new FormData();
        formData.append("image", photPost)
        let result = instans.post(`user/post/${userId}/`, {author, message, user_post: userId, photo_post_url: photPost}, 
        {
            headers: {
                'Content-Type': 'multipart/form-data'   
            }
        })
        return result
    },

    deletePost(postId) {
        let result = instans.delete(`user/post/${postId}/delete/`)
        return result
    },
    
    like(postId, likeCount) {
        let result = instans.post(`user/post/like/${postId}/`, {licke_count: likeCount})
        return result
    },

    dislike(postId, likeCount) {
        let result = instans.delete(`user/post/like/${postId}`)
        return result
    }
}

const userAPI = {
  getUser() {
    return instans.get(`users/`).then((response) => {
      // return instans.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
      // return instans.get(`users/`).then(response => {
      return response.data;
    });
  },

  getNextUsers(next) {
    return instans.get(next).then((response) => {
      // return instans.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
      // return instans.get(`users/`).then(response => {
      return response.data;
    });
  },

  getFriends() {
    return instans.get(`friends/`).then((response) => {
      // return instans.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
      // return instans.get(`users/`).then(response => {
      return response.data;
    });
  },

  follow(id) {
    return instans.post(`follow/${id}/`);
  },

  unfollow(id) {
    return instans.delete(`unfollow/${id}/`);
  },

  authMe() {
    return instans.get(`auth/me`);
  },

  profile(userId) {
    console.log("Old params, chenge new params profileAPI");
    return profileAPI.profile(userId);
  },
}; 

export const profileAPI = {
    profile(userId) {
        // return instans.get(`profile/${userId}`)
        return instans.get(`user/${userId}`)
    },

    getStatus(id) {
        return instans.get(`status/${id}`)
    },

    updateStatus(userId, status) {
        return instans.put(`status/${userId}/`, {status: status})
    },

    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instans.put(`photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    saveProfile(userId, profile) {
        return instans.put(`user/${userId}/`, profile)
    },
} 


export const authAPI = {

    registerUser(fullName, login, email, password, repidPassword) {
        let result = instans.post(`register/`, {full_name: fullName, username: login, email, password, repidPassword})
        return result
    },

    loginUser(email, password, rememberMe=false, captcha=null) {
        // console.log(email, password)
        let result = instans.post('auth/login/', {email, password, rememberMe}, {headers: {'Content-Type': 'application/json'}});
        return result
    },

    logout() {
        return instans.delete('auth/logout/' );
    },

    refreshToken(refreshToken) {
        let result = instans.post('token/refresh/', { 'refresh': refreshToken })
        return result
    }
    
} 


export const securityAPI = {
    getCaptchaUrl() {
        return instans.post('security/get-captcha-url');
    }
} 




export default userAPI
