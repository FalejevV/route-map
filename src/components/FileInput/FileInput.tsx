"use client"

export default function FileInput(props:{
    setFile:Function,
}){

    function onFileInput(e:React.ChangeEvent<HTMLInputElement>){
        let files = e.target.files;
        if(files && files[0]){
            props.setFile(files[0]);
        }
    }

    return(
        <div>
            <input type="file" size={1} onChange={onFileInput} />
        </div>
    )
}