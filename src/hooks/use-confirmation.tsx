

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
}  from "@/components/ui/dialog";

export const useConfirm = (
    title: string,
    message: string,

): [any,any] => {
    const [promise, setPromise] = useState<{
        resolve: (value: boolean) => void;
    } | null>(null);

    const confirm = () =>
        new Promise((resolve, reject) => {
            setPromise({ resolve });
        });

    const handleClose = () => {
       
            setPromise(null);
        }

        const handleCancel = () => {
            Promise?.resolve(false);


    };

    const handleConfirm = () => {
        Promise?.resolve(true);
    };


    const confirmDialog = () => {  
         <Dialog>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>

                    <DialogDescription>{message}</DialogDescription>
                    <DialogFooter className="pt-2">
                        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                        <Button variant="outline" onClick={handleConfirm}>Confirm</Button>

                    </DialogFooter>

                </DialogHeader>


            </DialogContent>
         </Dialog>
    }


    
    

    return [ confirmDialog,  confirm];
};


