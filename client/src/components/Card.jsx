import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export default function Card ({pokemon}) {
    
    return (
        <div className='card'>
            <img className='image' src={pokemon.img} alt='img not found' width="170px" height="180px"/>
            <div className='content'>
                <h4 className='name'>NAME</h4>
                <h3>{pokemon.name}</h3>
                <h4 className='types'>TYPES</h4>
                <h5>{pokemon.types.map(t => t.name? t.name + " " : t + " ")}</h5>
                <Link className='readmore' to={"/pokemons/" + pokemon.id}>Read More</Link>
            </div>        
        </div>
    );
};
