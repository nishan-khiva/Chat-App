import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Home from "./pages/Home";

const App = () => {
  const { user } = useContext(AuthContext);

  return user ? <Home /> : <Login />;
};

export default App;