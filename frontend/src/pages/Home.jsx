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

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, []);

  return (
    <div className="h-screen bg-gray-900 flex overflow-hidden">
      {/* Mobile Sidebar Hide */}
      <div
        className={`${
          selectedUser
            ? "hidden md:block"
            : "block"
        } w-full md:w-[35%] lg:w-[30%]`}
      >
        <Sidebar
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          onlineUsers={onlineUsers}
        />
      </div>

      {/* Chat Section */}
      <div
        className={`${
          !selectedUser
            ? "hidden md:flex"
            : "flex"
        } flex-1`}
      >
        <ChatBox
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          user={user}
        />
      </div>
    </div>
  );
};

export default Home;