"use client"
import {useEffect, useState} from "react"

import { CreateWorkspaceModel } from "@/features/workspaces/components/create-workspace-model"

export const Model = ()=>{

    const [mounted , setMounted] = useState(false)


    useEffect(()=>{
        setMounted(true)
    },[])

    if(!mounted) return null

    return (
        <>
        <CreateWorkspaceModel/>
        </>
    )
}