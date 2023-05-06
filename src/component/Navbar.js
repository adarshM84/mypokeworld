import React from 'react';
import {Link } from 'react-router-dom';

export default function Navbar(props) {
    return (
        <nav className={`navbar navbar-expand-lg border-top sticky-top shadow-lg bg-${props.mode} text-${props.mode==='light'?'black':'light'} border-${props.mode==='light'?'light':'dark'}`}>
            <div className="container-fluid">
                <Link className={`navbar-brand text-${props.mode==='light'?'warning':'warning'}`} style={{color: "orange !important",textShadow: "rgb(233 0 0) 0px 0px 3px, rgb(2 2 2) 0px 0px 5px",fontSize:"32px"}} to="#" onClick={props.getOption}><i><strong>PokeWorld</strong></i></Link>
                <button className="navbar-toggler bg-warning" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link text-${props.mode==='light'?'black':'light'} ${props.selectedOption==="Home" ? "":"InActiveA"} comp`} aria-current="page" name="Home" to="/" onClick={props.getOption} >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link text-${props.mode==='light'?'black':'light'} ${props.selectedOption==="PokeType" ? "":"InActiveA"} comp`} aria-current="page" to="/PokeType" name="PokeType" onClick={props.getOption}>PokeType</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link  text-${props.mode==='light'?'black':'light'} ${props.selectedOption==="Pokedex" ? "":"InActiveA"} comp`} aria-current="page" to="/Pokedex" name="Pokedex" onClick={props.getOption}>Pokedex</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link  text-${props.mode==='light'?'black':'light'} ${props.selectedOption==="PokeItem" ? "":"InActiveA"} comp`} aria-current="page" to="/PokeItem" name="PokeItem" onClick={props.getOption}>PokeItem</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link  text-${props.mode==='light'?'black':'light'} ${props.selectedOption==="EvaluationChain" ? "":"InActiveA"} comp`} aria-current="page" to="/EvaluationChain" name="EvaluationChain" onClick={props.getOption}>EvaluationChain</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link  text-${props.mode==='light'?'black':'light'} ${props.selectedOption==="PokeAbility" ? "":"InActiveA"} comp`} aria-current="page" to="/PokeAbility" name="PokeAbility" onClick={props.getOption}>PokeAbility</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link  text-${props.mode==='light'?'black':'light'} ${props.selectedOption==="GuessPokemon" ? "":"InActiveA"} comp`} aria-current="page" to="/guessGame" name="GuessPokemon" onClick={props.getOption}>GuessPokemon</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link  text-${props.mode==='light'?'black':'light'} ${props.selectedOption==="AboutUs" ? "":"InActiveA"} comp`} aria-current="page" to="/AboutUs" name="AboutUs" onClick={props.getOption}>About Us</Link>
                        </li>

                    </ul>
                    <div style={{fontSize:"20px"}}>
                        <label className="switch">
                            <input type="checkbox" onClick={props.toogle} />
                            <span className="slider"></span>
                        </label> Dark Mode
                    </div>
                </div>
            </div>
        </nav>
    )
}
