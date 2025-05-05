import { Search, User, UserCircle, UserCircle2, UserRound } from "lucide-react";
import React from "react";
import male from "../assets/male.png";
import female from "../assets/female.png";
import { useNavigate } from "react-router-dom";

export default function RoleManagement() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold">Members</h1>
      <div className="flex bg-[#48a9b84f] gap-4 rounded-lg px-4">
        <Search color="gray" size={32} className="my-auto" />
        <input
          type="search"
          placeholder="Search Member"
          className="text-lg p-2 outline-0"
        />
      </div>
      <Member name="Sarah Kline" role="Admin" />
      <Member name="John Smith" role="Admin" />
      <Member name="Emily Davis" role="moderator" />
      <Member name="Michael Johnson" role="User" />
      <Member name="David Brown" role="User" />
      <Member name="David Brown" role="User" />
      <Member name="David Brown" role="User" />
    </div>
  );
}

const Member = ({ name, role }: { name: string; role: string }) => {
  const navigate = useNavigate()
  function goToUserInfo() {
   navigate("/userInfo") 
  }
  return (
    <div className="flex justify-between hover:bg-[#48a9b84f] p-2 rounded-2xl">
      <div className="flex gap-5" onClick={goToUserInfo}>
        <div className="rounded-full size-16 bg-gray-200 flex">
          <UserRound size={32} className="m-auto" />
        </div>
        <div className="flex flex-col justify-around">
          <h1 className="font-semibold text-xl">{name}</h1>
          <span className="text-gray-600">{role}</span>
        </div>
      </div>
      <button className="bg-[#5BBAC9] hover:bg-[#48A9B8] duration-150 rounded-2xl px-6 h-12 my-auto">
        Change role
      </button>
    </div>
  );
};
