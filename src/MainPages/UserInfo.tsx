import { Calendar, House, MailOpen, Phone, Venus } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";
import male from "../assets/male.png";
import female from "../assets/female.png";
import { useUserInfoQuery } from "@/api/requests/auth.request";

export default function UserInfo() {
  const { userId } = useParams();

  const { data: user, isLoading, error } = useUserInfoQuery(userId!);

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();  
    
    return age;
  };

  if (!userId) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-500">No user ID provided in the URL</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div>Loading user data...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-500">
          <p>Error loading user data</p>
          <pre className="text-sm mt-2">{JSON.stringify(error, null, 2)}</pre>
        </div>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div>No user data found</div>
      </div>
    );
  }
  const fullName = `${user.firstName} ${user.surName}`;
  const age = calculateAge(user.dob);
  const formattedDob = user.dob;
  return (
    <div className="flex flex-col font-medium gap-5">
      <div className="flex gap-5">
        <img
          src={user.gender === "female" ? female : male}
          alt="user"
          className="rounded-full size-20"
        />
        <div className="my-auto flex flex-col justify-evenly">
          <p className="font-semibold text-xl">{fullName}</p>
          <p className="capitalize">{user.role}</p>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="mx-5">
        <div className="flex flex-col gap-3 mb-3">
          <h1 className="font-bold text-xl">Profile</h1>
          <Info
            icon={<Venus />}
            title="Gender"
            data={`${user.gender}, ${age} years old`}
          />
          <Info icon={<Calendar />} title="Date of Birth" data={formattedDob} />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-xl">Contact Information</h1>
          <Info icon={<MailOpen />} title="Email Address" data={user.email} />
          <Info icon={<Phone />} title="Phone" data={user.phoneNumber} />
          <Info icon={<House />} title="Mailing Address" data={user.homeAddress} />
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
      <div>
        <p className="font-medium text-gray-600">{title}</p>
        <p className="text-gray-900">{data}</p>
      </div>
    </div>
  );
};