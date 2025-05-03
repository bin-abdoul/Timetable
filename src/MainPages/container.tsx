import { Separator } from "@/components/ui/separator";
import React from "react";
import RoleManagement from "./RoleManagement";

export default function Container() {
  return (
    <div className="sticky top-0 bg-white">
      <ul className="list-none flex gap-5 p-6 justify-end">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
      <Separator />
    </div>
  );
}
