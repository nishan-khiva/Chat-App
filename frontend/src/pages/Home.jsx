import { useContext, useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";

import { AuthContext } from "../context/AuthContext";

import { socket } from "../socket/socket";

const Home = () => {
  const { user } = useContext(AuthContext);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [onlineUsers, setOnlineUsers] =
    useState([]);

  useEffect(() => {
    socket.emit("join", user._id);

    socket.on(
      "onlineUsers",
      (users) => {
        setOnlineUsers(users);
      }
    );

    return () => {
      socket.off("onlineUsers");
    };
  }, []);

  return (
    <div className="h-screen flex">
      <Sidebar
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        onlineUsers={onlineUsers}
      />

      <ChatBox
        selectedUser={selectedUser}
        user={user}
      />
    </div>
  );
};

export default Home;