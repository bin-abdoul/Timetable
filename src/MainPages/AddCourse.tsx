import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddSubjectMutation } from "@/api/requests/subjects.request";
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
    courseCode: "",
    creditUnit: "",
    day: "",
    courseLecturer: "",
    time: "",
    subjectName: "",
    subjectVenue: "",
  });
  const [addCourse] = useAddSubjectMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !courseData.subjectName ||
      !courseData.courseCode ||
      !courseData.courseLecturer ||
      !courseData.time ||
      !courseData.day ||
      !courseData.subjectVenue ||
      !courseData.creditUnit
    ) {
      toast.error("Please fill out all fields!");
      return;
    }

    try {
      await addCourse({
        subjectName: courseData.subjectName,
        courseCode: courseData.courseCode,
        courseLecturer: courseData.courseLecturer,
        subjectVenue: courseData.subjectVenue,
        creditUnit: courseData.creditUnit,
        day: courseData.day,
        time: courseData.time,
      }).unwrap();
      toast.success("Course added successfully!");
    } catch (error) {
      toast.error("Failed to add course");
      console.log("Error adding course:", JSON.stringify(error, null, 2));
    }

    setCourseData({
      subjectName: "",
      courseCode: "",
      courseLecturer: "",
      subjectVenue: "",
      creditUnit: "",
      day: "",
      time: "",
    });
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
            value={courseData.subjectName}
            onChange={(e) =>
              setCourseData({ ...courseData, subjectName: e.target.value })}
          />
          <Inputs
            title="Course Code"
            id="code"
            placeholder="Subject Code"
            value={courseData.courseCode}
            onChange={(e) =>
              setCourseData({ ...courseData, courseCode: e.target.value })}
          />
          <Inputs
            title="Course Lecturer"
            id="lecturer"
            placeholder="Course Lecturer"
            value={courseData.courseLecturer}
            onChange={(e) =>
              setCourseData({ ...courseData, courseLecturer: e.target.value })}
          />
          <SelectField
            label="Venue"
            placeholder="Venue"
            value={courseData.subjectVenue}
            options={["Room A", "Room B", "Room C", "Room D", "Room E"]}
            onChange={(val) =>
              setCourseData({ ...courseData, subjectVenue: val })
            }
          />
          <SelectField
            label="Credit Unit"
            placeholder="Credit Unit"
            value={courseData.creditUnit}
            options={["one", "two", "three", "four"]}
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
                "8:00 -- 10:00",
                "10:00 -- 12:00",
                "12:00 -- 1:00",
                "2:00 -- 4:00",
                "4:00 -- 6:00",
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
  value,
  options,
  onChange,
}: SelectFieldProps) => (
  <div className="flex flex-col w-full">
    <label className="font-medium text-lg">{label}</label>
    <Select onValueChange={onChange} value={value}>
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
