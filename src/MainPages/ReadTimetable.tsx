import { Ellipsis, GraduationCap } from "lucide-react";
import React from "react";

export default function ReadTimetable() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-medium">Monday</h1>
      <div className="bg-[#48a9b84f] flex justify-between p-2 rounded-2xl">
        <div className="flex gap-5">
          <div className="bg-gray-200 m-auto p-3 rounded-lg">
            <GraduationCap />
          </div>
          <div className="">
            <p>Course 101</p>
            <p>startTime--stopTime</p>
          </div>
        </div>
        <div></div>
        <p className="hover:bg-[#7db0b881] rounded-full duration-150 p-2">
          <Ellipsis className=" " />
        </p>
      </div>
    </div>
  );
}
const Course = ({
  course,
  start,
  stop,
}: {
  course: string;
  start: string;
  stop: string;
}) => {
  return (
    <div className="bg-[#48a9b84f] flex justify-between p-2 rounded-2xl">
      <div className="flex gap-5">
        <div className="bg-gray-200 m-auto p-3 rounded-lg">
          <GraduationCap />
        </div>
        <div className="">
          <p>{course}</p>
          <p>startTime--stopTime</p>
        </div>
      </div>
      <div></div>
      <p className="hover:bg-[#7db0b881] rounded-full duration-150 p-2">
        <Ellipsis className=" " />
      </p>
    </div>
  );
};
