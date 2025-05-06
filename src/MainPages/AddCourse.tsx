import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

export default function AddCourse() {
  const [courseData, setCourseData] = React.useState({
    title: "",
    code: "",
    time: "",
    day: "",
    venue: "",
    lecturer: "",
    creditUnit: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, code, time, day, venue, lecturer, creditUnit } = courseData;
    if (
      !title ||
      !code ||
      !time ||
      !day ||
      !venue ||
      !lecturer ||
      !creditUnit
    ) {
      toast.error("Please fill out all fields!");
      return;
    }

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });

      if (!res.ok) throw new Error("Failed to add course");

      toast.success("Course added successfully!");
      setCourseData({
        title: "",
        code: "",
        time: "",
        day: "",
        venue: "",
        lecturer: "",
        creditUnit: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Error adding course.");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold text-3xl">Create Course</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <Inputs
            title="Course title"
            id="title"
            placeholder="Subject title"
            value={courseData.title}
            onChange={handleChange}
          />
          <Inputs
            title="Course Code"
            id="code"
            placeholder="Subject Code"
            value={courseData.code}
            onChange={handleChange}
          />
          <Inputs
            title="Course Lecturer"
            id="lecturer"
            placeholder="Course Lecturer"
            value={courseData.lecturer}
            onChange={handleChange}
          />
          <SelectField
            label="Venue"
            placeholder="Venue"
            value={courseData.venue}
            options={["Room A", "Room B", "Room C", "Room D", "Room E"]}
            onChange={(val) => setCourseData({ ...courseData, venue: val })}
          />
          <SelectField
            label="Credit Unit"
            placeholder="Credit Unit"
            value={courseData.creditUnit}
            options={["1", "2", "3", "4"]}
            onChange={(val) =>
              setCourseData({ ...courseData, creditUnit: val })
            }
          />
          <div className="flex gap-5">
            <SelectField
              label="Day"
              placeholder="Day"
              value={courseData.day}
              options={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}
              onChange={(val) => setCourseData({ ...courseData, day: val })}
            />
            <SelectField
              label="Time"
              placeholder="Time"
              value={courseData.time}
              options={[
                "8:00AM -- 10:00AM",
                "10:00AM -- 12:00PM",
                "12:00PM -- 1:00PM",
                "2:00PM -- 4:00PM",
                "4:00PM -- 6:00PM",
              ]}
              onChange={(val) => setCourseData({ ...courseData, time: val })}
            />
          </div>
        </div>
        <Button
          variant={"outline"}
          type="submit"
          className="bg-[#5BBAC9] hover:bg-[#48A9B8] duration-100 hover:text-white text-white font-bold text-2xl p-6 flex justify-center mx-auto mt-10"
        >
          Add Course
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
}

type InputFieldProps = {
  title: string;
  id: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Inputs = ({
  title,
  id,
  placeholder,
  type = "text",
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-medium text-lg">
        {title}
      </label>
      <Input
        id={id}
        type={type}
        name={id}
        value={value}
        onChange={onChange}
        className="bg-[#48a9b84f]"
        placeholder={placeholder}
      />
    </div>
  );
};

type SelectFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
};

const SelectField = ({
  label,
  placeholder,
  options,
  onChange,
}: SelectFieldProps) => (
  <div className="flex flex-col w-full">
    <label className="font-medium text-lg">{label}</label>
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-full bg-[#48a9b84f] mt-2">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
