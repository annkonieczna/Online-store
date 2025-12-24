import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <video width="320" height="240" autoPlay={true} muted={true} loop={true}>
        <source src="/jhope.mp4" type="video/mp4"></source>
      </video>
    </>
  );
}

export default App;
