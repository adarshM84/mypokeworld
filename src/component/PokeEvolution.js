import Loader from './Loader.js';
import { useState } from 'react';
import EvolCard from './EvolCard.js';
let evoChain = [];
let evoData = [];
let pokeList = [];

export default function PokeEvolution(props) {
  let [isLoading, setIsLoading] = useState(false);

  const fetchAllData = async (pokeArray) => {

    //console.log(pokeArray)
    for (let i = 0; i < pokeArray.length; i++) {
      let pokeName = pokeArray[i].species_name;
      // //console.log(pokeArray[i])
      let url = "https://pokeapi.co/api/v2/pokemon-species/" + pokeName;

      let tempData = await fetch(url);

      let data = await tempData.json();
      if (data !== undefined || data !== null) {
        //console.log(data, "data");
        pokeList.push(data);
      }
    }
    setIsLoading(false);
  }

  const loadChain = async () => {
    evoChain = [];
    evoData = [];
    pokeList = [];

    setIsLoading(true);
    evoChain = [];
    evoData = [];
    // setIsLoading(true);
    let pokeInfo = document.getElementById("pokeInput").value.trim().toLowerCase();
    if (pokeInfo.length === 0){
      alert("Enter pokemon id or name.");
      setIsLoading(false);
      return;
    } 

    let url = "https://pokeapi.co/api/v2/pokemon-species/" + pokeInfo;

    let tempData = await fetch(url);
    if (tempData.status === 404) {
      alert("Enter valid name or id.");
      setIsLoading(false);
      return;
    }

    let data = await tempData.json();
    if (data !== undefined || data !== null) {
      // //console.log(data, "data");
      let evourl = data.evolution_chain.url;
      //console.log(evourl);
      let tempEvoData = await fetch(evourl);
      let response = await tempEvoData.json();
      if (response !== undefined || response !== null) {
        // //console.log(response, "evoData")
        evoData = response.chain;
        do {
          var evoDetails = evoData['evolution_details'][0];
          //console.log(evoDetails, "evoDetails")
          evoChain.push({
            "species_name": evoData.species.name,
            "min_level": !evoDetails ? 1 : evoDetails.min_level,
            "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
            "item": !evoDetails ? null : evoDetails.item
          });

          evoData = evoData['evolves_to'][0];
        } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
        // //console.log(evoChain, "final")
        fetchAllData(evoChain);
      }
    }




  }
  return (
    <div className="container my-5">
      <h1 className='text-center my-3'>EvolutionChain</h1>
      <div className='my-5' id='poEvolutiondiv'>
        <div className='d-flex justify-content-center my-2'>
          <div className='col-md-6'>
            <input type='text' style={{ border: "2px solid" }} className="form-control" placeholder="Enter pokemon name or id." id="pokeInput" />
          </div>
          <div className="col-md-1"><button className="btn btn-primary mx-1" onClick={loadChain}>Get</button></div>
        </div>
        {isLoading ? <Loader /> : ""}
        <div id="evolutionContent">
          <p className='my-3 text-center'>{!window.navigator.onLine ? "You are offline.Please check your network connection..." : ""}</p>
          <div className='row'>
            {pokeList.length > 0 ? (pokeList.map((item, index) => {
              //console.log(item, "item")
              let pokeFrontImage = "";
              let evolves_from_species = item.evolves_from_species === null || item.evolves_from_species === undefined || item.evolves_from_species.length === 0 ? "Not found" : item.evolves_from_species.name
              // //console.log(evolves_from_species,"evolves_from_species");/

              if ((item.id < 755) || (item.id >= 1000 && item.id < 1011) || (item.id >= 10000 && item.id < 10264)) {
                if (item.id < 650) pokeFrontImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.id}.svg`;
                else pokeFrontImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`;
              } else {
                pokeFrontImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id }.png`;
              }

              let info = "Not found";
              for(let i=0;i<item.flavor_text_entries.length;i++){
                if(item.flavor_text_entries[i].language.name==='en'){
                  //console.log(item.flavor_text_entries[i].flavor_text);
                  info=item.flavor_text_entries[i].flavor_text;
                  break;
                }
              }

              return <div className='col-md-4 my-4' key={item.id}>
                <EvolCard name={item.name} pokeId={item.id} mode={props.mode} front_default={pokeFrontImage} evolves_from_species={evolves_from_species} info={info} />
              </div>;
            })) : ""
            }

          </div>
        </div>
      </div>
    </div>
  )
}
