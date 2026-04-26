const Message = ({ msg, own }) => {
  return (
    <div
      className={`flex ${
        own
          ? "justify-end"
          : "justify-start"
      } mb-3`}
    >
      <div
        className={`max-w-[80%] md:max-w-[60%] px-4 py-2 rounded-2xl text-white break-words text-sm md:text-base ${
          own
            ? "bg-green-600 rounded-br-sm"
            : "bg-gray-700 rounded-bl-sm"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
};

export default Message;