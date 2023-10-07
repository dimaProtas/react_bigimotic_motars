import React from 'react';
import s from './Dialogs.module.css';
import MessagesUser from './Messages/Messages.jsx';
import DialogItem from './DialogsItem/DialogItem.jsx';
import SendComponent from './SendComponent/SendComponent.jsx'
import Scroll from './Scroll/ScrollCompanent.jsx';


const Dialogs = (props) => {
    const sendMessages = props.MessagesPage.messages.length > 0 ? (
        props.MessagesPage.messages.map(m => (
            <MessagesUser
                message={m.text}
                key={m.id}
                timestamp={m.timestamp}
                sender={m.sender}
                recipient={m.recipient}
                userId={props.userId}
            />
        ))
    ) : (
        <p className={s.notMessages}>У вас пока нет сообщений!</p>
    );
    const dialogElements = props.users.map(u => <DialogItem getMessagesUser={props.getMessagesUser} id={u.id} key={u.id} name={u.name} photo={u.photos.small} />) //вынес map, но можно и внутри писать
    return (
        <div>
            <Scroll getOlderMessages={props.getOlderMessages} setShowScrollIcon={props.setShowScrollIcon} 
            showScrollIcon={props.showScrollIcon} />
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogElements}
                </div>
                <div className={s.messages}>
                    {sendMessages}
                </div>
            </div>
            <div>
                <SendComponent newMessage={props.MessagesPage} store={props.store} sendMessage={props.sendMessage} 
                onMessageChange={props.onMessageChange} userId={props.userId} messageState={props.messageState} 
                key={props.userId} />
            </div>
        </div>
    )
}

export default Dialogs;