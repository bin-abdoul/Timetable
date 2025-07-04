import { Button } from "@/components/ui/button";
import { Search, UserRound, UserCheck, Users, X, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useUsersListQuery,
  useUpdateUserRoleMutation,
} from "@/api/requests/auth.request";

interface User {
  _id: string;
  firstName: string;
  surName: string;
  email: string;
  phoneNumber: string;
  role: "Admin" | "User" | "Moderator";
  gender: string;
  homeAddress: string;
  dob: string;
}

export default function RoleManagement() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data: membersList, isLoading, error } = useUsersListQuery();
  const [updateUserRole, { isLoading: isUpdating }] =
    useUpdateUserRoleMutation();

  console.log("useUsersListQuery state:", {
    data: membersList,
    isLoading,
    error,
  });

  const [selectedMember, setSelectedMember] = React.useState<{
    id: string;
    name: string;
    currentRole: string;
  } | null>(null);

  const filteredMembers = React.useMemo(() => {
    if (!membersList) return [];
    return membersList.filter(
      (member: User) =>
        member.firstName.toLowerCase().includes(searchQuery) ||
        member.surName.toLowerCase().includes(searchQuery) ||
        member.role.toLowerCase().includes(searchQuery)
    );
  }, [membersList, searchQuery]);

  const handleRoleUpdate = async (newRole: "User" | "Moderator") => {
    if (!selectedMember) return;

    if (selectedMember.currentRole === "Admin") {
      toast.error("Cannot change role of Admin.");
      return;
    }

    try {
      await updateUserRole({
        userId: selectedMember.id,
        newRole: newRole,
      }).unwrap();

      toast.success(`Role updated to ${newRole} successfully!`);
      setSelectedMember(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update role");
    }
  };

  const handleChangeRoleClick = (member: User) => {
    if (member.role === "Admin") {
      toast.warning("The Admin role cannot be changed.");
      return;
    }
    setSelectedMember({
      id: member._id,
      name: `${member.firstName} ${member.surName}`,
      currentRole: member.role,
    });
  };
  if (isLoading) return <div>Loading Users...</div>;
  if (error) {
    console.error("Error loading users:", error);
    return (
      <div>
        <p>Error loading Users</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }
  if (!membersList || membersList.length === 0) {
    console.log("No users found");
    return <div>No users found</div>;
  }

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

      {filteredMembers.map((member: any) => (
        <Member
          key={member._id}
          id={member._id}
          name={`${member.firstName} ${member.surName}`}
          role={member.role}
          onChangeRole={() => handleChangeRoleClick(member)}
        />
      ))}

      {/* {selectedMember !== null && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Change Role for {selectedMember.name}
            </h2>
            <div className="flex flex-col gap-3">
              {selectedMember.currentRole !== "Moderator" && (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50"
                  onClick={() => handleRoleUpdate("Moderator")}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Moderator"}
                </button>
              )}
              {selectedMember.currentRole !== "User" && (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg disabled:opacity-50"
                  onClick={() => handleRoleUpdate("User")}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "User"}
                </button>
              )}
              <button
                className="text-red-500 mt-4 disabled:opacity-50"
                onClick={() => setSelectedMember(null)}
                disabled={isUpdating}
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
} */}
      {selectedMember !== null && (
        <Dialog
          open={selectedMember !== null}
          onOpenChange={() => setSelectedMember(null)}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Change Role for {selectedMember.name}
              </DialogTitle>
              <DialogDescription>
                Select a new role for this user. Current role:
                <Badge variant="secondary" className="ml-2">
                  {selectedMember.currentRole}
                </Badge>
              </DialogDescription>
            </DialogHeader>

            <Separator />

            <div className="flex flex-col gap-3">
              {selectedMember.currentRole !== "Moderator" && (
                <Button
                  variant="default"
                  className="w-full justify-start gap-2 h-12"
                  onClick={() => handleRoleUpdate("Moderator")}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Users className="h-4 w-4" />
                  )}
                  {isUpdating ? "Updating..." : "Assign as Moderator"}
                </Button>
              )}

              {selectedMember.currentRole !== "User" && (
                <Button
                  variant="default"
                  className="w-full justify-start gap-2 h-12 bg-green-600 hover:bg-green-700"
                  onClick={() => handleRoleUpdate("User")}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <UserCheck className="h-4 w-4" />
                  )}
                  {isUpdating ? "Updating..." : "Assign as User"}
                </Button>
              )}
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setSelectedMember(null)}
                disabled={isUpdating}
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
    console.log("Navigating with ID:", id);
    navigate(`/dashboard/userinfo/${id}`);
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
      <Button
        variant={"outline"}
        onClick={onChangeRole}
        disabled={role === "Admin"}
        className={role === "Admin" ? "opacity-50 cursor-not-allowed" : ""}
      >
        {role === "Admin" ? "Admin" : "Change role"}
      </Button>
    </div>
  );
};
