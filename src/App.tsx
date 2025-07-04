import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./AuthStack/Login";
import SignUp from "./AuthStack/SignUp";
import RoleManagement from "./MainPages/RoleManagement";
import UserInfo from "./MainPages/UserInfo";
import ReadTimetable from "./MainPages/ReadTimetable";
import AdminPage from "./MainPages/AdminPage";
import AddCourse from "./MainPages/AddCourse";


const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    if (payload.exp && payload.exp < currentTime) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  } catch (error) {
    console.error("Invalid token format:", error);
    localStorage.removeItem("token");
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/"; // Redirect to login
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

const AuthRoute = () => {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default function App() {
  
  React.useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <Routes>
    <Route element={<AuthRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<AdminPage />}>
          <Route index element={<ReadTimetable />} />
          <Route path="readtimetable" element={<ReadTimetable />} />
          <Route path="rolemanagement" element={<RoleManagement />} />
          <Route path="addcourse" element={<AddCourse />} />
          <Route path="userinfo/:userId" element={<UserInfo />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}