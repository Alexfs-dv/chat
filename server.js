const express = require("express");
const http = require("https://chat-psi-seven-14.vercel.app/p");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.static(__dirname));

io.on("connection", (socket) => {
  console.log("Um usuário conectado: " + socket.id); // Log de conexão

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Um usuário desconectado: " + socket.id); // Log de desconexão
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
