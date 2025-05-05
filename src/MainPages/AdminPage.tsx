import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import Container from "./container";

export default function AdminPage() {
  return (
    <div className="flex overflow-hidden">
      <div className="hidden lg:block w-[20%]">
        <SideNav />
      </div>
      <div className="w-[80%] bg-white h-screen overflow-y-auto">
        <Container />
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
