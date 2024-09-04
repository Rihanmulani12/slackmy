import { Button } from "@/components/ui/button"
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { CopyIcon, RefreshCcw } from "lucide-react"
import { useNewJoinCode } from "@/features/workspaces/api/use-new-joinCode"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"


interface InviteModelProps {
    open: boolean
    setOpen: (open: boolean) => void
    name: string
    joinCode: string
}

export const InviteModel = ({
    open,
    setOpen,
    name,
    joinCode
}: InviteModelProps) => {
    const workspaceId = useWorkspaceId()

  
    const { mutate, isPending } = useNewJoinCode()

    const handleCopy = () => {
        const inviteLink = `${window.location.origin}/join/${workspaceId}`
        navigator.clipboard.writeText(inviteLink)
            .then(() => toast.success('Invite link copied to clipboard'))
            .catch(() => toast.error('Failed to copy invite link'));
    }

    const handleNewCode = async () => {

        

        mutate({ workspaceId }, {
            onSuccess: () => {
                toast.success('New join code generated');
                // You may want to refresh the join code state here
            },
            onError: () => {
                toast.error('Failed to generate new join code');
            }
        });
    }

    return (
        <>
 
      
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Invite people to {name}
                        <DialogDescription>
                            Use the join code below to invite people to your workspace
                        </DialogDescription>
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-y-4 items-center justify-center py-10 ">
                    <p className="text-4xl font-bold tracking-widest uppercase">{joinCode}</p>
                    <Button
                        onClick={handleCopy}
                        variant={"ghost"}
                        size={"sm"}
                    >
                        Copy Link
                        <CopyIcon className="ml-2 w-4 h-4" />
                    </Button>
                </div>
                <div className="flex items-center justify-between w-full">
                    <Button
                        onClick={handleNewCode}
                        variant={"outline"}
                        disabled={isPending} // Disable if pending
                    >
                        {isPending ? "Generating..." : "New Code"}
                        <RefreshCcw className="ml-2 w-4 h-4" />
                    </Button>
                    <DialogClose asChild>
                        <Button>
                            Close
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
        </>
    )
}
