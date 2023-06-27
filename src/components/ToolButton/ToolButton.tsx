import Image from "next/image";


export default function ToolButton(props:{
    icon:string,
    onClick:Function,
    title:string,
    size?:[number,number]
}){
    return(
        <div className={`
        ${props.size ? `w-[${props.size[0]}px]` : "w-[24px]"}  
        ${props.size ? `h-[${props.size[1]}px]` : "h-[24px]"}     
        flex items-center content-center cursor-pointer hover-zoom`} onClick={() => props.onClick()}>
            <Image src={props.icon} alt={props.title} width={props.size ? props.size[0] : 24} height={props.size ? props.size[1] : 24}/>
        </div>
    )
}