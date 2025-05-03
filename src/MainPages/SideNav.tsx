import { Separator } from "@/components/ui/separator";
import { Box } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function SideNav() {
  return (
    <div className="sticky top-0 left-0  h-screen">
      <div className="">
        <div className="flex p-5 gap-2">
          <Box size={28} />
          <h1 className="text-2xl font-bold text-center">My Timetable</h1>
        </div>
        <Separator />
      </div>
      <div className="">
        <nav className="list-none flex flex-col gap-5  p-5 h-screen">
          <Link to="AdminDashboard">
          <Mybtn pathname="AdminDashboard" text="Admin Dashboard" />
          </Link>
          <Link to="RoleManagement">
          <Mybtn pathname="RoleManagement" text="Role Management" />
          </Link>
          <Link to="EditTimetable">
          <Mybtn pathname="EditTimetable" text="Edit Timetable" />
          </Link>
          <Link to="AddUser">
            <Mybtn pathname="AddUser" text="Add User" />
          </Link>
          <Link to="ReadTimetable">
          <Mybtn pathname="ReadTimetable" text="Read Timetable" />
          </Link>
        </nav>
      </div>
    </div>
  );
}

const Mybtn = ({ pathname, text }: { pathname: string; text: string }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  return (
    <button
      className={`${
        path == pathname
          ? "bg-[#5BBAC9] text-white"
          : "bg-gray-100 hover:bg-gray-200"
      } p-2 rounded-2xl font-medium  w-[100%]`}
    >
      {text}
    </button>
  );
};
