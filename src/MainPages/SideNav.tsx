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
      <Nav />
    </div>
  );
}
export const Nav = ({ horizontal }: { horizontal?: string })=>{
  return(
    <div className="">
        <nav
          className={`${horizontal ? "": " flex-col   p-5 h-screen"} gap-5 flex list-none `}
        >
          <Link to="ReadTimetable">
            <Mybtn pathname="ReadTimetable" unique="1" text="Read Timetable" />
          </Link>
          <Link to="RoleManagement">
            <Mybtn pathname="RoleManagement" text="Role Management" />
          </Link>
          <Link to="AddCourse">
            <Mybtn pathname="AddCourse" text="Add Course" />
          </Link>
        </nav>
      </div>
  )
}


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
  const path = location.pathname.split("/")[1];

  return (
    <button
      className={`${
        path == pathname || (path == "" && unique)
          ? "bg-[#5BBAC9] text-white"
          : "bg-gray-100 hover:bg-gray-200"
      } p-2 rounded-2xl font-medium  w-[100%]`}
    >
      {text}
    </button>
  );
};
