import { Separator } from "@/components/ui/separator";
import { Nav } from "./SideNav";
import { UserRound } from "lucide-react";

export default function Container() {
  return (
    <div className="sticky top-0 bg-white ">
      <div className="h-18 flex w-full p-5 my-auto">
        <div className="lg:hidden w-full">
          <Nav horizontal="1" />
        </div>
      </div>

      <Separator />
    </div>
  );
}
