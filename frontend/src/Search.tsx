import { useState } from "react";
import { Link } from "react-router-dom";

export default function Search() {
    const [text,setText] = useState("");



    return (
        <>
        <div></div>
        <Link to="/">
        <div className="font-bold text-[40px]  flex justify-center items-center">ANONYMOUS</div></Link>
        <div className=" flex justify-center items-center">
        <input type="text" value={text} onChange={(e)=> {setText(e.target.value)}} placeholder="  Search for clothes"className=" flex justify-center items-center w-[900px] border-[1px] rounded-[20px]"></input>
        </div>
        
        
        </>
    )
}