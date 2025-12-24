import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <div className=" flex justify-center items-center">
      <video  width="1000" height="240" autoPlay={true} muted={true} loop={true}>
        <source src="/jhope.mp4" type="video/mp4"></source>
      </video>
      </div>
    </>
  );
}

export default App;
