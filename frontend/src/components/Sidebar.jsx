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
    <div className="h-screen bg-gray-800 border-r border-gray-700 overflow-y-auto">
      <div className="p-4 text-white text-2xl font-semibold border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
        Chats
      </div>

      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => setSelectedUser(user)}
          className={`p-4 cursor-pointer flex justify-between items-center hover:bg-gray-700 transition ${
            selectedUser?._id === user._id
              ? "bg-gray-700"
              : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
              {user.name.charAt(0)}
            </div>

            <div className="text-white text-sm md:text-base">
              {user.name}
            </div>
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