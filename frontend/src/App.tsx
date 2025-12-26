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
      <Photo image="/female.jpg" text="Women" />
      <Photo image="/man.jpg" text="Men" />
      <Photo image="/kids.jpg" text="Kids" />
    </div>
  </div>
</div>
      
    </>
  );
}

export default App;
