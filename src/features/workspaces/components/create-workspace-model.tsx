"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  import { usecreateWorkspaceModel } from '../store/use-create-workspace-model';


  export const CreateWorkspaceModel = ()=>{
    const [open , setOpen] = usecreateWorkspaceModel()

    const handleclose = () =>{
        setOpen(false)
    }
    return (
        <Dialog open={open} onOpenChange={handleclose} >
            <DialogContent>
                <DialogHeader>
                    Add a workspace 

                </DialogHeader>
            </DialogContent>

        </Dialog>
    )
  }