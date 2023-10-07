import React from "react";
import Dialogs from './Dialogs';
// import { sendMessageActionCreated, updateMessageActionCreated } from '../../reducer/dialogs-reduser.js';
import { connect } from 'react-redux';
import withAuthRedirectComponent from '../../hoc/withAuthRedirectComponent.jsx';
import { compose } from "redux";
import {getFriends} from "../../reducer/users-selectors.js";
import {getMessagesUser, sendMessage, getOlderMessages, setShowScrollIcon} from "../../reducer/dialogs-reduser.js";




class DialogsContainer extends React.Component  {

    // componentDidMount(){       
    //     this.props.getMessagesUser()
    // }

    render() {
        return (
            <Dialogs key={this.props.userId} userId={this.props.userId} getMessagesUser={this.props.getMessagesUser} 
            users={this.props.users} MessagesPage={this.props.MessagesPage} sendMessage={this.props.sendMessage} 
            messageState={this.props.messageState} getOlderMessages={this.props.getOlderMessages} 
            loadingOlderMessages={this.props.loadingOlderMessages} setShowScrollIcon={this.props.setShowScrollIcon} 
            showScrollIcon={this.props.MessagesPage.showScrollIcon} />
        )
    }
}

//     let store = props.store.getState()

//     const sendMessage = () => {
//         // const text = newPostElement.current.value;
//         props.store.dispatch(sendMessageActionCreated());
//         // props.updateTextPost('');  // Обнуляет строку ввода
//     }

//     const onMessageChange = (text) => {
//         props.store.dispatch(updateMessageActionCreated(text));
//     }

//     return (
//         <Dialogs MessagesPage={store.MessagesPage} sendMessage={sendMessage} onMessageChange={onMessageChange} />
//     )
// }


//Используем react-redux
let mapStateToProps = (state) => {
    return {
        MessagesPage: state.MessagesPage,
        users: getFriends(state),
        userId: state.auth.userId,
        messageState: state.MessagesPage.new_message,
        loadingOlderMessages: state.MessagesPage.loadingOlderMessages,
    }
}

// let mapDispatchToProps = (dispatch, state) => {
//     return {
//         sendMessage: () => {
//             dispatch(sendMessageActionCreated());
//         },
//         onMessageChange: (text) => {
//             dispatch(updateMessageActionCreated(text));
//         },
//         getMessagesUser: getMessagesUser
//     }
// }
//сделал HOC компонет который оборачивает компонент и редиректит его
//этот код не нужен, так как теперь оборачивает compose
// let AuthRedirectComponent = withAuthRedirectComponent(Dialogs)


//connect позволяет передавать пропсы в компоненту
//этот код не нужен, так как теперь оборачивает compose
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default compose (
    withAuthRedirectComponent,
    connect(mapStateToProps, {getMessagesUser, sendMessage, getOlderMessages, setShowScrollIcon}),
) (DialogsContainer)