import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      setLoading(true);

      const { data } = await API.post(
        "/auth/login",
        form
      );

      sessionStorage.setItem(
        "token",
        data.token
      );

      sessionStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setUser(data.user);

      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-[350px] shadow-lg">
        <h1 className="text-white text-3xl mb-6 text-center font-bold">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 rounded bg-gray-700 text-white outline-none"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white outline-none"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full p-3 rounded text-white font-semibold transition-all duration-300 ${
            loading
              ? "bg-green-700 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;