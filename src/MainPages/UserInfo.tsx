import { Calendar, House, MailOpen, Phone, Search, Venus } from "lucide-react";
import React from "react";
import male from "../assets/male.png";
import female from "../assets/female.png";

export default function UserInfo() {
  return (
    <div className="flex flex-col font-medium gap-5">      
      <div className="flex gap-5">
        <img src={female} alt="user" className="rounded-full size-20" />
        <div className="my-auto flex flex-col justify-evenly">
          <p className="font-semibold text-xl">Isabella Rodiguez</p>
          <p className="">Role</p>
          <p>Useremail@gmail.com</p>
        </div>
      </div>
      <div className="mx-5 ">
        <div className="flex flex-col gap-3 mb-3">
          <h1 className="font-bold text-xl">Profile</h1>
          <Info icon={<Venus />} title="Gender" data="Female, 20" />
          <Info icon={<Calendar />} title="Date of Birth" data="09/05/2000" />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-xl">Contact Information</h1>
          <Info icon={<MailOpen/>} title="Email Address" data="useremail@gmail.com"/>
          <Info icon={<Phone/>} title="Phone" data="+1 123 456 789"/>
          <Info icon={<House/>} title="Mailing Address" data="1234 user address"/>
        </div>
      </div>
    </div>
  );
}
const Info = ({
  icon,
  title,
  data,
}: {
  data: string;
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex gap-3">
      <p className="bg-gray-200 p-3 rounded-lg">{icon}</p>
      <div className="">
        <p>{title}</p>
        <p>{data}</p>
      </div>
    </div>
  );
};
