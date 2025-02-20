import { Route, Routes } from "react-router-dom";
import {Home} from "./Components/Home"
import {Reservation} from "./Components/Reservation"
import {Galerie} from "./Components/Galerie"
import { Contact } from "./Components/Contact";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="Reservation" element={<Reservation/>} />
      <Route path="Galerie" element={<Galerie/>} />
      <Route path="Contact" element={<Contact/>} />
    </Routes>
  );
}

export default App;
