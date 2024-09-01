"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import {toast} from 'sonner'

import {
  Dialog,
  DialogContent,
 
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { usecreateWorkspaceModel } from "../store/use-create-workspace-model";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { Id } from '../../../../convex/_generated/dataModel';



export const CreateWorkspaceModel = () => {

  const router = useRouter();
  const [open, setOpen] = usecreateWorkspaceModel();
  const [name , setName] = useState('')



  const { mutate , isPending, error, isSuccess, } = useCreateWorkspace();

  const handleclose = () => {
    setOpen(false);
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutate({name }, {
      onSuccess(id) {
        toast.success('Workspace Created')
        router.push(`/workspace/${id}`)
        handleclose()
      },
      
    })
       
   
    
  };
  return (
    <Dialog open={open} onOpenChange={handleclose}>
      <DialogContent>
        <DialogHeader>Add a workspace</DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            onChange={(e)=> setName(e.target.value)}
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace Name e.g . 'Work', 'Personal', 'Home' "
          ></Input>

          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
