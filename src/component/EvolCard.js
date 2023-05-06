import { React, useEffect } from 'react';
import notFound from "../images/notavailable.png"

export default function EvolCard(props) {

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
 

    return (
        <>
            <div className={`card  bg-${props.mode === 'light' ? 'light cardShadowD' : 'black cardShadowW'}`} style={{ border: `2px solid ${props.mode === 'light' ? 'black' : 'white'}` }}>
                <img src={props.front_default !== null ? props.front_default : notFound} className={`card-img-top card-header border-${props.mode === 'light' ? 'light' : 'dark'}`} name={props.front_default + "%::%" + props.front_shiny} id={props.pokeId} style={{height:"350px"}} alt="Unable to load..." />
                <div className={`card-body`} style={{height:"350px"}}>
                    <h5 className={`card-title text-${props.mode === 'light' ? 'dark' : 'white'}`}><strong>{props.name.toUpperCase()}</strong></h5>
                    <p className={`card-text text-${props.mode === 'light' ? 'dark' : 'white'} mb-2`}><strong>Id : </strong>#{props.pokeId}</p>
                    {props.evolves_from_species==="Not found" ? "":<p className={`card-text text-${props.mode === 'light' ? 'dark' : 'white'} mb-2`}><strong>Evolve From : </strong><span className='badge bg-success'>{props.evolves_from_species.toUpperCase()}</span></p>}
                    <p className={`card-text text-${props.mode === 'light' ? 'dark' : 'white'} mb-2`}><strong>Info : </strong>{props.info}</p>
                    
                    <p className={`card-text text-${props.mode === 'light' ? 'dark' : 'white'}`} id="moveMesage"><strong className='text-danger'>Note : </strong><span>Please wait to load moving image when it on.</span></p>

                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" name={props.pokeId} id="moveImage" onChange={changeMoveImage} />
                        <label className={`form-check-label text-dark text-${props.mode === 'light' ? 'dark' : 'white'}`} htmlFor="moveImage">Moving Image</label>
                    </div>
                </div>
            </div>
        </>
    )
}
