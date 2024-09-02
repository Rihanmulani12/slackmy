

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirmation";
import { v } from "convex/values";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-upadte-workspace";
import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";


interface PreferenceModelProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;


}


export const PrefrenceModel = ({
  open,
  setOpen,
  initialValue,
}: PreferenceModelProps) => {
  const workspaceId = useWorkspaceId();

  const [confirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This action is irreversible"
  )


  const router = useRouter();
  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
    useRemoveWorkspace();


    const handleRemove = async() => {
        
        const ok = await confirm()

        if(!ok) return;

        deleteWorkspace(
            // @ts-ignore
          { id: workspaceId , name: value},
          {
            onSuccess: () => {
              toast.success("Workspace Removed");
             
            },
            onError: () => {
              toast.error("Failed to Remove Workspace");
            },
          }
        );
      };

  const handleEdit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


  


    updateWorkspace(
      { id: workspaceId, name: value },
      {
        onSuccess: () => {
          setEditOpen(false);
          toast.success("Workspace Updated");
        },
        onError: () => {
          toast.error("Failed to Update Workspace");
        },
      }
    );
  };

  

  return (
    <>
    <confirmDialog/>
    
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <div className="px-5 py-4 bg-white rounded-lg cursor-pointer border hover:bg-gray-50">
                <div className="flex items-center justify-between ">
                  <p className="text-sm font-semibold">Workspace Name</p>
                  <p className="text-sm text-[#1264a3] hover: underline font-semibold">
                    Edit
                  </p>
                </div>
                <p className="text-sm">{value}</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogHeader>
                  <DialogTitle>Remove this workspace</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleEdit}>
                  <Input
                    value={value}
                    disabled={isUpdatingWorkspace}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="Workspace Name e.g. 'Work', 'Personal', 'Home'."
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant={"outline"}
                        disabled={isUpdatingWorkspace}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button disabled={isUpdatingWorkspace}>Save</Button>
                  </DialogFooter>
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Button
            disabled={isDeletingWorkspace}
            onClick={handleRemove}
            className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600 "
          >
            <TrashIcon className="size-4" />
            <p className="text-sm font-semibold"> Delete Workspace</p>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};
