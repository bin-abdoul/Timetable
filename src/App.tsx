import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./AuthStack/Login";
import SignUp from "./AuthStack/SignUp";
import RoleManagement from "./MainPages/RoleManagement";
import UserInfo from "./MainPages/UserInfo";
import ReadTimetable from "./MainPages/ReadTimetable";
import AdminPage from "./MainPages/AdminPage";
import AddCourse from "./MainPages/AddCourse";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      
      <Route path="/" element={<AdminPage />}>
        <Route index element={<ReadTimetable />} />
        <Route path="RoleManagement" element={<RoleManagement />} />
        <Route path="AddCourse" element={<AddCourse />} />
        <Route path="/userInfo/:userId" element={<UserInfo />} />
        <Route path="ReadTimetable" element={<ReadTimetable />} />
      </Route>
    </Routes>
  );
}
