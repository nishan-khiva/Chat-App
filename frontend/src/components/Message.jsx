const Message = ({ msg, own }) => {
  return (
    <div
      className={`flex ${
        own ? "justify-end" : "justify-start"
      } mb-3`}
    >
      <div
        className={`max-w-[300px] px-4 py-2 rounded-xl text-white ${
          own
            ? "bg-green-600"
            : "bg-gray-700"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
};

export default Message;