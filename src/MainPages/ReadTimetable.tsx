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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
// replace by backend fetch for testing
const timetableData = [
  {
    day: "Monday",
    timeSlot: "8:00AM -- 10:00AM",
    courseCode: "CSC101",
    courseTitle: "Intro to Algorithms",
    lecturer: "Dr. Smith",
    venue: "Room A",
    creditUnit: "2",
    id: "id",
  },
  {
    day: "Monday",
    timeSlot: "4:00PM -- 6:00PM",
    courseCode: "GST111",
    courseTitle: "Intro to English I",
    lecturer: "Dr. Smith",
    venue: "Room A",
    creditUnit: "2",
    id: "id",
  },
  {
    day: "Wednesday",
    timeSlot: "10:00AM -- 12:00PM",
    courseCode: "MTH102",
    courseTitle: "Linear Algebra",
    lecturer: "Prof. Jane",
    venue: "Room B",
    creditUnit: "1",
    id: "id",
  },
  {
    day: "Tuesday",
    timeSlot: "12:00PM -- 1:00PM",
    courseCode: "PHY104",
    courseTitle: "Mechanics",
    lecturer: "Dr. Ray",
    venue: "Room C",
    creditUnit: "3",
    id: "id",
  },
  {
    day: "Friday",
    timeSlot: "8:00AM -- 10:00AM",
    courseCode: "PHY104",
    courseTitle: "Mechanics",
    lecturer: "Dr. Ray",
    venue: "Room C",
    creditUnit: "4",
    id: "id",
  },
  {
    day: "Thursday",
    timeSlot: "2:00PM -- 4:00PM",
    courseCode: "PHY104",
    courseTitle: "Mechanics",
    lecturer: "Dr. Ray",
    venue: "Room C",
    creditUnit: "4",
    id: "id",
  },
];
export default function ReadTimetable() {
  //replaced with timetable for testing purpose
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    fetch("/api/timetable")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load timetable");
          toast.error("Failed to load timetable");
          return res.json();
        }
      })
      // .then((data) => {
      //   setTimetable(data);
      //   toast.success("Timetable loaded successfully!");
      // })
      .catch((err) => {
        console.error(err);
        toast.error("Error loading timetable.");
      });
  }, []);

  const getCellData = (day: string, timeSlot: string) => {
    // timetableData used instead of timetable
    return timetableData.find(
      (entry: any) => entry.day === day && entry.timeSlot === timeSlot
    );
  };

  return (
    <div>
      <table className="border-2 w-full">
        <thead>
          <tr>
            <th className="border p-2 w-[80px]">DAYS/TIME</th>
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
      <ToastContainer />
    </div>
  );
}

const Tdata = ({
  id,
  courseCode,
  courseTitle,
  lecturer,
  venue,
  creditUnit,
}: {
  id: string; // must be included from MongoDB _id
  courseCode: string;
  courseTitle: string;
  lecturer: string;
  venue: string;
  creditUnit: string;
}) => {
  const [code, setCode] = useState(courseCode);
  const [title, setTitle] = useState(courseTitle);
  const [teacher, setTeacher] = useState(lecturer);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`https://your-api-url.com/timetable/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseCode: code,
          courseTitle: title,
          lecturer: teacher,
        }),
      });
      if (res.ok) {
        toast.success("Updated successfully");
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating data");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`https://your-api-url.com/timetable/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Deleted successfully");
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting data");
    }
  };

  return (
    <div className="border p-2 text-lg text-center flex flex-col gap-2">
      <p className="font-bold flex gap-1 text-blue-600 justify-center">
        {courseCode} : {creditUnit}
        <Star color="orange" fill="red" size={20} />
      </p>
      <p className="text-sm font-medium text-red-900">{courseTitle}</p>
      <p className="text-green-800 font-medium text-sm">{lecturer}</p>
      <p className="text-sky-500 font-medium text-sm">{venue}</p>

      <div className="flex justify-evenly gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-sm">
              Update
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Course</DialogTitle>
              <DialogDescription>
                Update course information and save changes.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="code" className="text-right">
                  Code
                </label>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right">
                  Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="lecturer" className="text-right">
                  Lecturer
                </label>
                <Input
                  id="lecturer"
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUpdate}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="text-sm">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently remove the course from your timetable.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Confirm Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
const EmptyCell = () => (
  <div className="border p-2 text-gray-400 text-sm text-center">No Class</div>
);
