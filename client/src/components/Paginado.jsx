import React from 'react';
import './Paginado.css';

export default function Paginado ({pokemonsPerPage, allPokemons, paginado}) {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumber.push(i);
    };

    return(
            <nav>
                <ul className="paginado">
                    { pageNumber && 
                    pageNumber.map(number => (
                        <li className="li" key={number}>
                            <button onClick={() => paginado(number)}>{number}</button>
                        </li>
                    ))}
                </ul>
            </nav>
    );
};