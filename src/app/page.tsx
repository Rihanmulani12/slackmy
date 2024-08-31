'use client'

import { UserButton } from "@/features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
import { usecreateWorkspaceModel} from "@/features/workspaces/store/use-create-workspace-model"


export default function Home() {

  const [open , setOpen] = usecreateWorkspaceModel()
  
  const {data , isLoading} = useGetWorkspaces()

  const workspacesId = useMemo(() => data?.[0]?._id, [data])

  useEffect( () => {

    if(isLoading)return;
    

    if (workspacesId) {
      console.log("redirecting")
    }
    else if(!open){

      setOpen(true)
    }
    
  },[workspacesId, isLoading , setOpen])
  return (
    <div>
    

     <UserButton/>
    </div>
   
  );
}
