import { Button } from "@/components/ui/button";
import { Search, UserRound } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RoleManagement() {
  const [searchQuery, setSearchQuery] = React.useState(""); // ✅ useState from import above
  // will be replaced by backend fetch
  const [membersList, setMembersList] = React.useState([
    { id: "user_001", name: "Muhammad Jamil", role: "Admin" },
    { id: "user_002", name: "Ahmad Kabir", role: "Moderator" },
    { id: "user_003", name: "John Doe", role: "User" },
  ]);

  const [selectedMemberIndex, setSelectedMemberIndex] = React.useState<
    number | null
  >(null);

  // Handling role update
  const selectedRole = (newRole: string) => {
    if (selectedMemberIndex === null) return;
    const selectedUser = membersList[selectedMemberIndex];

    if (selectedUser.role === "Admin") {
      toast.error("Cannot change role of Admin.");
      return;
    }

    const updated = [...membersList];
    updated[selectedMemberIndex].role = newRole;
    setMembersList(updated);
    setSelectedMemberIndex(null);

    fetch(`/api/users/${selectedUser.id}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: newRole }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update role");
        toast.success("Role updated successfully");
      })
      .catch(() => {
        toast.error("Failed to update role. Please try again.");
      });
  };

  const handleChangeRoleClick = (index: number) => {
    if (membersList[index].role === "Admin") {
      toast.warning("The Admin role cannot be changed.");
      return;
    }
    setSelectedMemberIndex(index);
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold">Members</h1>
      <div className="flex bg-[#48a9b84f] gap-4 rounded-lg px-4">
        <Search color="gray" size={32} className="my-auto" />
        <input
          type="search"
          placeholder="Search Member"
          className="text-lg p-2 outline-0 bg-transparent w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
      </div>

      {membersList
        .filter(
          (member) =>
            member.name.toLowerCase().includes(searchQuery) ||
            member.role.toLowerCase().includes(searchQuery)
        )
        .map((member, index) => (
          <Member
            key={index}
            id={member.id}
            name={member.name}
            role={member.role}
            onChangeRole={() => handleChangeRoleClick(index)}
          />
        ))}

      {selectedMemberIndex !== null && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Change Role</h2>
            <div className="flex flex-col gap-3">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                onClick={() => selectedRole("Moderator")}
              >
                Moderator
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg"
                onClick={() => selectedRole("User")}
              >
                User
              </button>
              <button
                className="text-red-500 mt-4"
                onClick={() => setSelectedMemberIndex(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

type MemberProps = {
  id: string;
  name: string;
  role: string;
  onChangeRole: () => void;
};

const Member = ({ id, name, role, onChangeRole }: MemberProps) => {
  const navigate = useNavigate();

  const goToUserInfo = () => {
    navigate(`/userinfo/${id}`);
  };

  return (
    <div className="flex justify-between hover:bg-[#48a9b834] p-2 rounded-2xl items-center">
      <div className="flex gap-5 cursor-pointer" onClick={goToUserInfo}>
        <div className="rounded-full size-12 bg-gray-200 flex">
          <UserRound size={32} className="m-auto" />
        </div>
        <div className="flex flex-col justify-around">
          <h1 className="font-semibold text-xl">{name}</h1>
          <span className="text-gray-600">{role}</span>
        </div>
      </div>
      <Button variant={"outline"} onClick={onChangeRole}>
        Change role
      </Button>
    </div>
  );
};
