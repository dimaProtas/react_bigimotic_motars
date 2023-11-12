import React from 'react';
import { useParams } from 'react-router-dom';
import style from './SendComponent.module.css';
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import { useEffect } from 'react';

 const SignupSchema = Yup.object().shape({
  textarea: Yup.string()
     .max(250, 'Too Long!')
    //  .required('Required'),
 });

 const socket = new WebSocket('ws://127.0.0.1:8000/ws/private_messages/');


const SendComponent = (props) => {

    return (
        <div className={style.send}>
            {/* <textarea onChange={ onMessageChange } value={ props.newMessage.new_message } ref={ newMessage } placeholder='Yours message...'></textarea>
            <button onClick={ sendMessage }>Send</button> */}
            <MessageForm sendMessage={props.sendMessage} onMessageChange={props.onMessageChange} 
            userId={props.userId} messageState={props.messageState} />
        </div>
    )
}

export const MessageForm = (props) => {
    const { id } = useParams();
    const currentTime = new Date();

    useEffect(() => {
    // Создайте WebSocket и подключитесь к серверу
     const socket = new WebSocket('ws://127.0.0.1:8000/ws/private_messages/');
    
    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = function(event) {
      const data = JSON.parse(event.data)
      const currentTime = new Date();

      // Пример форматирования времени в строку "гггг-мм-дд чч:мм:сс"
      const formattedTime = `${currentTime.getFullYear()}-${(currentTime.getMonth() + 1).toString().padStart(2, '0')}-${currentTime.getDate().toString().padStart(2, '0')} ${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}:${currentTime.getSeconds().toString().padStart(2, '0')}`;

      props.sendMessage(data.recipient_id, data.message, data.sender_id, formattedTime)
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };
    
    return () => {
      // Закройте WebSocket при размонтировании компонента
      socket.close();
    };
  }, [props]);
    
    return (
        <Formik
        initialValues={{ textarea: props.messageState}}
        onSubmit={async (values, {setValues}) => {
            // debugger
          const messageData = {
            text: values.textarea,
            recipient: id,
            sender: props.userId,
            timestamp: currentTime
          };

          const messageString = JSON.stringify(messageData);

          // Отправьте сообщение через WebSocket
          socket.send(messageString)
          console.log(values.textarea, id)
        
          setValues({textarea: ''})
        }}
        validationSchema={SignupSchema}
      >
        {({ errors, touched }) => (
        <Form>
            {errors.textarea && touched.textarea ? (
             <div className={style.errors}>{errors.textarea}</div>
           ) : null}
            <div className={errors.textarea && touched.textarea ? style.errors : null}>
                <Field placeholder='Yours message...' name='textarea' type='textarea' />
            </div>
            
            <div>
                <button type="submit">Send</button>
            </div>
        </Form>
        )}
        </Formik>
    )
}

export default SendComponent;