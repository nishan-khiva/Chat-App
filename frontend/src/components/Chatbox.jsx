import { useEffect, useState } from "react";

import API from "../services/api";

import Message from "./Message";

import { socket } from "../socket/socket";
import EmojiPicker from "emoji-picker-react";

const ChatBox = ({
  selectedUser,
  setSelectedUser,
  user,
}) => {
  const [messages, setMessages] = useState([]);
  const [showEmoji, setShowEmoji] =
    useState(false);

  const [text, setText] = useState("");

  const handleEmoji = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

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
    if (!text.trim()) return;

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
      <div className="flex-1 bg-gray-900 flex items-center justify-center text-gray-400 text-xl md:text-2xl">
        Select a chat
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900 h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 text-white flex items-center gap-3">
        {/* Mobile Back Button */}
        <button
          onClick={() =>
            setSelectedUser(null)
          }
          className="md:hidden text-xl"
        >
          ←
        </button>

        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
          {selectedUser.name.charAt(0)}
        </div>

        <div className="text-lg font-semibold">
          {selectedUser.name}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4">
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

      {/* Input */}
      <div className="p-3 md:p-4 flex items-center gap-2 md:gap-3 relative border-t border-gray-700">
        <button
          onClick={() =>
            setShowEmoji(!showEmoji)
          }
          className="text-2xl"
        >
          😊
        </button>

        {showEmoji && (
          <div className="absolute bottom-16 left-2 z-50 scale-90 md:scale-100 origin-bottom-left">
            <EmojiPicker
              onEmojiClick={handleEmoji}
            />
          </div>
        )}

        <input
          type="text"
          placeholder="Type message..."
          className="flex-1 p-3 rounded-lg bg-gray-800 text-white outline-none text-sm md:text-base"
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            sendMessage()
          }
        />

        <button
          onClick={sendMessage}
          className="bg-green-500 hover:bg-green-600 transition px-4 md:px-6 py-3 rounded-lg text-white text-sm md:text-base"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;