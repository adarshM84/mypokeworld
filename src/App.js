import './App.css';
import Navbar from './component/Navbar.js';
import Home from './component/Home.js';
import GuessGame from "./component/GuessGame.js";
import PokeType from "./component/PokeType.js";
import Pokedex from "./component/Pokedex.js";
import ScrollToTop from './component/ScrollToTop.js';
import AboutUs from './component/AboutUs.js';
import Coming from './component/Coming.js';
import PokeItem from './component/PokeItem.js';
import PokeAbility from './component/PokeAbility.js';
import PokeEvolution from './component/PokeEvolution';


import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {

  const [selectedOption, setOption] = useState("Home");
  const [mode, setMode] = useState("light");

  const getOption = (event) => {
    // console.log(event,"event");
    setOption(event.target.name);
  }

  const toogle = () => {
    // console.log(selectedOption, "selectedOption")
    if (mode === "light") {
      document.body.style.backgroundColor = "#1d1d58";
      document.body.style.color = "white";
      setMode("dark",);
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      setMode("light");
    }
  }

  return (
    <>
      <Router>
        <Navbar getOption={getOption} mode={mode} toogle={toogle} selectedOption={selectedOption} />
        <Routes>
          <Route exact path="/" element={<Home mode={mode} getOption={getOption} />} />
          <Route exact path="/PokeType" element={<PokeType mode={mode} />} />
          <Route exact path="/Pokedex" element={<Pokedex mode={mode} />} />
          <Route exact path="/PokeItem" element={<PokeItem mode={mode} />} />
          <Route exact path="/PokeAbility" element={<PokeAbility mode={mode} />} />
          <Route exact path="/EvaluationChain" element={<PokeEvolution mode={mode} />} />
          <Route exact path="/guessGame" element={<GuessGame mode={mode} />} />
          <Route exact path="/coming" element={<Coming mode={mode} />} />
          <Route exact path="/AboutUs" element={<AboutUs mode={mode} />} />
        </Routes>
        <ScrollToTop />
      </Router>

    </>
  );
}

export default App;
