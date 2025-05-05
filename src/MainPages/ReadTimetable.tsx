import { Ellipsis, GraduationCap, Star } from "lucide-react";
import React, { ReactNode } from "react";

export default function ReadTimetable() {
  return (
    <div className="">
      <table className="border-2">
        <thead>
          <th className="border p-2">DAYS/TIME</th>
          <th className="border p-2">8:00AM -- 10:OOAM</th>
          <th className="border p-2">10:00AM -- 12:OOPM</th>
          <th className="border p-2">12:00PM -- 1:OOPM</th>
          <th className="border p-2">2:00PM -- 4:OOPM</th>
          <th className="border p-2">4:00PM -- 6:OOPM</th>
        </thead>
        <tr className="border">
          <td>Monday</td>
          <td><Tdata /></td>
          <td><Tdata /></td>
          <td><Tdata /></td>
          <td><Tdata /></td>
          <td><Tdata /></td>
        </tr>
        <tr className="border">
          <td>Tuesday</td>
          <td><Tdata /></td>
          <td><Tdata /></td>
          <td><Tdata /></td>
          <td><Tdata /></td>
          <td><Tdata /></td>
        </tr>
        <tr className="border">
          <td>Wednessday</td>
          <td><Tdata /></td>
          <td><Tdata /></td>
          <td><Tdata /></td>
          <td><Tdata /></td>
          <td><Tdata /></td>
        </tr>
        <tr className="border">
          <td>Thursday</td>
          <td><Tdata /></td>
          <td><Tdata /></td>
          <td><Tdata /></td>
          <td><Tdata /></td>
          <td><Tdata /></td>
        </tr>
        <tr className="border">
          <td>Friday</td>
          <td><Tdata /></td>
          <td><Tdata /></td>
          <td><Tdata /></td>
          <td><Tdata /></td>
          <td><Tdata /></td>
        </tr>
      </table>
    </div>
  );
}
const Tdata = () => {
  return (
    <div className="border p-2 text-lg text-center flex flex-col gap-2">
      <p className="font-bold flex gap-1 text-blue-600">
        Course 101 : 3 <Star color="red" />
      </p>
      <p className="text-sm text-wrap font-medium text-red-900">
        Introduction to Algorithm
      </p>
      <p className="text-green-800 font-medium text-sm">Lecturer Name</p>
      <p className="text-sky-500-900 font-medium">Venue</p>
      <div className="flex justify-evenly gap-5">
        <button className="bg-green-500 hover:bg-green-600 px-2 py-1 rounded-lg duration-150">
          Update
        </button>
        <button className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded-lg duration-150">
          Delete
        </button>
      </div>
    </div>
  );
};

