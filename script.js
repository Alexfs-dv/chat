document.addEventListener("DOMContentLoaded", () => {
  const messagesArea = document.getElementById("messagesArea");
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");
  const deleteAllButton = document.getElementById("deleteAllButton");

  // Array para armazenar mensagens
  let messages = [];

  // Renderizar mensagens
  function renderMessages() {
    messagesArea.innerHTML = messages
      .map((msg) => `<div class="message">${msg}</div>`)
      .join("");
  }

  // Enviar mensagem
  sendButton.addEventListener("click", () => {
    const messageText = messageInput.value.trim();
    if (messageText) {
      socket.emit("sendMessage", messageText);
      messageInput.value = "";
    }
  });

  // Receber mensagem
  socket.on("receiveMessage", (message) => {
    messages.push(message);
    renderMessages();
    messagesArea.scrollTop = messagesArea.scrollHeight;
  });

  // Excluir todas as mensagens
  deleteAllButton.addEventListener("click", () => {
    messages = [];
    renderMessages();
  });
});
