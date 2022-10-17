import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AppChat from "./pages/AppChat";
import User from "./pages/User";
import ChangeProfile from "./pages/ChangeProfile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserCurrent } from "./redux/sliceCurrentUser";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserCurrent(localStorage.getItem("Token")));
  }, [dispatch]);
  const { user } = useSelector((state) => state.user);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/appChat"
            element={user ? <AppChat /> : <Login />}
          ></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/changeProfile" element={<ChangeProfile />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
