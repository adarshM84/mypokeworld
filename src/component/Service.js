import React from 'react';
import {Link } from 'react-router-dom';

import typeImage from '../images/poketype.png';
import evaluationType from '../images/evaluation.jpg';
import pokedex from '../images/pokedex.png';
import pokeItem from '../images/pokeitem.png';
import guessPokemon from '../images/guesspokemon.jpg';
import pokeAbility from '../images/ability.png';


export default function Service(props) {
    // console.log(props.mode)
    return (
        <>
            <div className='container my-5'>
                <h2 className='text-center mb-4'><u>Our Services</u></h2>
                <div id="serviceCard">
                    <div className='row'>
                        <div className='col-md-4 my-4'>
                            <div className={`card serviceSec bg-${props.mode==='light'?'light cardShadowD':'black cardShadowW'}`} style={{border:`2px solid ${props.mode==='light'?'black':'white'}`}}>
                                <img src={typeImage} className={`card-img-top card-header border-${props.mode==='light'?'light':'dark'}`} alt="Unable to load..."/>
                                    <div className="card-body">
                                        <h5 className={`card-title text-${props.mode==='light'?'black':'light'}`}>Poke Type</h5>
                                        <p className={`card-text text-${props.mode==='light'?'black':'light'}`}>In this section you can see the pokemon by type.</p>
                                        <Link to="/PokeType" className="btn btn-primary goBtn" onClick={props.getOption} name="PokeType">Go &rarr;</Link>
                                    </div>
                            </div>
                        </div>
                        <div className='col-md-4 my-4'>
                            <div className={`card serviceSec bg-${props.mode==='light'?'light cardShadowD':'black cardShadowW'}`} style={{border:`2px solid ${props.mode==='light'?'black':'white'}`}}>
                                <img src={pokedex} className={`card-img-top card-header border-${props.mode==='light'?'light':'dark'}`} alt="Unable to load..."/>
                                    <div className="card-body">
                                        <h5 className={`card-title text-${props.mode==='light'?'black':'light'}`}>Pokedex</h5>
                                        <p className="card-text">In this section you can see the pokemon by region.</p>
                                        <Link to="/Pokedex" className="btn btn-primary goBtn" onClick={props.getOption} name="Pokedex">Go &rarr;</Link>
                                    </div>
                            </div>
                        </div>
                        <div className='col-md-4 my-4'>
                            <div className={`card serviceSec bg-${props.mode==='light'?'light cardShadowD':'black cardShadowW'}`} style={{border:`2px solid ${props.mode==='light'?'black':'white'}`}}>
                                <img src={pokeItem} className={`card-img-top card-header border-${props.mode==='light'?'light':'dark'}`} alt="Unable to load..."/>
                                    <div className="card-body">
                                        <h5 className={`card-title text-${props.mode==='light'?'black':'light'}`}>Poke Item</h5>
                                        <p className="card-text">In this section you can see the information about item used in <i>PokeWorld.</i>.</p>
                                        <Link to="/PokeItem" className="btn btn-primary goBtn" onClick={props.getOption} name="PokeItem">Go &rarr;</Link>
                                    </div>
                            </div>
                        </div>
                        <div className='col-md-4 my-4'>
                            <div className={`card serviceSec bg-${props.mode==='light'?'light cardShadowD':'black cardShadowW'}`} style={{border:`2px solid ${props.mode==='light'?'black':'white'}`}}>
                                <img src={evaluationType} className={`card-img-top card-header border-${props.mode==='light'?'light':'dark'}`} alt="Unable to load..."/>
                                    <div className="card-body">
                                        <h5 className={`card-title text-${props.mode==='light'?'black':'light'}`}>Evaluation Chain</h5>
                                        <p className="card-text">In this section you can see the evolved form of pokemon.</p>
                                        <Link to="/EvaluationChain" className="btn btn-primary goBtn" onClick={props.getOption} name="EvaluationChain">Go &rarr;</Link>
                                    </div>
                            </div>
                        </div>
                        <div className='col-md-4 my-4'>
                            <div className={`card serviceSec bg-${props.mode==='light'?'light cardShadowD':'black cardShadowW'}`} style={{border:`2px solid ${props.mode==='light'?'black':'white'}`}}>
                                <img src={pokeAbility} className={`card-img-top card-header border-${props.mode==='light'?'light':'dark'}`} alt="Unable to load..."/>
                                    <div className="card-body">
                                        <h5 className={`card-title text-${props.mode==='light'?'black':'light'}`}>Poke Ability</h5>
                                        <p className="card-text">In this section you can see the information about ability.</p>
                                        <Link to="/PokeAbility" className="btn btn-primary goBtn" onClick={props.getOption} name="PokeAbility">Go &rarr;</Link>
                                    </div>
                            </div>
                        </div>
                        <div className='col-md-4 my-4'>
                            <div className={`card serviceSec bg-${props.mode==='light'?'light cardShadowD':'black cardShadowW'}`} style={{border:`2px solid ${props.mode==='light'?'black':'white'}`}}>
                                <img src={guessPokemon} className={`card-img-top card-header border-${props.mode==='light'?'light':'dark'}`} alt="Unable to load..."/>
                                    <div className="card-body">
                                        <h5 className={`card-title text-${props.mode==='light'?'black':'light'}`}>Guess Pokemon</h5>
                                        <p className="card-text">In this section you can play a game of guessing pokemon.</p>
                                        <Link to="/guessGame" className="btn btn-primary goBtn" name="GuessPokemon" onClick={props.getOption}>Go &rarr;</Link>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
