document.addEventListener("DOMContentLoaded", () => {
  const messagesArea = document.getElementById("messagesArea");
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");
  const deleteAllButton = document.getElementById("deleteAllButton");

  // Load messages from localStorage
  let messages = JSON.parse(localStorage.getItem("messages") || "[]");
  renderMessages();

  // Send message function
  function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText) {
      messages.push(messageText);
      localStorage.setItem("messages", JSON.stringify(messages));
      messageInput.value = "";
      renderMessages();
      // Scroll to bottom
      messagesArea.scrollTop = messagesArea.scrollHeight;
    }
  }

  // Render messages function
  function renderMessages() {
    messagesArea.innerHTML = messages
      .map((msg) => `<div class="message">${msg}</div>`)
      .join("");
  }

  // Event Listeners
  sendButton.addEventListener("click", sendMessage);

  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  deleteAllButton.addEventListener("click", () => {
    messages = [];
    localStorage.setItem("messages", JSON.stringify(messages));
    renderMessages();
  });
});
