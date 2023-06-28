


export default function TextField(props:{
    title:string,
    id:string,
    placeholder:string,
    onChange:Function,
    value:string
}){
    return(
        <div className="w-full overflow-hidden flex flex-col gap-2">
            <label htmlFor={props.id} className="color-text">{props.title}</label>
            <input type='text' name={props.id} id={props.id} className="inputfield" placeholder={props.placeholder} onChange={(e) => props.onChange(e)}/>
        </div>
    )
}
