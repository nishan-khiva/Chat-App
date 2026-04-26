import { useEffect, useState } from "react";

import API from "../services/api";

import Message from "./Message";

import { socket } from "../socket/socket";

const ChatBox = ({
  selectedUser,
  user,
}) => {
  const [messages, setMessages] = useState([]);

  const [text, setText] = useState("");

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  useEffect(() => {
    socket.on(
      "receiveMessage",
      (message) => {
        setMessages((prev) => [
          ...prev,
          message,
        ]);
      }
    );

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const fetchMessages = async () => {
    const { data } = await API.get(
      `/messages/${selectedUser._id}`
    );

    setMessages(data);
  };

  const sendMessage = () => {
    if (!text) return;

    const messageData = {
      senderId: user._id,
      receiverId: selectedUser._id,
      text,
    };

    socket.emit(
      "sendMessage",
      messageData
    );

    setMessages((prev) => [
      ...prev,
      messageData,
    ]);

    setText("");
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 bg-gray-900 flex items-center justify-center text-gray-400 text-2xl">
        Select a chat
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <div className="p-4 border-b border-gray-700 text-white text-xl">
        {selectedUser.name}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <Message
            key={index}
            msg={msg}
            own={
              msg.senderId === user._id
            }
          />
        ))}
      </div>

      <div className="p-4 flex gap-3">
        <input
          type="text"
          placeholder="Type message..."
          className="flex-1 p-3 rounded bg-gray-800 text-white"
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
        />

        <button
          onClick={sendMessage}
          className="bg-green-500 px-6 rounded text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;