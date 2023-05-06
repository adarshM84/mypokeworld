import { useEffect, useState } from 'react';
import Loader from './Loader.js';
import { pokeItemData } from './Pokedata.js';
import ItemCard from './ItemCard.js';
import { makeTitleCase } from "./common.js";
import InfiniteScroll from "react-infinite-scroll-component";

let pokeLimit = 2050;
let fetchedData = [];
let itemIndex = 0;

export default function PokeItem(props) {
    let [isLoading, setIsLoading] = useState(false);
    let [allFetchedData, setAllFetchedData] = useState([]);

    const loadNextData = async () => {
        setIsLoading(true);
        let lastIndex = 0;
        if ((itemIndex + 20) < pokeLimit) lastIndex = (itemIndex + 20);
        else if (pokeLimit !== itemIndex) lastIndex = ((pokeLimit - itemIndex) + itemIndex);
        else lastIndex = -1;


        if (lastIndex === -1) {
            setIsLoading(false);
            return;
        }
        // console.log(pokeLimit <= lastIndex, lastIndex, pokeLimit);
        fetchedData = [];
        for (itemIndex; itemIndex < lastIndex; itemIndex++) {
            // console.log(pokeItemData.results[pokeLimit].url)
            let tempData = await fetch(pokeItemData.results[itemIndex].url);
            let data = await tempData.json();
            if (data !== undefined) {
                // console.log("current data", data)
                fetchedData.push(data);
            }
        }
        
        // console.log(pokeLimit, "After",allFetchedData.concat(fetchedData),fetchedData);
        // console.log(fetchedData, "fetchedData",allFetchedData)
        setAllFetchedData(allFetchedData.concat(fetchedData), setIsLoading(false));

    }


    useEffect(() => {
        setAllFetchedData([], loadNextData());
    }, []);


    return (
        <>
            <div className='container my-5'>
                <h1 className='text-center my-3'>PokeItem</h1>
                <div className='my-5' id='pokeItemDiv'>

                    <div id='pokeItemContent'>
                        <p className='my-3 text-center'>{!window.navigator.onLine ? "You are offline.Please check your network connection..." : ""}</p>
                        <InfiniteScroll
                            dataLength={allFetchedData.length}
                            next={loadNextData}
                            hasMore={pokeLimit !== -1 && pokeLimit !== 0}
                            loader={isLoading ? <Loader /> : ""} style={{ overflow: "unset !important" }}>
                            <div className='row'>
                                {allFetchedData.length > 0 ? (allFetchedData.map((item, index) => {
                                    // console.log(item, index);
                                    let itemId = item.id;
                                    let itemName = item.name;
                                    let category = item.category.name !== null || item.category.name !== undefined ? makeTitleCase(item.category.name) : "No category";
                                    let itemAttributes = item.attributes.length === 0 ? "No Attributes," : "";
                                    // let itemImage = item.sprites.default;
                                    let itemImage=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world/${item.name}.png`;
                                    // console.log(itemImage)
                                    // console.log(item.effect_entries, item.effect_entries.length,item.effect_entries[0])
                                    let effect = item.effect_entries.length === 0 ? "No Effect" : item.effect_entries[0].effect;


                                    for (let i = 0; i < item.attributes.length; i++) {
                                        if (i === 10) {
                                            itemAttributes = itemAttributes.substring(0, itemAttributes.length - 1);
                                            itemAttributes += " etc..";
                                            break;
                                        }
                                        // console.log(item.attributes[i].name,"Attri")
                                        itemAttributes += makeTitleCase(item.attributes[i].name) + ",";
                                    }


                                    itemAttributes = item.attributes.length < 10 ? itemAttributes = itemAttributes.substring(0, itemAttributes.length - 1) : itemAttributes;

                                    return <div className='col-md-4 my-4' key={index}>
                                        <ItemCard itemId={itemId} itemName={itemName} mode={props.mode} itemAttributes={itemAttributes} category={category} itemImage={itemImage} effect={effect} />
                                    </div>;
                                })) : ""
                                }

                            </div>
                        </InfiniteScroll>

                    </div>
                </div>
            </div>
        </>
    )
}
