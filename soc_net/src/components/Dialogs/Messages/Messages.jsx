import React from 'react';
import style from './Messages.module.css'
import { format, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
// import io from 'socket.io-client';


const MessagesUser = (props) => {
    const isSentByCurrentUser = props.sender === props.userId; // Проверяем, отправитель ли это текущий пользователь

    const messageClasses = isSentByCurrentUser ? `${style.sentMessages} ${style.message} ${style.sent}` : `${style.message} ${style.received}`;

    const parsedDate = parseISO(props.timestamp); // Преобразуем ISO 8601 строку в объект Date
    const formattedDate = format(parsedDate, 'dd MMM yyyy - HH:mm', { locale: ruLocale }); // Форматируем дату


    return (
        <div className={messageClasses}>
            {/* <div>
                <img src='https://cdn.flamp.ru/b497df0c38f9d53c49e5c10665326e9c_1920.jpg' alt='ava' />
            </div> */}
            <div>
            {props.message}
            
                <p className={style.date}>{formattedDate}</p>
            </div>
        </div>
    )
}

export default MessagesUser;
