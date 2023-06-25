import Image from "next/image";


export default function ToolButton(props:{
    icon:string,
    onClick:Function,
    title:string,
}){
    return(
        <div className="w-[24px] h-[24px] flex items-center content-center cursor-pointer hover-zoom" onClick={() => props.onClick()}>
            <Image src={props.icon} alt={props.title} width={24} height={24} />
        </div>
    )
}