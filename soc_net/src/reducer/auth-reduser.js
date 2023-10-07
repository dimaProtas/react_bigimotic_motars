import userAPI, { securityAPI } from "../api/api.js";
import {authAPI}  from "../api/api.js";
import {selectFriends} from "./users-reduser.js";

const SET_AUTH_USER = "SET_AUTH_USER"
const RESET_USER_AUTH_DATA = "RESET_USER_AUTH_DATA"
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS"


let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null,
    // userToken: '',
    // refreshToken: '',
}

const AuthReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_AUTH_USER:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state, 
                ...action.payload
                }

        case RESET_USER_AUTH_DATA:
            return {
                // ...state,
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

export default AuthReducer

// export const authUser = () => {
//     return async (dispatch) => {

//         const responce = await userAPI.authMe()
//             if (responce.data.resultCode === 0) {
//                 let {id, login, email} = responce.data.data
//                 dispatch(setAuthUser(id, login, email, true))
//             }
//     }
// }

// обновленный authUser
export const authUser = () => {
    return async (dispatch) => {
        try {
            // console.log('Trying to authenticate...');
            const response = await userAPI.authMe();

            if (response.data.resultCode === 0) {
                let { id, login, email } = response.data.data;
                dispatch(setAuthUser(id, login, email, true));
                dispatch(selectFriends())
            }
        } catch (error) {
            // console.error('Authentication error:', error);

            // Если запрос к authMe завершился ошибкой, попробовать обновить токен
            if (error.response && error.response.status === 403 && error.response.data.detail === "Given token not valid for any token type") {
                try {
                    // console.log('Refreshing token...');
                    const refreshToken = localStorage.getItem('refreshToken'); // Получаем refresh token из localStorage

                    if (refreshToken) {
                        const response = await authAPI.refreshToken(refreshToken);
                        // console.log('New access token:', response.data.access);
                        localStorage.setItem('userToken', response.data.access);
                        localStorage.setItem('refresh_token', response.data.refresh);

                        // Повторить запрос к authMe с новым access token
                        // console.log('Retrying authMe...');
                        const newResponse = await userAPI.authMe();
                        if (newResponse.data.resultCode === 0) {
                            let { id, login, email } = newResponse.data.data;
                            dispatch(setAuthUser(id, login, email, true));
                        }
                    }
                } catch (refreshError) {
                    // console.error('Error refreshing token:', refreshError);
                    // Здесь вы можете выполнить какие-то дополнительные действия при неудачной попытке обновления токена
                    dispatch(resetAuthDataAC());
                    localStorage.setItem('userToken', '');
                    localStorage.setItem('refreshToken', '');
                }
            }
        }
    };
};


// export const login = (email, password, rememberMe, captcha) => {
//     return async (dispatch) => {
//         const response = await authAPI.loginUser(email, password, rememberMe, captcha)
//         if (response.data.resultCode === 0) {
//             dispatch(authUser())
//         } else if (response.data.resultCode === 10) {
//             dispatch(getCaptchaUrl())
//         }
//     }
// }


// export const refreshAndAuthenticate = () => {
//     return async (dispatch) => {
//         try {
//             console.log('Trying to refresh token...');
//             const refreshToken = localStorage.getItem('refreshToken');
//             console.log('refreshToken', refreshToken)

//             if (refreshToken) {
//                 const response = await authAPI.refreshToken(refreshToken);
//                 localStorage.setItem('userToken', response.data.access);
//                 localStorage.setItem('refreshToken', response.data.refresh);

//                 // Повторить запрос к authMe с новым access token
//                 console.log('Retrying authMe...');
//                 const newResponse = await userAPI.authMe();
//                 if (newResponse.data.resultCode === 0) {
//                     let { id, login, email } = newResponse.data.data;
//                     dispatch(setAuthUser(id, login, email, true));
//                 }
//             }
//         } catch (refreshError) {
//             console.error('Error refreshing token:', refreshError);

//             // Если обновление токена не удалось, выполнить разлогинивание пользователя
//             dispatch(resetAuthDataAC());
//             localStorage.setItem('userToken', '');
//             localStorage.setItem('refreshToken', '');

//             // Вы можете выполнить дополнительные действия, связанные с неудачным обновлением токена
//         }
//     };
// };

export const register = (fullName, login, email, password, repidPassword, setStatus) => {
    return async (dispatch) => {
        const response = await authAPI.registerUser(fullName, login, email, password, repidPassword)
        if (response.data.resultCode === 0) {
            localStorage.setItem('userToken', response.data.data.token);
            localStorage.setItem('refreshToken', response.data.data.refreshToken);
            dispatch(authUser());
        } else {
            setStatus(response.data.email[0]);
        }
    }
}


export const login = (email, password, rememberMe, captcha, setStatus) => {
    return async (dispatch) => {
        const response = await authAPI.loginUser(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            // Сохранение токена в localStorage
            // console.log('refreshToken', response.data.data.refreshToken)
            localStorage.setItem('userToken', response.data.data.token);
            localStorage.setItem('refreshToken', response.data.data.refreshToken);
            
            // Далее можно выполнить дополнительные действия, если необходимо
            // const storedToken = localStorage.getItem('userToken');

            // if (storedToken) {
            //     console.log('Token found in localStorage:', storedToken);
            // } else {
            //     console.log('Token not found in localStorage');
            // }
            dispatch(authUser());
        } else if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        } else if (response.data.resultCode === 1) {
            setStatus(response.data.messages[0]);
        }
    }
}


export const getCaptchaUrl = () => async (dispatch) => {
        const response = await securityAPI.getCaptchaUrl()
        const captchaUrl = response.data.url
        dispatch(getCaptchaUrlSuccess(captchaUrl))
    }

export const logout = () => {
    return async (dispatch) => {
        try {
            const response = await authAPI.logout();
            if (response.data.resultCode === 0) {
                dispatch(resetAuthDataAC());
                localStorage.setItem('userToken', '');
                localStorage.setItem('refreshToken', '');
            }
        } catch (error) {
            // Обработка ошибок при выходе
            console.error('Logout error:', error);
        }
    };
};



//Вывод стрелочной ф-и без return возможен, если функция только возвращает обьекты, после => нужно обернуть в ()
export const setAuthUser = (userId, login, email, isAuth) => ({ type: SET_AUTH_USER, payload: {userId, login, email, isAuth} })
export const getCaptchaUrlSuccess = (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl} })
export const resetAuthDataAC = () => {return { type: RESET_USER_AUTH_DATA }}
