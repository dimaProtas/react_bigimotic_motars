import {authUser} from './auth-reduser.js';

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"


let initialState = {
    initialized: false,

}

const AppReducer = (state = initialState, action) => {

    switch (action.type) {

        case INITIALIZED_SUCCESS:
            return {
                ...state, 
                initialized: true
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

export default AppReducer

export const initializedApp = () => {
    return (dispatch) => {

        let promies = dispatch(authUser())

        Promise.all([promies]).then(() => {
            dispatch(initializedSuccess());
        });

    }
}


//Вывод стрелочной ф-и без return возможен, если функция только возвращает обьекты, после => нужно обернуть в ()
export const initializedSuccess = () => {return { type: INITIALIZED_SUCCESS }}
