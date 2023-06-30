import Image from "next/image";


export default function LoadingIndicator(){
    return(
        <div className="w-full h-full flex items-center justify-center absolute left-0 top-0 bg-background opacity-70 z-20 pointer-events-none">
            <Image src={"loading.svg"} alt={"loading spinner"} width={35} height={35} className="spin">
            </Image>    
        </div>
    )
}