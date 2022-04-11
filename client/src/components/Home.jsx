import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons, filterBySource, orderByName, orderByStrength, getTypes, filterByTypes } from "../actions";
import Paginado from "./Paginado";
import Card from "./Card";
import SearchBar from "./SearchBar";
import loading from './images/loading.gif'
import './Home.css';


export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const [/*order*/, setOrder] = useState('');

// Aca me guardo la pag actual y en set para que me lo modifique
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage /*setPokemonsPerPage*/] = useState(12); // quiero que se rendericen 12 pokemons
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    const paginado = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        dispatch(getPokemons());
    }, [dispatch]);//este useEf depende del dispatch, montate y ejecutate CUANDO suceda eso.

    const types = useSelector((state) => state.types);
    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    function handleClick(e) {// CON ESTO RESETEO POR SI SE ME TRABA LA PAGINA, LOS FILTRO POR EJEMOPLO
        e.preventDefault();
        dispatch(getPokemons());
    }

    function handleFilterBySource(e) {
        console.log(e.target.value)
        dispatch(filterBySource(e.target.value))
    }

    function handleFilterByTypes(e) {
        e.preventDefault();
        dispatch(filterByTypes(e.target.value));
    }

    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    };

    function handleOrderByStrength(e) {
        e.preventDefault();
        dispatch(orderByStrength(e.target.value));
        setCurrentPage(1);
        setOrder(`Oredenado ${e.target.value}`);
    }

    return (
        <div>
            <div className="top_nav">
                <h1 className="home_title"> Pokemon App </h1>
                <Link className="link_create" to="/pokemons">Create Pokemon</Link>
                <button className="btn_reload" onClick={(e) => { handleClick(e) }}>Reset all Pokemons</button>
                <SearchBar />
            </div>

            <div className="filters">
                <select onChange={e => handleOrderByName(e)} defaultValue='Order By Name'>
                    <option disabled>Order By Name</option>
                    <option value="asc">From A to Z</option>
                    <option value="desc">From Z to A</option>
                </select>

                <select onChange={e => handleOrderByStrength(e)} defaultValue='Order By Strength'>
                    <option disabled>Order By Strength</option>
                    <option value="lower-strength">Lower Strength</option>
                    <option value="higher-strength">Higher Strength</option>
                </select>

                <select onChange={(e) => handleFilterBySource(e)} defaultValue='Filter By Source'>
                    <option disabled>Filter By Source</option>
                    <option value="All">All</option>
                    <option value="Api">Api</option>
                    <option value="Created">Created</option>
                </select>

                <select onChange={(e) => handleFilterByTypes(e)} defaultValue='Filter By Type'>
                    <option disabled>Filter By Type</option>
                    <option value="All">All Types</option>
                    {types.map((types) => (
                        <option value={types.name} key={types.id}>
                            {types.name}
                        </option>
                    ))}
                </select>


            </div>

            <Paginado
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginado={paginado}
            />

            <div className="cards">
                {currentPokemons.length > 0 ? currentPokemons.map((pokemon) => {
                    return (
                        <Card
                            pokemon={pokemon}
                            key={pokemon.id}
                        />
                    );
                }) : <div className="loading_container">
                    <img src={loading} className='loading' alt="loading please wait" />
                    <br />
                    <h1 className="loading_title"> Loading... </h1>
                </div>
                }
            </div>
        </div>
    )
};
