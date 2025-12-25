import { useEffect } from "react";
import Navbar from "./components/Navbar";

function App() {
  //   useEffect(()=> {
  //     fetch('https://fakestoreapiserver.reactbd.org/api/products/1')
  //   .then(res => res.json())
  //   .then(json => console.log(json));
  // },[])
  return (
    <>
      <div className="relative w-full h-screen">
        <div className="absolute top-0 left-0 w-full z-20">
          <Navbar />
        </div>

        <video className="w-full h-155 object-cover" autoPlay muted loop>
          <source src="/jhope.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="text-[50px] flex flex-wrap items-center justify-center">
        Experience our wide selection of products
      </div>
      <div className="flex flex-row flex-wrap justify-around">
        <div className=" mt-5 ">
          <img src="/female.jpg" className="rounded-[50px] h-120 w-67.5"></img>
        </div>
        <div className=" mt-5 ">
          <img src="/man.jpg" className="rounded-[50px] h-120 w-67.5"></img>
        </div>
        <div className="  mt-5">
          <img src="/kid.jpg" className="rounded-[50px] h-120 w-67.5"></img>
        </div>
      </div>
    </>
  );
}

export default App;
