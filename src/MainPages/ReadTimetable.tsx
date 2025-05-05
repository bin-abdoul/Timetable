import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = [
  "8:00AM -- 10:00AM",
  "10:00AM -- 12:00PM",
  "12:00PM -- 1:00PM",
  "2:00PM -- 4:00PM",
  "4:00PM -- 6:00PM",
];
const timetableData = [
  {
    day: "Monday",
    timeSlot: "8:00AM -- 10:00AM",
    courseCode: "CSC101",
    courseTitle: "Intro to Algorithms",
    lecturer: "Dr. Smith",
    venue: "Room A",
  },
  {
    day: "Monday",
    timeSlot: "10:00AM -- 12:00PM",
    courseCode: "MTH102",
    courseTitle: "Linear Algebra",
    lecturer: "Prof. Jane",
    venue: "Room B",
  },
  {
    day: "Tuesday",
    timeSlot: "2:00PM -- 4:00PM",
    courseCode: "PHY104",
    courseTitle: "Mechanics",
    lecturer: "Dr. Ray",
    venue: "Room C",
  },
  {
    day: "Friday",
    timeSlot: "8:00AM -- 10:00AM",
    courseCode: "PHY104",
    courseTitle: "Mechanics",
    lecturer: "Dr. Ray",
    venue: "Room C",
  },
];
export default function ReadTimetable() {
  const [timetable, setTimetable] = useState([]);

  // useEffect(() => {
  //   fetch("/api/timetable")
  //     .then((res) => res.json())
  //     .then((data) => setTimetable(data))
  //     .catch((err) => console.error("Failed to fetch timetable:", err));
  // }, []);

  const getCellData = (day: string, timeSlot: string) => {
    return timetableData.find(
      (entry: any) => entry.day === day && entry.timeSlot === timeSlot
    );
  };

  return (
    <div>
      <table className="border-2 w-full table-fixed">
        <thead>
          <tr>
            <th className="border p-2 w-[60px]">DAYS/TIME</th>
            {times.map((time, id) => (
              <th key={id} className="border p-2 w-[100px]">
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day, dayId) => (
            <tr key={dayId} className="border">
              <td className="border p-2 font-semibold w-[100px]">{day}</td>
              {times.map((time, timeId) => {
                const cell = getCellData(day, time);
                return (
                  <td
                    key={timeId}
                    className="w-[100px] border align-top overflow-y-auto"
                  >
                    {cell ? <Tdata {...cell} /> : <EmptyCell />}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Tdata = ({
  courseCode,
  courseTitle,
  lecturer,
  venue,
}: {
  courseCode: string;
  courseTitle: string;
  lecturer: string;
  venue: string;
}) => {
  return (
    <div className="border p-2 text-lg text-center flex flex-col gap-2">
      <p className="font-bold flex gap-1 text-blue-600 justify-center">
        {courseCode} <Star color="orange" fill="red" size={20} />
      </p>
      <p className="text-sm font-medium text-red-900">{courseTitle}</p>
      <p className="text-green-800 font-medium text-sm">{lecturer}</p>
      <p className="text-sky-500 font-medium text-sm">{venue}</p>
      <div className="flex">
        <button className="px-2 py-1 rounded-lg duration-150">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Update</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Name
                  </label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="username" className="text-right">
                    Username
                  </label>
                  <Input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </button>
        <Button variant="destructive">
          <AlertDialog>
            <AlertDialogTrigger>Delete</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  subject from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Button>
      </div>
    </div>
  );
};

const EmptyCell = () => (
  <div className="border p-2 text-gray-400 text-sm text-center">No Class</div>
);
