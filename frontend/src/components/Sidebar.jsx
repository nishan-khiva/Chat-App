import { useEffect, useState } from "react";
import API from "../services/api";

const Sidebar = ({
  selectedUser,
  setSelectedUser,
  onlineUsers,
}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await API.get(
      "/messages/users"
    );

    setUsers(data);
  };

  return (
    <div className="w-[30%] bg-gray-800 border-r border-gray-700 overflow-y-auto">
      <div className="p-4 text-white text-2xl border-b border-gray-700">
        Chats
      </div>

      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => setSelectedUser(user)}
          className={`p-4 cursor-pointer flex justify-between items-center hover:bg-gray-700 ${
            selectedUser?._id === user._id
              ? "bg-gray-700"
              : ""
          }`}
        >
          <div className="text-white">
            {user.name}
          </div>

          {onlineUsers.includes(user._id) && (
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;