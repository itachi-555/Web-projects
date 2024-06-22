const socket = io();
let selectedUserId = null;

socket.on('connect', () => {
  const username = prompt('Enter your username');
  socket.emit('setUsername', username);
  document.getElementById('contact-name').textContent = username;
});

socket.on('userList', (users) => {
  const userList = document.getElementById('users');
  userList.innerHTML = '';
  for (let id in users) {
    if (id !== socket.id) {
      const userItem = document.createElement('div');
      userItem.className = 'user-item';
      userItem.textContent = users[id];
      userItem.dataset.id = id;
      userItem.onclick = () => {
        selectedUserId = id;
        document.getElementById('contact-name').textContent = users[id];
        document.getElementById('chat').innerHTML = ''; // Clear chat history when user is selected
      };
      userList.appendChild(userItem);
    }
  }
});
function ScrollToButtom(container) {
  container.scrollTop = container.scrollHeight;
}
socket.on('privateMessage', (data) => {
  if (selectedUserId) {
    const { message, from } = data;
    const messages = document.getElementById('chat');
    const messageItem = document.createElement('div');
    messageItem.className = 'contact-message';
    messageItem.textContent = `${from}: ${message}`;
    messages.appendChild(messageItem);
    ScrollToButtom(messages);
  }
});

document.getElementById('send').onclick = () => {
  const messageInput = document.getElementById('message');
  const message = messageInput.value;
  if (!message || message === '') {
    return;
  }
  const messages = document.getElementById('chat');
  if (selectedUserId) {
    socket.emit('privateMessage', { receiverId: selectedUserId, message });
    const messageItem = document.createElement('div');
    messageItem.className = 'user-message';
    messageItem.textContent = `You: ${message}`;
    messages.appendChild(messageItem);
  } else {
    const messageItem = document.createElement('div');
    messageItem.className = 'user-message';
    messageItem.textContent = `You: ${message}`;
    messages.appendChild(messageItem);
  }
  ScrollToButtom(messages);
  messageInput.value = '';
};
document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') { // Check if the "Enter" key was pressed
    const sendButton = document.getElementById('send');
    if (sendButton) {
      sendButton.onclick(); // Trigger the button's click event
    }
  }
});