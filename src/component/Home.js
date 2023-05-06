import React from 'react';
import image1 from '../images/image1.png';
import image2 from '../images/image2.jpg';
import image3 from "../images/image3.jpg";
import Service from './Service.js';


export default function Carousal(props) {
    return (
        <>
            <div id="carouselExampleCaptions" className={`carousel slide border-${props.mode==='light'?'light':'dark'}`} data-bs-ride="false">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={image1} className="d-block w-100" alt="..."/>
                            <div className="carousel-caption">
                                <h5 className={`badge rounded-pill text-${props.mode==='light'?'black':'light'} bg-info text-wrap`} style={{fontSize:"30px"}}>Get ready to tour in <i>PokeWorld</i>.</h5>
                            </div>
                    </div>
                    <div className="carousel-item">
                        <img src={image2} className="d-block w-100" alt="..."/>
                            <div className="carousel-caption">
                                <h5 className={`badge rounded-pill text-${props.mode==='light'?'black':'light'} bg-info text-wrap`} style={{fontSize:"30px"}}>Let`s fight together.</h5>
                            </div>
                    </div>
                    <div className="carousel-item">
                        <img src={image3} className="d-block w-100" alt="..."/>
                            <div className="carousel-caption">
                            <h5 className={`badge rounded-pill text-${props.mode==='light'?'black':'light'} bg-info text-wrap`} style={{fontSize:"30px"}}>Let`s win together.</h5>
                            </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <Service mode={props.mode} getOption={props.getOption}/>
        </>
    )
}
