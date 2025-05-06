import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./AuthStack/Login";
import SignUp from "./AuthStack/SignUp";
import RoleManagement from "./MainPages/RoleManagement";
import UserInfo from "./MainPages/UserInfo";
import ReadTimetable from "./MainPages/ReadTimetable";
import AdminPage from "./MainPages/AdminPage";
import AddCourse from "./MainPages/AddCourse";

// Dummy auth function (replace with real logic using context/JWT/localStorage)
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // check if token exists
};

// PrivateRoute: blocks unauthenticated access
const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

// AuthRoute: prevents access to login/signup if already authenticated
const AuthRoute = () => {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default function App() {
  return (
    <Routes>

      {/* Auth Stack */}
      <Route element={<AuthRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* Protected Main Pages */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<AdminPage />}>
          <Route index element={<ReadTimetable />} />
          <Route path="readtimetable" element={<ReadTimetable />} />
          <Route path="rolemanagement" element={<RoleManagement />} />
          <Route path="addcourse" element={<AddCourse />} />
          <Route path="userinfo/:userId" element={<UserInfo />} />
        </Route>
      </Route>

      {/* Fallback for unmatched routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
