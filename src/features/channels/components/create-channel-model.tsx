import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription, // Import the DialogDescription
} from "@/components/ui/dialog";
import { useCreateChannelModel } from "../store/use-create-channel-model";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateChannel } from "../api/use-create-channel";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { toast } from "sonner";


export const CreateChannelModel = () => {

    const router = useRouter()

    const workspaceId = useWorkspaceId()
    const [open, setOpen] = useCreateChannelModel();

    const {mutate, isPending} = useCreateChannel()

    const [name , setName] = useState('')

    const handleclose = () => {
        setName('')
        setOpen(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const value = e.target.value.replace(/\s+/g, '-').toLowerCase()
       setName(value)
    } 

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate({name , workspaceId},
            {onSuccess : (id) =>{
                toast.success('Channel Created')
                 router.push(`/workspace/${workspaceId}/channel/${id}`)
                 handleclose()
            },

            onError : () => {
                toast.error('Failed to Create Channel')
            }
        
        },
            

        )
    }

    return (
        <Dialog open={open} onOpenChange={handleclose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Channel</DialogTitle>
                    <DialogDescription>
                        Please provide the necessary details to create a new channel.
                    </DialogDescription>
                </DialogHeader>
               <form onSubmit={handleSubmit} className="space-y-4 ">
                <Input 
                value={name}
                disabled={isPending}
                required
                autoFocus
                minLength={3}
                maxLength={80}
                onChange={handleChange}
                placeholder="e.g. plan-budget"


                
                />

                <div className="flex justify-end">
                    <Button disabled={isPending} >
                       Create 
                    </Button>
                </div>
               </form>
            </DialogContent>
        </Dialog>
    );
};
