import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Box, LogOut, User } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
};
const getUserName = () => {
  const userData = localStorage.getItem("userData");
  if (userData) {
    try {
      const user = JSON.parse(userData);
      return `${user.firstName} ${user.lastName || user.surName || ""}`.trim();
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  const tokenUser = getUserFromToken();
  if (tokenUser?.email) {
    return tokenUser.email.split("@")[0];
  }

  return "User";
};
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  localStorage.removeItem("refreshToken");
  window.location.href = "/";
};

export default function SideNav() {
  return (
    <div className="sticky top-0 left-0 h-screen flex flex-col">
      <div className="">
        <div className="flex p-5 gap-2">
          <Box size={28} />
          <h1 className="text-2xl font-bold text-center">My Timetable</h1>
        </div>
        <Separator />
      </div>
      <div className="flex-1">
        <Nav />
      </div>
    </div>
  );
}
export const Nav = ({ horizontal }: { horizontal?: string }) => {
  const userName = getUserName();
  
  if (horizontal) {
    return (
      <div className="">
        <nav className="justify-between gap-5 flex list-none">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User size={28} />
            <span className="font-medium text-xl truncate">{userName}</span>
          </div>

          <div className="gap-5 flex">
            <Link to="readtimetable">
              <Mybtn pathname="readtimetable" unique="1" text="Read Timetable" />
            </Link>
            <Link to="addcourse">
              <Mybtn pathname="addcourse" text="Add Course" />
            </Link>
            <Link to="rolemanagement">
              <Mybtn pathname="rolemanagement" text="Role Management" />
            </Link>
          </div>

          <Button
            onClick={logout}
            variant="outline"
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </nav>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-5 mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User size={28} />
          <span className="font-medium text-xl truncate">{userName}</span>
        </div>
      </div>

      <nav className="flex-1 px-5">
        <div className="flex flex-col gap-5">
          <Link to="readtimetable">
            <Mybtn pathname="readtimetable" unique="1" text="Read Timetable" />
          </Link>
          <Link to="addcourse">
            <Mybtn pathname="addcourse" text="Add Course" />
          </Link>
          <Link to="rolemanagement">
            <Mybtn pathname="rolemanagement" text="Role Management" />
          </Link>
        </div>
      </nav>

      <div className="p-5 pt-0">
        <Separator className="mb-4" />
        <Button
          onClick={logout}
          variant="outline"
          className="w-full flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </div>
  );
};

const Mybtn = ({
  pathname,
  text,
  unique,
}: {
  pathname: string;
  text: string;
  unique?: string;
}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const path2 = location.pathname;

  return (
    <div className="">
      <Button
        variant={"outline"}
        className={`${
          path == pathname || (path2 == "/dashboard" && unique)
            ? "bg-[#5BBAC9] hover:bg-[#5BBAC9] hover:text-white text-white"
            : "bg-gray-100 hover:bg-gray-200"
        } font-medium w-full`}
      >
        {text}
      </Button>
    </div>
  );
};
