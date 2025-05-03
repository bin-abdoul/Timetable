import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./AuthStack/Login";
import SignUp from "./AuthStack/SignUp";
import AdminPage from "./MainPages/AdminPage";
import RoleManagement from "./MainPages/RoleManagement";
import EditTimetable from "./MainPages/EditTimetable";
import AddUser from "./MainPages/AddUser";
import ReadTimetable from "./MainPages/ReadTimetable";
import AdminDashboard from "./MainPages/AdminDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      
      {/* AdminPage with nested routes */}
      <Route path="/" element={<AdminPage />}>
        <Route index element={<AdminDashboard />} />
        <Route path="AdminDashboard" element={<AdminDashboard />} />
        <Route path="RoleManagement" element={<RoleManagement />} />
        <Route path="EditTimetable" element={<EditTimetable />} />
        <Route path="AddUser" element={<AddUser />} />
        <Route path="ReadTimetable" element={<ReadTimetable />} />
      </Route>
    </Routes>
  );
}
