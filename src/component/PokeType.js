import { React, useEffect, useState } from 'react';
import { loadOptions } from "./common.js";
import { makeTitleCase } from './common.js';
import { pokeType } from "./Pokedata.js";
import Loader from './Loader.js';
import PokeCard from './PokeCard.js';
import InfiniteScroll from "react-infinite-scroll-component";


let pokeList = [];
let pokeLimit = -10;
let pokeIndex = 0;
let fetchedData = [];
let selectedType = '';
let dDamageFrom = "---";
let dDamageTo = "---";
let hDamageFrom = "---";
let hDamageTo = "---";
let nDamageFrom = "---";
let nDamageTo = "---";

export default function PokeType(props) {
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
        // //console.log(allFetchedData, "allFetchedData");
        //default value
        dDamageFrom = "---";
        dDamageTo = "---";
        hDamageFrom = "---";
        hDamageTo = "---";
        nDamageFrom = "---";
        nDamageTo = "---";

        if (document.getElementById("selectPokeType").value.split("%::%")[0] === "DEFAULT") {
            setAllFetchedData([]);
            setIsChange(true);
            setIsLoading(false);
            return;
        }

        var url = document.getElementById("selectPokeType").value.split("%::%")[1];
        selectedType = document.getElementById("selectPokeType").value.split("%::%")[0];
        selectedType = selectedType.substring(0, 1).toUpperCase() + selectedType.substring(1);



        let tempData = await fetch(url);
        let data = await tempData.json();
        if (data !== undefined) {
            pokeLimit = data.pokemon.length;
            pokeList = data;
            //console.log(data.damage_relations, "data")
            fetchedData = [];
            if (pokeLimit === -1) setDataNotPresent(true);
            else setDataNotPresent(false);

            //set damage value

            let tempStr = "";
            if (data.damage_relations.double_damage_from.length !== 0) {
                //console.log(data.damage_relations.double_damage_from.length)
                for (let i = 0; i < data.damage_relations.double_damage_from.length; i++) {
                    tempStr += makeTitleCase(data.damage_relations.double_damage_from[i].name) + ",";
                    // //console.log(makeTitleCase(data.damage_relations.double_damage_from[i].name))
                }
                tempStr = tempStr.substring(0, tempStr.length - 1);
                dDamageFrom = tempStr;
            }
            tempStr = "";
            if (data.damage_relations.double_damage_to.length !== 0) {
                //console.log(data.damage_relations.double_damage_to.length)
                for (let i = 0; i < data.damage_relations.double_damage_to.length; i++) {
                    tempStr += makeTitleCase(data.damage_relations.double_damage_to[i].name) + ",";
                }
                tempStr = tempStr.substring(0, tempStr.length - 1);
                dDamageTo = tempStr;
            }
            tempStr = "";
            if (data.damage_relations.half_damage_from.length !== 0) {
                //console.log(data.damage_relations.half_damage_from.length)
                for (let i = 0; i < data.damage_relations.half_damage_from.length; i++) {
                    tempStr += makeTitleCase(data.damage_relations.half_damage_from[i].name) + ",";
                }
                tempStr = tempStr.substring(0, tempStr.length - 1);
                hDamageFrom = tempStr;
            }
            tempStr = "";
            if (data.damage_relations.half_damage_to.length !== 0) {
                //console.log(data.damage_relations.half_damage_to.length)
                for (let i = 0; i < data.damage_relations.half_damage_to.length; i++) {
                    tempStr += makeTitleCase(data.damage_relations.half_damage_to[i].name) + ",";
                }
                tempStr = tempStr.substring(0, tempStr.length - 1);
                hDamageTo = tempStr;
            }
            tempStr = "";
            if (data.damage_relations.no_damage_from.length !== 0) {
                //console.log(data.damage_relations.no_damage_from.length)
                for (let i = 0; i < data.damage_relations.no_damage_from.length; i++) {
                    tempStr += makeTitleCase(data.damage_relations.no_damage_from[i].name) + ",";
                }
                tempStr = tempStr.substring(0, tempStr.length - 1);
                nDamageFrom = tempStr;
            }
            tempStr = "";
            if (data.damage_relations.no_damage_to.length !== 0) {
                //console.log(data.damage_relations.no_damage_to.length)
                for (let i = 0; i < data.damage_relations.no_damage_to.length; i++) {
                    tempStr += makeTitleCase(data.damage_relations.no_damage_to[i].name) + ",";
                }
                tempStr = tempStr.substring(0, tempStr.length - 1);
                nDamageTo = tempStr;
            }



            fetchCurrentTypeData();
        }
        // //console.log(url, data);
        // //console.log(text,document.getElementById("selectPokeType").selectedIndex)
    }
    const fetchCurrentTypeData = async () => {
        setIsLoading(true);
        // //console.log("loadPokemon");
        // //console.log(pokeList, pokeLimit);
        let lastIndex =0;
        if((pokeIndex + 20) < pokeLimit) lastIndex=(pokeIndex + 20);
        else if(pokeLimit!==pokeIndex) lastIndex=((pokeLimit-pokeIndex)+pokeIndex);
        else lastIndex=-1;

        if (lastIndex === -1) {
            setIsLoading(false);
            return;
        }
        // //console.log(lastIndex,"lastIndex", pokeLimit,"pokeLimit",pokeIndex,"pokeIndex");
        fetchedData = [];
        for (pokeIndex; pokeIndex < lastIndex; pokeIndex++) {
            // //console.log("in Pokeindex",pokeIndex)
            let url = pokeList.pokemon[pokeIndex].pokemon.url;
            // //console.log(url,"url")
            let tempData = await fetch(url);
            let data = await tempData.json();
            if (data !== undefined) {
                // //console.log("current data", data)
                fetchedData.push(data);
            }
        }
        // //console.log("after iteration",pokeIndex,"pokeIndex",lastIndex,"lastIndex")

        //after each iteration last become first index

        // //console.log(pokeLimit, "After",allFetchedData.concat(fetchedData),fetchedData);
        // //console.log(fetchedData, "fetchedData",allFetchedData)
        setAllFetchedData(allFetchedData.concat(fetchedData), setIsLoading(false));

    }




    useEffect(() => {
        loadOptions("selectPokeType", pokeType.results)
    }, []);
    useEffect(() => {
        //if dropdown change
        if (isChange) {
            loadSelectedData();
            setIsChange(false);
        }
        // //console.log(allFetchedData, "Effect")
    }, [allFetchedData, isChange, loadSelectedData]);

    return (
        <>
            <div className='container my-5'>
                <h1 className='text-center my-3'>PokeType</h1>
                <div className='my-5' id='poTypeDiv'>
                    <div className='row justify-content-center'>
                        <div className='col-md-6'>
                            <select style={{ border: "2px solid" }} className="form-select" id="selectPokeType" onChange={cleareState}>
                            </select>
                        </div>
                    </div>
                    <div id='pokemonContent'>
                        {/* Basic Info */}
                        <div className='d-flex justify-content-center row p-2'>
                            <div className={`my-5 col-md-7 p-3`} style={{ border: `2px solid ${props.mode === 'light' ? 'black' : 'white'}`, borderRadius: "10px" }}>
                                <h3 className='text-center mb-3' style={{ overflowX: "auto" }}><b>{selectedType} Type Info</b></h3>
                                <div className='row'>
                                    <div className='col-6'><h5><b>Double Damage From</b> </h5></div>
                                    <div className='col-6 text-end' style={{ overflowX: "auto" }}><h5>{dDamageFrom}</h5></div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'><h5><b>Double Damage To</b></h5></div>
                                    <div className='col-6 text-end' style={{ overflowX: "auto" }}><h5> {dDamageTo}</h5></div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'><h5><b>Half Damage From</b> </h5></div>
                                    <div className='col-6 text-end' style={{ overflowX: "auto" }}><h5> {hDamageFrom}</h5></div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'><h5><b>Half Damage To</b></h5></div>
                                    <div className='col-6 text-end' style={{ overflowX: "auto" }}><h5> {hDamageTo}</h5></div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'><h5><b>No Damage From</b></h5></div>
                                    <div className='col-6 text-end' style={{ overflowX: "auto" }}><h5> {nDamageFrom}</h5></div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'> <h5><b>No Damage To</b></h5></div>
                                    <div className='col-6 text-end' style={{ overflowX: "auto" }}><h5>{nDamageTo}</h5></div>
                                </div>

                            </div>
                        </div>

                        {/* Basic Info end*/}
                        <p className='my-3 text-center'>{!window.navigator.onLine ? "You are offline.Please check your network connection..." : ""}</p>
                        <p className='my-3 text-center'>{dataNotPresent ? "No data present in this type." : ""}</p>
                        <InfiniteScroll
                            dataLength={allFetchedData.length}
                            next={fetchCurrentTypeData}
                            hasMore={pokeLimit !== -1 && pokeLimit !== 0}
                            loader={isLoading ? <Loader /> : ""} style={{ overflow: "unset !important" }}>
                            <div className='row'>
                                {allFetchedData.length > 0 ? (allFetchedData.map((item, index) => {
                                    // //console.log(item);
                                    let type = "";
                                    for (let i = 0; i < item.types.length; i++) {
                                        // //console.log(item.types[i].type)
                                        type += item.types[i].type.name.toUpperCase() + ",";
                                    }


                                    let moves = item.moves.length === 0 ? "No moves." : item.moves;

                                    let abilities = item.abilities.length === 0 ? "No ability," : "";
                                    for (let i = 0; i < item.abilities.length; i++) {
                                        if (i === 10) {
                                            abilities = moves.substring(0, abilities.length - 1);
                                            abilities += " etc..";
                                            break;
                                        }
                                        // //console.log(item.abilities[i].ability.name,"Ability")
                                        abilities += item.abilities[i].ability.name + ",";
                                    }

                                    let pokeFrontImage = "";
                                    if ((item.id < 755) || (item.id >= 1000 && item.id < 1011) || (item.id >= 10000 && item.id < 10264)) {
                                        if (item.id < 650) pokeFrontImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.id}.svg`;
                                        else pokeFrontImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`;
                                    } else {
                                        pokeFrontImage = item.sprites.front_default;
                                    }
                                    // 

                                    type = type.substring(0, type.length - 1);
                                    // moves = item.moves.length < 30 ? moves = moves.substring(0, moves.length - 1) : moves;
                                    abilities = item.abilities.length < 10 ? abilities = abilities.substring(0, abilities.length - 1) : abilities;

                                    return <div className='col-md-4 my-4' key={index}>
                                        <PokeCard cardType={"pokeType"} name={item.name} pokeId={item.id} mode={props.mode} pokeType={type} front_default={pokeFrontImage} front_shiny={item.sprites.front_shiny} pokeMoves={moves} pokeAbilities={abilities} fType={item.types[0].type.name} />
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
