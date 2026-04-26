let onlineUsers = {};

export const socketSetup = (io) => {
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // JOIN
    socket.on("join", (userId) => {
      onlineUsers[userId] = socket.id;

      io.emit(
        "onlineUsers",
        Object.keys(onlineUsers)
      );
    });

    // SEND MESSAGE
    socket.on("sendMessage", (data) => {
      const receiverSocketId =
        onlineUsers[data.receiverId];

      if (receiverSocketId) {
        io.to(receiverSocketId).emit(
          "receiveMessage",
          data
        );
      }
    });

    // TYPING
    socket.on("typing", ({ senderId, receiverId }) => {
      const receiverSocketId =
        onlineUsers[receiverId];

      if (receiverSocketId) {
        io.to(receiverSocketId).emit(
          "showTyping",
          senderId
        );
      }
    });

    // STOP TYPING
    socket.on(
      "stopTyping",
      ({ senderId, receiverId }) => {
        const receiverSocketId =
          onlineUsers[receiverId];

        if (receiverSocketId) {
          io.to(receiverSocketId).emit(
            "hideTyping",
            senderId
          );
        }
      }
    );

    // DISCONNECT
    socket.on("disconnect", () => {
      for (let key in onlineUsers) {
        if (onlineUsers[key] === socket.id) {
          delete onlineUsers[key];
        }
      }

      io.emit(
        "onlineUsers",
        Object.keys(onlineUsers)
      );

      console.log("User Disconnected");
    });
  });
};