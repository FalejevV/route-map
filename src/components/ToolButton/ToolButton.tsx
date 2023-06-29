import { RootState, useAppSelector } from "@/redux/store";
import Image from "next/image";


export default function ToolButton(props:{
    icon:string,
    onClick:Function,
    title:string,
    size?:[number,number],
    toggled?:boolean,
    clickable?:boolean
}){
    return(
        <div className={`${props.clickable !== undefined && !props.clickable && "pointer-events-none opacity-30"}`}>
            <div className={`
            transition duration-1000
            ${props.size ? `w-[${props.size[0]}px]` : "w-[30px]"}  
            ${props.size ? `h-[${props.size[1]}px]` : "h-[30px]"}
            ${props.toggled && "bg-accent brightness-[140%]"}
            flex items-center justify-center content-center cursor-pointer hover-zoom rounded p-[3px]`} onClick={() => props.onClick()}>
                <Image src={props.icon} alt={props.title} width={props.size ? props.size[0] : 24} height={props.size ? props.size[1] : 24}/>
            </div>
        </div>
    )
}