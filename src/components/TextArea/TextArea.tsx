

export default function TextArea(props:{
    title:string,
    id:string,
    placeholder:string,
    onChange:Function,
    value:string
}){
    return(
        <div className="w-full overflow-hidden flex flex-col gap-2">
            <label htmlFor={props.id} className="color-text">{props.title}</label>
            <textarea id={props.id} name={props.id} className="inputfield" placeholder={props.placeholder} onChange={(e) => props.onChange(e)}/>
        </div>
    )
}