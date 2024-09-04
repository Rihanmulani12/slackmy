'use client'
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useMemo , useEffect} from "react";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { useCreateChannelModel } from '../../../features/channels/store/use-create-channel-model';
import { Loader, TriangleAlert, } from "lucide-react";

import { useCurrentMember } from '../../../features/members/api/use-current-member';







const WorkspaceIdPage = () =>{
    const  router = useRouter()
    const workspaceId = useWorkspaceId()
    const [open , setOpen] = useCreateChannelModel()
    
    const {data : member , isLoading : memberLoading} = useCurrentMember({workspaceId})
     const {data : workspace , isLoading : workspaceLoading} = useGetWorkspace({id:workspaceId})

     const {data : channels , isLoading : channelLoading} = useGetChannels({workspaceId})
    
     const channelId = useMemo(() => channels?.[0]?._id, [channels])
     
     const isAdmin = useMemo(()=> member?.role === 'admin', [member?.role])
     useEffect(() => {
         if(workspaceLoading || channelLoading ||  memberLoading || !member ||   !workspace){
            return;
         }

         if(channelId){
            router.push(`/workspace/${workspaceId}/channel/${channelId}`)
         } else if (!open && isAdmin){
            setOpen(true)
         }
     },[channelId, workspaceLoading, channelLoading, workspace, open ,setOpen ,router ,workspaceId ,memberLoading ,member,isAdmin])
    

     if(workspaceLoading || channelLoading){
        return (
            <div className="h-full flex-1 items-center justify-center flex-col gap-2">
                <Loader className="animate-spin size-5 text-muted-foreground"/>

            </div>
        )

     }

     if(!workspace){
        return(
            <div className="h-full flex-1 items-center justify-center flex-col gap-2">
            <TriangleAlert className="animate-spin size-5 text-muted-foreground"/>
             <span className="text-muted-foreground text-sm">Workspace not found</span>
        </div>
        )
     }

     
    return(
            <div className="h-full flex-1 items-center justify-center flex-col gap-2">
            <TriangleAlert className=" size-5 text-muted-foreground"/>
             <span className="text-muted-foreground text-sm">No channel found</span>
        </div>
        )
     }

export default WorkspaceIdPage;