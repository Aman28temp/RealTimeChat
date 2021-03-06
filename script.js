const socket = io('http://localhost:3000');

const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('What is Your Name');
socket.emit('new-user', name);
appendMessage("You Joined");
console.log(name);

socket.on('chat-message', data => appendMessage(`${data.user}: ${data.message}`));

socket.on('user-connected', name => appendMessage(`${name} joined`));
socket.on('user-disconnected', name => appendMessage(`${name} left`));

messageForm.addEventListener('submit', e => {
    e.preventDefault();

    const message = messageInput.value;
    socket.emit('send-chat-message', message);
    appendMessage(`You: ${message}`);

    messageInput.value = '';
})

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}
