import {atom , useAtom} from "jotai"

const modelState = atom(false)


export const usecreateChannelModel = () =>{
    return useAtom(modelState)
}