import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, cleanDetails } from '../actions';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import './Details.css'

export default function Detail (props) {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getDetails(params.id))
    }, [params.id, dispatch]);

    const pokemon = useSelector((state) => state.details);
 console.log(pokemon)
    function cleanSubmit (e) {
        e.preventDefault();
        dispatch(cleanDetails())
        navigate('/home')
    }

    return (
        <div>
            {
                 Object.keys(pokemon).length?
                <div className="container">                   
                    <div className="left">
                        <h1 className="name1">NAME <br /> {pokemon.name.toUpperCase()}</h1>
                        <img src={pokemon.img} alt="pokemon" width='380px' height='450px' />
                    </div>
                        <div className="right">
                        <h4>TYPES: {pokemon.types.map(t => t.name? t.name + " " : t + " ")}</h4>
                        <h4>HP: {pokemon.life}</h4>
                        <h4>ATTACK: {pokemon.strong}</h4>
                        <h4>DEFENSE: {pokemon.defense}</h4>
                        <h4>SPEED: {pokemon.speed}</h4>
                        <h4>HEIGHT: {pokemon.height}</h4>
                        <h4>WEIGHT: {pokemon.weight}</h4>
                        <h3 className='id1'>ID <br /> {pokemon.id}</h3>
                    </div>
                    <div className="boton">
                        <Link to = '/home'>
                            <button onClick={(e) => cleanSubmit(e)} className='boton_home'>Return to Home</button>    
                        </Link>
                    </div>
                </div>
                :
                <div>
                        <h1 className="loadingTitle">Loading...</h1>
                        <h4 className="please">please wait..</h4>
                </div>
            }
            
        </div>
    )
}