import { Search } from "lucide-react";
import React from "react";
import male from "../assets/male.png";
import female from "../assets/female.png";

export default function RoleManagement() {
  return (
    <div className="flex flex-col gap-5 overflow-y-auto h-screen">
      <h1 className="text-3xl font-bold">Members</h1>
      <div className="flex bg-[#48a9b84f] gap-4 rounded-lg p-1 px-4">
        <Search color="gray" size={32} className="my-auto"/>
        <input
          type="search"
          placeholder="Search Members"
          className="text-lg p-2 outline-0"
        />
      </div>
      <Member gender="f" name="Sarah Kline" role="Admin"/>
      <Member gender="m" name="John Smith" role="Admin"/>
      <Member gender="f" name="Emily Davis" role="moderator"/>
      <Member gender="m" name="Michael Johnson" role="User"/>
      <Member gender="m" name="David Brown" role="User"/>
      <Member gender="m" name="David Brown" role="User"/>
      <Member gender="m" name="David Brown" role="User"/>
    </div>
  );
}

const Member = ({gender, name, role}:{gender: string, name: string, role: string}) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-5">
        {gender == "m" && <img alt="" src={male} className="rounded-full size-16" />}
        {gender == "f" && <img alt="" src={female} className="rounded-full size-16" />}
        <div className="flex flex-col justify-around">
          <h1 className="font-semibold text-xl">{name}</h1>
          <span className="text-gray-600">{role}</span>
        </div>
      </div>
      <button className="bg-[#5BBAC9] hover:bg-[#48A9B8] duration-150 rounded-2xl px-6 h-12 my-auto">Change role</button>
    </div>
  );
};
