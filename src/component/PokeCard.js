import { React, useEffect } from 'react';
import notFound from "../images/notavailable.png"

export default function PokeCard(props) {
    const changeImage = (event) => {
        // console.log(event.target.name)
        // console.log(document.getElementById(event.target.name).name)

        let shiny = document.getElementById(event.target.name).name.split("%::%")[1].trim();
        let normal = document.getElementById(event.target.name).name.split("%::%")[0];
        // console.log(shiny,"shiny",normal,"normal",shiny!=="null",shiny!==null)
        if (event.target.checked) {
            if (shiny !== "null") {
                document.getElementById(event.target.name).src = shiny;
            }
            else document.getElementById(event.target.name).src = notFound;
        } else {
            if (normal !== "null") document.getElementById(event.target.name).src = normal;
            else document.getElementById(event.target.name).src = notFound;
        }
    }
    const changeMoveImage = (event) => {
        // console.log(event.target.name)
        let pokemonId = event.target.name;
        let normal = document.getElementById(event.target.name).name.split("%::%")[0];

        if (event.target.checked) {
            if (pokemonId < 683 || (pokemonId >= 10000 && pokemonId < 10256)) {
                document.getElementById(event.target.name).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonId}.gif`;
            } else {
                document.getElementById(event.target.name).src = notFound;
            }
        } else {
            let tempIimage = "";
            if ((pokemonId < 755) || (pokemonId >= 1000 && pokemonId < 1011) || (pokemonId >= 10000 && pokemonId < 10264)) {
                if (pokemonId < 650) tempIimage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
                else tempIimage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
            } else {
                tempIimage = normal;
            }
            document.getElementById(event.target.name).src = tempIimage;
        }
    }
    const loadMove = () => {
        let tempUl = document.getElementById(props.pokeId + "-ul");
        // console.log(tempUl, "tempUl")
        // console.log(props.pokeMoves, "called");

        if (props.pokeMoves === "No moves.") {
            let tempLi = document.createElement("li");
            tempLi.setAttribute("class", "list-group-item");
            tempLi.setAttribute("style","border:1px solid black !important");
            tempLi.innerHTML = "No moves.";
            tempUl.appendChild(tempLi);
            return;
        }

        for (let i = 0; i < props.pokeMoves.length; i++) {
            let tempLi = document.createElement("li");
            tempLi.setAttribute("class", "list-group-item");
            tempLi.setAttribute("style","border:1px solid black !important");
            tempLi.innerHTML = props.pokeMoves[i].move.name.toUpperCase();
            tempUl.appendChild(tempLi);
        }
    }
    useEffect(() => {
        loadMove();
    }, [])

    return (
        <>
            <div className={`card ${props.cardType === "pokeDex" ? "pokeCard" : "pokeCard"} bg-${props.mode === 'light' ? 'light cardShadowD' : 'black cardShadowW'}`} style={{ border: `2px solid ${props.mode === 'light' ? 'black' : 'white'}` }}>
                <img src={props.front_default !== null ? props.front_default : notFound} className={`card-img-top card-header border-${props.mode === 'light' ? 'light' : 'dark'}`} name={props.front_default + "%::%" + props.front_shiny} id={props.pokeId} alt="Unable to load..." />
                <div className={`card-body  ${props.fType}`}>
                    <h5 className={`card-title text-dark`}><strong>{props.name.toUpperCase()}</strong></h5>
                    <p className="card-text text-dark mb-2"><strong>Id : </strong>#{props.pokeId}</p>
                    <p className="card-text text-dark mb-2"><strong>Type : </strong>{props.pokeType}</p>
                    {props.pokeAbilities !== null || props.pokeAbilities !== undefined ? <p className="card-text text-dark mb-2"><strong>Abilities : </strong><span>{props.pokeAbilities}</span></p> : ""}
                    {props.pokeMoves !== null || props.pokeMoves !== undefined ? (<><p className="card-text text-dark mb-0"><strong>Moves : </strong></p> <ul className="list-group ulSize mb-3" id={props.pokeId + "-ul"}></ul></>) : ""}
                    <p className="card-text text-dark" id="moveMesage"><strong className='text-danger'>Note : </strong><span>Please wait to load moving image when it on.</span></p>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" name={props.pokeId} id="imgType" onChange={changeImage} />
                        <label className="form-check-label text-dark" htmlFor="imgType">Is Shiny</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" name={props.pokeId} id="moveImage" onChange={changeMoveImage} />
                        <label className="form-check-label text-dark" htmlFor="moveImage">Moving Image</label>
                    </div>
                </div>
            </div>
        </>
    )
}
