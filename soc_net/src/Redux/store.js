import ProfileReducer from '../reducer/profile-reduser.js';
import DialogsReducer from '../reducer/dialogs-reduser.js';


let store = {
    _state: {
        MessagesPage: {
            users: [
                { id: 1, name: "Dima" },
                { id: 2, name: "Ira" },
                { id: 3, name: "Petr" },
                { id: 4, name: "Vasiliy" },
                { id: 5, name: "Evgeniy" },
                { id: 6, name: "Alex" },
                { id: 7, name: "Yriy" },
            ],
            messages: [
                { id: 1, user: 'Dima', message: "Hi" },
                { id: 2, user: 'Ira', message: "Nice dekaration object" },
                { id: 3, user: 'Dima', message: "How are Your?" },
                { id: 4, user: 'Ira', message: "By" },
            ],
            new_message: 'hi',
            nav_friends: [
                {name: 'Dima', photo: 'https://cdn.flamp.ru/b497df0c38f9d53c49e5c10665326e9c_1920.jpg'},
                {name: 'Ira', photo: 'https://sun9-4.userapi.com/impg/2E9MSQpcUX0r_MdCm_fVrsDcmKxvP50eso14xg/gxwZe7QU8KU.jpg?size=604x604&quality=95&sign=b0cebdf4ac651de7d636d928dd242196&type=album'},
                {name: 'Petr', photo: 'https://i.pinimg.com/originals/39/3d/f1/393df1b167dfe31ee22081e6cafdaf62.jpg'},
            ]
        },
        ProfilePage: {
            post: [
                { id: 1, name: 'Dima', message: "Hy, how are you?", likeCount: 14 },
                { id: 2, name: 'Dima', message: "I not Bot!", likeCount: 76 },
                { id: 3, name: 'Dima', message: "My first post", likeCount: '6k' },
            ],
            newPostText: '',
        }
    },
    _callSubscriber() {
        console.log("state change")
    },

    getState() {
        return this._state
    },
    subscribe(observer) {   // Патерн observer(наблюдатель)
        this._callSubscriber = observer;
    },

    // addPost() {
    //     let newPost = {
    //         id: 5,
    //         name: 'Valera',
    //         message: this._state.ProfilePage.newPostText,
    //         likeCount: 0,
    //     };
    
    //     this._state.ProfilePage.post.push(newPost);
    //     this._state.ProfilePage.newPostText = '' // обнуление строки в state
    //     this._callSubscriber(this._state);
    // },
    // updateTextPost(newPost) {
    //     this._state.ProfilePage.newPostText = newPost;
    //     this._callSubscriber(this._state);
    // },
    dispatch(action) {

        this._state.ProfilePage = ProfileReducer(this._state.ProfilePage, action)
        this._state.MessagesPage = DialogsReducer(this._state.MessagesPage, action)

        this._callSubscriber(this._state);

        // Вынесли все в reducer
        // if (action.type === ADD_POST) {
        //     let newPost = {
        //         id: 5,
        //         name: 'Dima',
        //         message: this._state.ProfilePage.newPostText,
        //         likeCount: 0,
        //     };

        //     this._state.ProfilePage.post.push(newPost);
        //     this._state.ProfilePage.newPostText = '' // обнуление строки в state
        //     this._callSubscriber(this._state);
        // } else if (action.type === UPDATE_POST) {
        //     this._state.ProfilePage.newPostText = action.text;
        //     this._callSubscriber(this._state);
        // } else if (action.type === SEND_MESSAGE) {
        //     let newMessage = {
        //         id: 6,
        //         user: 'Valera',
        //         message: this._state.MessagesPage.new_message,
        //     };

        //     this._state.MessagesPage.messages.push(newMessage);
        //     this._state.MessagesPage.new_message = '' // обнуление строки в state
        //     this._callSubscriber(this._state);
        // } else if (action.type === UPDATE_MESSAGE) {
        //     this._state.MessagesPage.new_message = action.text;
        //     this._callSubscriber(this._state);
        // }
    }

}

export default store;
  