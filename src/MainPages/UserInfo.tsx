//   


import { Calendar, House, MailOpen, Phone, Venus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import male from "../assets/male.png";
import female from "../assets/female.png";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  gender: "Male" | "Female";
  age: number;
  dob: string;
  phone: string;
  address: string;
};

export default function UserInfo() {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  // MOCK data for testing
  useEffect(() => {
    const mockUsers: Record<string, User> = {
      user_001: {
        id: "user_001",
        name: "Sarah Kline",
        email: "sarah.kline@example.com",
        role: "Admin",
        gender: "Female",
        age: 28,
        dob: "1996-02-14",
        phone: "+1 555 123 4567",
        address: "123 Main St, Springfield",
      },
      user_002: {
        id: "user_002",
        name: "John Doe",
        email: "john.doe@example.com",
        role: "User",
        gender: "Male",
        age: 32,
        dob: "1992-06-05",
        phone: "+1 555 987 6543",
        address: "456 Maple Ave, Shelbyville",
      },
    };

    // Simulate API delay
    setTimeout(() => {
      const foundUser = userId ? mockUsers[userId] : null;
      setUser(foundUser || null);
    }, 500);
  }, [userId]);
//   useEffect(() => {
//     if (!userId) return;

//     fetch(`/api/users/${userId}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch user details");
//         return res.json();
//       })
//       .then((data) => {
//         setUser(data);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Unable to load user info.");
//       });
//   }, [userId]);

//   if (error) return <div className="text-red-600">{error}</div>;
  if (!user) return <div>Loading user data...</div>;
  return (
    <div className="flex flex-col font-medium gap-5">
      <div className="flex gap-5">
        <img
          src={user.gender === "Female" ? female : male}
          alt="user"
          className="rounded-full size-20"
        />
        <div className="my-auto flex flex-col justify-evenly">
          <p className="font-semibold text-xl">{user.name}</p>
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
            data={`${user.gender}, ${user.age}`}
          />
          <Info icon={<Calendar />} title="Date of Birth" data={user.dob} />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-xl">Contact Information</h1>
          <Info icon={<MailOpen />} title="Email Address" data={user.email} />
          <Info icon={<Phone />} title="Phone" data={user.phone} />
          <Info icon={<House />} title="Mailing Address" data={user.address} />
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
        <p>{title}</p>
        <p>{data}</p>
      </div>
    </div>
  );
};
