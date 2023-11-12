const socket = new WebSocket("ws://127.0.0.1:8000/ws/private_messages/");

// Открываем соединение WebSocket
socket.addEventListener("open", (event) => {
  console.log("WebSocket connected:", event);
});

// Обработка входящих сообщений
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  // Обработка сообщения, например, отображение его на странице
  console.log("Received message:", message);
});

// Отправка сообщения на сервер через WebSocket
const message = {
  text: "Hello, WebSocket!",
  recipient: 123, // Замените на ID получателя
};
socket.send(JSON.stringify(message));
