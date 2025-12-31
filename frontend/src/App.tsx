import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Photo from "./components/Photo";

function App() {
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

      <div className="relative w-full min-h-screen mt-20 overflow-hidden">

  {/* <video
    className="absolute inset-0 w-full h-full object-cover"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src="/black.mp4" type="video/mp4" />
  </video> */}

  <div className="relative z-10 ">
    <div className="text-[50px] flex justify-center mb-12">
      Experience our wide selection of products
    </div>

    <div className="flex flex-row flex-wrap justify-around">
      
      <Photo image="/man.jpg" text="Men" />
      <Photo image="/female.jpg" text="Women" />
      <Photo image="https://plus.unsplash.com/premium_photo-1697183202112-19523c5e7250?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" text="Kids" />
    </div>
  </div>
</div>
      
    </>
  );
}

export default App;
