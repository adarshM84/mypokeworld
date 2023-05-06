import { React, useEffect, useState } from 'react';
import { loadOptions } from "./common.js";
import { pokeDex } from "./Pokedata.js";
import Loader from './Loader.js';
import PokeCard from './PokeCard.js';
import InfiniteScroll from "react-infinite-scroll-component";

let pokeList = [];
let pokeLimit = -10;
let pokeIndex = 0;
let fetchedData = [];

export default function Pokedex(props) {
    let [isLoading, setIsLoading] = useState(false);
    let [isChange, setIsChange] = useState(false);
    let [allFetchedData, setAllFetchedData] = useState([]);
    let [dataNotPresent, setDataNotPresent] = useState(false);


    const cleareState = () => {
        setIsLoading(true);
        pokeList = [];
        pokeLimit = -10;
        pokeIndex = 0;
        setAllFetchedData([]);
        setIsChange(true);
    }
    const loadSelectedData = async () => {
        // console.log(allFetchedData, "allFetchedData")
        var url = document.getElementById("selectPokeDex").value.split("%::%")[1];

        let tempData = await fetch(url);
        let data = await tempData.json();
        if (data !== undefined) {
            // console.log(data, "data")
            pokeLimit = data.pokemon_entries.length;
            pokeList = data;
            fetchedData = [];
            if (pokeLimit === -1) setDataNotPresent(true);
            else setDataNotPresent(false);

            fetchCurrentTypeData();
        }

    }
    const fetchCurrentTypeData = async () => {
        setIsLoading(true);
        // console.log("loadPokemon");
        // console.log(pokeList, pokeLimit);
        let lastIndex = 0;
        if ((pokeIndex + 20) < pokeLimit) lastIndex = (pokeIndex + 20);
        else if (pokeLimit !== pokeIndex) lastIndex = ((pokeLimit - pokeIndex) + pokeIndex);
        else lastIndex = -1;

        if (lastIndex === -1) {
            setIsLoading(false);
            return;
        }
        // console.log(pokeLimit <= lastIndex, lastIndex, pokeLimit);
        fetchedData = [];
        // console.log(lastIndex,"lastIndex", pokeLimit,"pokeLimit",pokeIndex,"pokeIndex");
        for (pokeIndex; pokeIndex < lastIndex; pokeIndex++) {
            // console.log("in Pokeindex",pokeIndex)
            let entryno = pokeList.pokemon_entries[pokeIndex].entry_number;
            let url = "https://pokeapi.co/api/v2/pokemon/" + entryno + "/";
            // console.log(url,"url",pokeList.pokemon_entries[pokeLimit].pokemon_species.name);
            // https://pokeapi.co/api/v2/pokemon/bulbasaur/
            let tempData = await fetch(url);
            let data = await tempData.json();
            if (data !== undefined) {
                // console.log("current data", data)
                fetchedData.push(data);
            }
        }
        // console.log("after iteration",pokeIndex,"pokeIndex",lastIndex,"lastIndex")

        //after each iteration last become first index

        setAllFetchedData(allFetchedData.concat(fetchedData), setIsLoading(false));

    }

    useEffect(() => {
        loadOptions("selectPokeDex", pokeDex.results)
    }, []);
    useEffect(() => {
        if (isChange) {
            loadSelectedData();
            setIsChange(false);
        }
        // console.log(allFetchedData, "Effect")
    }, [allFetchedData, isChange, loadSelectedData]);

    return (
        <>
            <div className='container my-5'>
                <h1 className='text-center my-3'>PokeDex</h1>
                <div className='my-5' id='poTypeDiv'>
                    <div className='row justify-content-center'>
                        <div className='col-md-6'>
                            <select style={{ border: "2px solid" }} className="form-select" id="selectPokeDex" onChange={cleareState}>
                            </select>
                        </div>
                    </div>
                    <div id='pokemonContent'>
                        <p className='my-3 text-center'>{!window.navigator.onLine ? "You are offline.Please check your network connection..." : ""}</p>
                        <p className='my-3 text-center'>{dataNotPresent ? "No data present in this type." : ""}</p>
                        <InfiniteScroll
                            dataLength={allFetchedData.length}
                            next={fetchCurrentTypeData}
                            hasMore={pokeLimit !== -1 && pokeLimit !== 0}
                            loader={isLoading ? <Loader /> : ""} style={{ overflow: "unset !important" }}>
                            <div className='row'>
                                {allFetchedData.length > 0 ? (allFetchedData.map((item, index) => {
                                    // console.log(item);
                                    let type = "";
                                    for (let i = 0; i < item.types.length; i++) {
                                        // console.log(item.types[i].type.name)
                                        type += item.types[i].type.name.toUpperCase() + ",";
                                    }
                                    let moves = item.moves.length === 0 ? "No moves." : item.moves;

                                    let abilities = item.abilities.length === 0 ? "No ability," : "";
                                    for (let i = 0; i < item.abilities.length; i++) {
                                        if (i === 10) {
                                            abilities = abilities.substring(0, abilities.length - 1);
                                            abilities += " etc..";
                                            break;
                                        }
                                        // console.log(item.abilities[i].ability.name,"Ability")
                                        abilities += item.abilities[i].ability.name + ",";
                                    }

                                    let pokeFrontImage = "";
                                    if ((item.id < 755) || (item.id >= 1000 && item.id < 1011) || (item.id >= 10000 && item.id < 10264)) {
                                        if (item.id < 650) pokeFrontImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.id}.svg`;
                                        else pokeFrontImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`;
                                    } else {
                                        pokeFrontImage = item.sprites.front_default;
                                    }

                                    type = type.substring(0, type.length - 1);
                                    // moves = item.moves.length < 30 ? moves = moves.substring(0, moves.length - 1) : moves;
                                    abilities = item.abilities.length < 10 ? abilities = abilities.substring(0, abilities.length - 1) : abilities;

                                    return <div className='col-md-4 my-4' key={item.id}>
                                        <PokeCard cardType={"pokeDex"} name={item.name} pokeId={item.id} mode={props.mode} pokeType={type} front_default={pokeFrontImage} front_shiny={item.sprites.front_shiny} pokeMoves={moves} pokeAbilities={abilities} fType={item.types[0].type.name} />
                                    </div>;

                                })) : ""
                                }

                            </div>
                        </InfiniteScroll>

                    </div>
                    {/* //loader */}
                    {/* {isLoading ? <Loader /> : ""} */}
                </div>
            </div>
        </>
    )
}
