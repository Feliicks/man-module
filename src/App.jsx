import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MyMap from "./Componentes/MyMap";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2 className="bg-slate-200 p-5 text-center">Ny Map</h2>
      <MyMap />
    </>
  );
}

export default App;
