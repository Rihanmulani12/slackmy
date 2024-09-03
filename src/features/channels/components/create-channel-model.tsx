
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    
} from "@/components/ui/dialog"
import { usecreateChannelModel } from "../store/use-create-channel-model"
export const CreateChannelModel = () => {

    const [open, setOpen] = usecreateChannelModel()
    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Channel</DialogTitle>
                </DialogHeader>
                <CreateChannelModel />
            </DialogContent>
        </Dialog>
    )
 }