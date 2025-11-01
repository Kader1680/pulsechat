import { io } from "socket.io-client";

const socket = io("ws://localhost:4000", {
  auth: { token: "YOUR_JWT_TOKEN" }
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  socket.emit("join", "general", (ok) => {
    console.log("Joined:", ok);

    socket.emit("send_message", {
      room: "general",
      text: "Hello from Node client"
    });
  });
});

socket.on("new_message", (msg) => {
  console.log("NEW MESSAGE:", msg);
});
