import { React, useEffect, useState } from 'react';
import { loadOptions } from "./common.js";
import { pokeAbility } from "./Pokedata.js";
import Loader from './Loader.js';
import { makeTitleCase } from './common.js';


let abilityName = '---';
let effects = '---';
let sortEffect = '---';
let use = '---';
let useBy = '---';

export default function PokeAbility(props) {
    let [isLoading, setIsLoading] = useState(false);
    let [abilityData, setAbilityData] = useState({ abilityName: '---', effects: '---', sortEffect: '---', use: '---', useBy: '---' });
    let [isChange, setIsChange] = useState(false);


    const cleareState = () => {
        setIsLoading(true);
        setAbilityData({ abilityName: '---', effects: '---', sortEffect: '---', use: '---', useBy: '---' });
        setIsChange(true);
    }
    const loadSelectedData = async () => {
        // console.log(allFetchedData, "allFetchedData")
        var url = document.getElementById("selectAbility").value.split("%::%")[1];
        var name = makeTitleCase(document.getElementById("selectAbility").value.split("%::%")[0]);

        let tempData = await fetch(url);
        let data = await tempData.json();
        if (data !== undefined) {
            // console.log(data, "data");
            for (let i = 0; i < data.effect_entries.length; i++) {
                if (data.effect_entries[i].language.name === 'en') {
                    effects = data.effect_entries[i].effect !== null || data.effect_entries[i].effect !== undefined ? data.effect_entries[i].effect : " Not available.";
                    sortEffect = data.effect_entries[i].short_effect !== null || data.effect_entries[i].short_effect !== undefined ? data.effect_entries[i].short_effect : " Not available.";
                    // console.log(effects, "effects", sortEffect, "sortEffect")
                }
            }
            for (let i = 0; i < data.flavor_text_entries.length; i++) {
                if (data.flavor_text_entries[i].language.name === 'en') {
                    use = data.flavor_text_entries[i].flavor_text !== null || data.flavor_text_entries[i].flavor_text !== undefined ? data.flavor_text_entries[i].flavor_text : " Not available.";
                    // console.log(use, "use")
                }
            }
            useBy = '';
            let tempUl=document.getElementById("pokeList");
            tempUl.innerHTML='';

            for (let i = 0; i < data.pokemon.length; i++) {

                let tempLi = document.createElement("li");
                tempLi.setAttribute("class", "list-group-item");
                tempLi.setAttribute("style","border:1px solid black !important");
                tempLi.innerHTML = makeTitleCase(data.pokemon[i].pokemon.name);
                tempUl.appendChild(tempLi);
            }

            setAbilityData({ abilityName: name, effects: effects, sortEffect: sortEffect, use: use, useBy: useBy }, setIsLoading(false));
        }

    }




    useEffect(() => {
        loadOptions("selectAbility", pokeAbility.results)
    }, []);
    useEffect(() => {
        if (isChange) {
            loadSelectedData();
            setIsChange(false);
        }
        // console.log(allFetchedData, "Effect")
    }, [isChange, loadSelectedData]);

    return (
        <>
            <div className='container my-5'>
                <h1 className='text-center my-3'>PokeAbility</h1>
                <div className='my-5' id='poTypeDiv'>
                    <div className='row justify-content-center'>
                        <div className='col-md-6'>
                            <select style={{ border: "2px solid" }} className="form-select" id="selectAbility" onChange={cleareState}>
                            </select>
                        </div>
                    </div>
                    {isLoading ? <Loader /> : ""}
                    <div id='pokemonContent'>
                        <p className='my-3 text-center'>{!window.navigator.onLine ? "You are offline.Please check your network connection..." : ""}</p>
                        <div className='d-flex justify-content-center'>
                            <div className={`card text-bg-light my-4 col-md-5  bg-${props.mode === 'light' ? 'light cardShadowD' : 'black cardShadowW'}`} style={{ border: `2px solid ${props.mode === 'light' ? 'black' : 'white'}` }}>
                                <div className={`card-header text-center text-${props.mode === 'light' ? 'black' : 'light'}`} style={{ borderBottom: `2px solid ${props.mode === 'light' ? 'black' : 'white'}` }}><h3><strong>{abilityData.abilityName}</strong></h3></div>
                                <div className="card-body">
                                    <h4 className={`card-title text-center my-2 text-${props.mode === 'light' ? 'black' : 'light'}`}><strong>Ability Info</strong></h4>
                                    <h5 className={`card-text my-3 text-${props.mode === 'light' ? 'black' : 'light'}`}><strong>Effect : </strong>{abilityData.effects}</h5>
                                    <h5 className={`card-text my-3 text-${props.mode === 'light' ? 'black' : 'light'}`}><strong>Short Effect : </strong>{abilityData.sortEffect}</h5>
                                    <h5 className={`card-text my-3 text-${props.mode === 'light' ? 'black' : 'light'}`}><strong>Use : </strong>{abilityData.use}</h5>
                                    <h5 className={`card-text my-3 text-${props.mode === 'light' ? 'black' : 'light'}`}><strong>Use By Pokemons : </strong></h5>
                                    <ul className="list-group ulSize mb-3" id="pokeList"></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
