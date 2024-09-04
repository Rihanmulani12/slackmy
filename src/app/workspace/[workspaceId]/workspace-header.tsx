import { useState } from "react";
import { InviteModel } from "./invite-model";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ListFilter, SquarePen } from "lucide-react";
import { PrefrenceModel } from "./preferences-model";


interface WorkspaceHeaderProps {
  workspace: Doc<"workspaces">;
  isAdmin: boolean;
}

export const WorkspaceHeader = ({
  workspace,
  isAdmin,
}: WorkspaceHeaderProps) => {


  const [prefrenceOpen , setPrefrenceOpen] = useState(false)
  const [inviteOpen , setInviteOpen] = useState(false)
  return (

    <>
    <InviteModel
      open={inviteOpen}
      setOpen={setInviteOpen}
      name = {workspace.name}
      joinCode = {workspace.joinCode}
      
    />

    <PrefrenceModel open={prefrenceOpen} setOpen={setPrefrenceOpen} initialValue={workspace.name}/>
    <div className="flex items-center justify-between px-4 h-[49px]gap-0.5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="transparent"
            className="font-semibold text-lg w-auto p-1.5 overflow-hidden "
            size="sm"
          >
            <span className="truncate">{workspace.name}</span>
            <ChevronDown className="size-4 ml-1 shrink-0" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" align="start" className="w-64">
          <DropdownMenuItem className="cursor-pointer capitalize">
            <div className="size-9 relative bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
              {workspace.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col items-start ">
              <p className="font-bold">{workspace.name}</p>
              <p className="text-xs text-muted-foreground">Active workspace</p>
            </div>
          </DropdownMenuItem>

          {isAdmin && (
            <>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer py-2"
                onClick={() => setInviteOpen(true)}
              >
                Invite people to code test
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer py-2"
                onClick={() => setPrefrenceOpen(true)}
              >
                Perferences
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center gap-0.5">
        <Hint label="Filter conversations" side="bottom">
        <Button variant="transparent" size="iconSm">
             <ListFilter className="size-4"/>
        </Button>
        </Hint>

        <Hint label="New DMs" side="bottom" >
        <Button variant="transparent" size="iconSm">
          <SquarePen className="size-4" />
        </Button>
        </Hint>
      </div>
    </div>
    </>
  );
};
