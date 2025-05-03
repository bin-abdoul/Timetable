import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export default function EditTimetable() {
  return (
    <div className="flex flex-col gap-5">
      <div className="">
        <h1 className="font-bold text-3xl">Create Subject</h1>
      </div>
      <form action="">
        <div className="grid grid-cols-2 gap-5">
          <Inputs title="Subject Name" id="name" placeholder="Subject Name" />

          <Inputs title="Course Code" id="code" placeholder="Subject Code" />
          <Inputs
            title="Course Lecturer"
            id="credit"
            placeholder="Course Lecturer"
          />
          <Inputs title="Subject Venue" id="type" placeholder="Subject venue" />
          <div className="">
            <label htmlFor="" className="font-medium">
              Credit Unit
            </label>
            <Select>
              <SelectTrigger className="w-[100%] bg-[#48a9b84f] mt-2">
                <SelectValue placeholder="Credit Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">One</SelectItem>
                <SelectItem value="2">Two</SelectItem>
                <SelectItem value="3">Three</SelectItem>
                <SelectItem value="4">Four</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-5 justify-evenly">
            <Inputs title="Start Time" id="start" type="time" />
            <Inputs title="End Time" id="end" type="time" />
          </div>
        </div>
          <button className="bg-[#5BBAC9] hover:bg-[#48A9B8] duration-100 text-white font-bold text-2xl  p-3 w-[50%] flex justify-center mx-auto my-10 rounded-3xl">Add Course</button>
      </form>
    </div>
  );
}
const Inputs = ({
  title,
  id,
  placeholder,
  type,
}: {
  title: string;
  id: string;
  placeholder?: string;
  type?: string;
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-medium text-lg">
        {title}
      </label>
      <input
        id={id}
        type={type}
        name={id}
        className="bg-[#48a9b84f] block p-2 my-2 rounded-2xl outline-1"
        placeholder={placeholder}
      />
    </div>
  );
};
