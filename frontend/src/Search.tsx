import { Link } from "react-router-dom";

export default function Search() {

    return (
        <>
        <div></div>
        <Link to="/">
        <div className="font-bold text-[40px]  flex justify-center items-center">ANONYMOUS</div></Link>
        <div className=" flex justify-center items-center">
        <input type="text" placeholder="  Search for clothes"className=" flex justify-center items-center w-[900px] border-[1px] rounded-[20px]"></input>
        </div>
        
        
        </>
    )
}