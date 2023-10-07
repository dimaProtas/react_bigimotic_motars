import { messagesAPI } from "../api/api"


// const SEND_MESSAGE = "SEND_MESSAGE"
// const UPDATE_MESSAGE = "UPDATE_MESSAGE"
const SET_MESSAGES = "SET_MESSAGES"
const SET_OLDER_MESSAGES = "SET_OLDER_MESSAGES"
const SET_SHOW_SCROLL_ICON = "SET_SHOW_SCROLL_ICON"

let initialState = {
    users: [
        // { id: 1, name: "Dima" },
        // { id: 2, name: "Ira" },
        // { id: 3, name: "Petr" },
        // { id: 4, name: "Vasiliy" },
        // { id: 5, name: "Evgeniy" },
        // { id: 6, name: "Alex" },
        // { id: 7, name: "Yriy" },
    ],
    messages: [
        // { id: 1, user: 'Dima', message: "Hi" },
        // { id: 2, user: 'Ira', message: "Nice dekaration object" },
        // { id: 3, user: 'Dima', message: "How are Your?" },
        // { id: 4, user: 'Ira', message: "By" },
    ],
    new_message: '',
    nav_friends: [
        // {id: 1, name: 'Dima', photo: 'https://cdn.flamp.ru/b497df0c38f9d53c49e5c10665326e9c_1920.jpg'},
        // {id: 2, name: 'Ira', photo: 'https://sun9-4.userapi.com/impg/2E9MSQpcUX0r_MdCm_fVrsDcmKxvP50eso14xg/gxwZe7QU8KU.jpg?size=604x604&quality=95&sign=b0cebdf4ac651de7d636d928dd242196&type=album'},
        // {id: 3, name: 'Petr', photo: 'https://i.pinimg.com/originals/39/3d/f1/393df1b167dfe31ee22081e6cafdaf62.jpg'},
    ],
    limit: 10,
    offset: 10,
    loadingOlderMessages: true,
    showScrollIcon: false,
}

export const DialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_SHOW_SCROLL_ICON:
            return {
                ...state,
                showScrollIcon: action.isState
            }

        case SET_OLDER_MESSAGES:
            if (action.olderMessages.next === null) {
                return {
                    ...state,
                    messages: [...action.olderMessages.results, ...state.messages],
                    loadingOlderMessages: false,
                };
            }
        
            const url = new URL(action.olderMessages.next);
            const params = new URLSearchParams(url.search);
            const offset = params.get('offset');
            
            return {
                ...state,
                messages: [...action.olderMessages.results, ...state.messages],
                offset: offset,
            };
        
        case SET_MESSAGES: {
            if (action.messages.next === null) {
                return {
                    ...state,
                    messages: action.messages.results.reverse(),
                    loadingOlderMessages: false,
                };
            }
            
            const url = new URL(action.messages.next);
            const params = new URLSearchParams(url.search);
            const offset = params.get('offset');

            return {
                ...state,
                messages: action.messages.results.reverse(),
                new_message: '',
                offset: offset,
                loadingOlderMessages: true,
            }
        }
    //     case SEND_MESSAGE: {
    //         // let newMessage = {
    //         //     id: 6,
    //         //     user: 'Valera',
    //         //     message: state.new_message,
    //         // };

    //         return {
    //             ...state,
    //             messages: [...state.messages],
    //             new_message: '',
    //         }
    //     }
    //     case UPDATE_MESSAGE: {
    //         console.log(action.message, '----- action')
    //         console.log(state.messages, '------ state.messages')
    //         return {
    //             ...state,
    //             messages: [...state.messages, action.message],
    //             new_message: '',
    //         }
    //     }
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

export const getOlderMessages = (userId) => async (dispatch, getState) => {
    const { limit, offset, loadingOlderMessages } = getState().MessagesPage; // Замените yourReducerName на имя вашего редьюсера
    try {
        if(loadingOlderMessages === true) {
            const response = await messagesAPI.getOlderMessages(userId, limit, offset);
            dispatch(olderMessages(response));
            dispatch(setShowScrollIcon(false))
        }
    } catch (error) {
        console.error("Error while loading older messages:", error);
    }
};

export const sendMessage = (recipient, text, sender, currentTime) => {
    return async (dispach) => {
        const response = await messagesAPI.sendMessage(recipient, text)
        if(response.data.resultCode === 0) {
            // dispach(updateMessageActionCreated({sender: sender, recipient: parseInt(recipient), text: text, timestamp: currentTime}))
            dispach(getMessagesUser(recipient))
        }
    }
}

export const getMessagesUser = (userId) => {
    return async (dispach) => {
        const response = await messagesAPI.getMessagesUser(userId)
        dispach(setMessages(response))
        dispach(setShowScrollIcon(false))
    }
}

export default DialogsReducer

//Вывод стрелочной ф-и без return возможен, если функция только возвращает обьекты, после => нужно обернуть в ()
// export const sendMessageActionCreated = () => ({ type: SEND_MESSAGE })
// export const updateMessageActionCreated = (message) => ({ type: UPDATE_MESSAGE, message: message})
export const setMessages = (messages) => ({type: SET_MESSAGES, messages: messages})
export const olderMessages = (olderMessages) => ({type:SET_OLDER_MESSAGES, olderMessages: olderMessages})
export const setShowScrollIcon = (isState) => ({type: SET_SHOW_SCROLL_ICON, isState: isState})
