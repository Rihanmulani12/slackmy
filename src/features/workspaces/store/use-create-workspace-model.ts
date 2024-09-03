import {atom , useAtom} from "jotai"

const modelState = atom(false)

export const usecreateWorkspaceModel = () =>{
    return useAtom(modelState)
}


