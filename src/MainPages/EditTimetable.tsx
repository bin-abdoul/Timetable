import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export default function EditTimetable() {
  const [formData, setFormData] = React.useState({
    title: "",
    code: "",
    start: "",
    end: "",
    venue: "",
    lecturer: "",
    creditUnit: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", formData);
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="">
        <h1 className="font-bold text-3xl">Create Subject</h1>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <Inputs
            title="Subject title"
            id="title"
            placeholder="Subject title"
            value={formData.title}
            onChange={handleChange}
          />

          <Inputs
            title="Course Code"
            id="code"
            placeholder="Subject Code"
            value={formData.code}
            onChange={handleChange}
          />
          <Inputs
            title="Course Lecturer"
            id="lecturer"
            placeholder="Course Lecturer"
            value={formData.lecturer}
            onChange={handleChange}
          />
          <Inputs
            title="Subject Venue"
            id="venue"
            placeholder="Subject venue"
            value={formData.venue}
            onChange={handleChange}
          />
          <div className="">
            <label htmlFor="" className="font-medium">
              Credit Unit
            </label>
            <Select
              onValueChange={(val) =>
                setFormData({ ...formData, creditUnit: val })
              }
            >
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
            <Inputs
              title="Start Time"
              id="start"
              type="time"
              value={formData.start}
              onChange={handleChange}
            />
            <Inputs
              title="End Time"
              id="end"
              type="time"
              value={formData.end}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="bg-[#5BBAC9] hover:bg-[#48A9B8] duration-100 text-white font-bold text-2xl  p-3 w-[50%] flex justify-center mx-auto my-10 rounded-3xl">
          Add Course
        </button>
      </form>
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
  type,
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-medium text-lg">
        {title}
      </label>
      <input
        id={id}
        type={type}
        name={id}
        value={value}
        onChange={onChange}
        className="bg-[#48a9b84f] block p-2 my-2 rounded-2xl outline-1"
        placeholder={placeholder}
      />
    </div>
  );
};
