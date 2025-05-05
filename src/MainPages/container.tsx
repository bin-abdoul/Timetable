import { Separator } from "@/components/ui/separator";
import { Nav } from "./SideNav";
import { UserRound } from "lucide-react";

export default function Container() {
  return (
    <div className="sticky top-0 bg-white ">
      <div className="h-18 flex justify-end mx-6 p-5 my-auto">
        <Nav horizontal="1" />
      </div>

      <Separator />
    </div>
  );
}
