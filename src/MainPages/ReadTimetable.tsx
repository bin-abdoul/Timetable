import {
  useViewTimetableQuery,
  useDeleteSubjectMutation,
  useUpdateSubjectMutation,
} from "@/api/requests/subjects.request";
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
  "8:00 -- 10:00",
  "10:00 -- 12:00",
  "12:00 -- 1:00",
  "2:00 -- 4:00",
  "4:00 -- 6:00",
];

interface TimetableEntry {
  day: string;
  time: string;
  _id: string;
  courseCode: string;
  subjectName: string;
  courseLecturer: string;
  subjectVenue: string;
  creditUnit: string;
}

interface UpdateSubjectPayload {
  id: string;
  courseCode: string;
  subjectName: string;
  courseLecturer: string;
}

export default function ReadTimetable() {

  const { data: timetableData, isLoading, error } = useViewTimetableQuery();
  const [updateSubject] = useUpdateSubjectMutation();
  const [deleteSubject] = useDeleteSubjectMutation();
  

  const getCellData = (day: string, timeSlot: string): TimetableEntry | null => {
    if (!timetableData || !Array.isArray(timetableData)) return null;
    return timetableData.find(
      (entry: TimetableEntry) => entry.day === day && entry.time === timeSlot
    ) || null;
  };

  if (isLoading) return <div>Loading timetable...</div>;
  if (error) return <div>Error loading timetable</div>;

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
                    {cell ? (
                      <Tdata
                        {...cell}
                        // userRole={userRole}
                        updateSubject={updateSubject}
                        deleteSubject={deleteSubject}
                      />
                    ) : (
                      <EmptyCell />
                    )}
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

interface TdataProps {
  _id: string;
  courseCode: string;
  subjectName: string;
  courseLecturer: string;
  subjectVenue: string;
  creditUnit: string;
  // userRole: string;
  day: string;
  time: string;
  updateSubject: (data: UpdateSubjectPayload) => { unwrap: () => Promise<any> };
  deleteSubject: (id: string) => { unwrap: () => Promise<any> };
}

const Tdata = ({
  _id,
  courseCode,
  subjectName,
  courseLecturer,
  subjectVenue,
  creditUnit,
  // userRole,
  updateSubject,
  deleteSubject,
}: TdataProps) => {
  const [code, setCode] = useState(courseCode);
  const [title, setTitle] = useState(subjectName);
  const [teacher, setTeacher] = useState(courseLecturer);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  useEffect(() => {
    setCode(courseCode);
    setTitle(subjectName);
    setTeacher(courseLecturer);
  }, [courseCode, subjectName, courseLecturer]);

  const handleUpdate = async () => {
    try {
      await updateSubject({
        id: _id,
        courseCode: code,
        subjectName: title,
        courseLecturer: teacher,
      }).unwrap();

      toast.success("Course updated successfully!");
      setIsUpdateOpen(false);
    } catch (error) {
      toast.error("Failed to update course");
      console.error("Update error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSubject(_id).unwrap();
      toast.success("Course deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete course");
      console.log("Delete error:", error);
    }
  };

  return (
    <div className="border p-2 text-lg text-center flex flex-col gap-2">
      <p className="font-bold flex gap-1 text-blue-600 justify-center">
        {courseCode} : {creditUnit}
        <Star color="orange" fill="red" size={20} />
      </p>
      <p className="text-sm font-medium text-red-900">{subjectName}</p>
      <p className="text-green-800 font-medium text-sm">{courseLecturer}</p>
      <p className="text-sky-500 font-medium text-sm">{subjectVenue}</p>
      {/* {userRole !== 'user' && ( */}
      <div className="flex justify-evenly gap-2">
        <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
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
              <Button variant="outline" onClick={() => setIsUpdateOpen(false)}>
                Cancel
              </Button>
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
      {/* )} */}
    </div>
  );
};

const EmptyCell = () => (
  <div className="border p-2 text-gray-400 text-sm text-center">No Class</div>
);