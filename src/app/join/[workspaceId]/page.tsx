"use client";
import { useRouter } from "next/navigation";
import VerificationInput from "react-verification-input";
import Image from "next/image";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { useJoin } from "@/features/workspaces/api/use-join";
import { toast } from "sonner";
import { useEffect, useMemo } from "react";





const JoinPage = () => {

    const router = useRouter()

    const workspaceId = useWorkspaceId()
    
    const {mutate , isPending} = useJoin()

    const {data , isLoading} = useGetWorkspaceInfo({id:workspaceId})
    
    const isMember = useMemo(()=>{
        data?.isMember
    },[data?.isMember])

    useEffect(()=>{
        if(isMember){
            router.replace(`/workspace/${workspaceId}`)
        } 
    
    },[isMember,router,workspaceId])


    const handleComplete = (value : string) => {
        mutate({workspaceId , joinCode : value},
           {
            onSuccess : (id) => {
                router.replace(`/workspace/${id}`)
                toast.success('Workspace Joined')
            },
            onError : () => {
                toast.error('Failed to Join Workspace')

            }
           },
        )
       
    }

    if(isLoading){
        return (
            <div className="h-full flex  items-center justify-center bg-white p-8 rounded-lg shadow-md">
                <Loader className="animate-spin size-6 text-muted-foreground"/>
            </div>
        )
    }

    
    return (
        <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md">
           <Image src="/vercel.svg" width={60} height={60} alt=" Logo"/>
           <div className="flex flex-col gap-y-4 items-center justify-center max-w-md ">
            <div className="flex flex-col gap-y-2 items-center justify-center">
                <h1>
                    Join {data?.name}
                </h1>
                <p className="text-md text-muted-foreground">
                    Enter a join code
                </p>

            </div>
            <VerificationInput
            onComplete={handleComplete}
            length={6}
             classNames={{
                container : cn("flex gap-x-2", isPending && "opacity-50 cursor-not-allowed"),
                character: "uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-3xl text-center text-lg  font-medium text-gray-500",
                characterInactive : "bg-muted",
                characterSelected : "bg-white text-black",
                characterFilled : "bg-white text-black",
             }}
             autoFocus
            />

           </div>
           <div className="flex gap-x-4 ">
            <Button
            size={"lg"}
            variant={"outline"}
            asChild
            
            >
                <Link href="/">
                  Back to Home
                </Link>

            </Button>

           </div>
        </div>
    )
}

export default JoinPage;