const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname)); // Serve arquivos estáticos

io.on("connection", (socket) => {
  console.log("Um usuário conectado");

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message); // Envia a mensagem para todos os usuários conectados
  });

  socket.on("disconnect", () => {
    console.log("Um usuário desconectado");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
