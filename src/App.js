import Home from "./pages/privateRoutes/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/privateRoutes/profile/Profile";
import Register from "./pages/register/Register";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./pages/privateRoutes/PrivateRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserData } from "./features/auth/authSlice";
import ErrorRoute from "./pages/ErrorRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const foundUser = JSON.parse(localStorage.getItem("user"));
    if (foundUser) {
      dispatch(getUserData(foundUser.userId));
    }
  });

  return (
    <Routes>
      <Route path="/register" element={<Register />} /> />
      <Route path="/login" element={<Login />} />
      <PrivateRoute path="/" element={<Home />} />
      <PrivateRoute path="/profile/:username" element={<Profile />} />
      <Route path="*" element={<ErrorRoute />} />
    </Routes>
  );
}

export default App;
