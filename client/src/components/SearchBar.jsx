import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonName } from '../actions';// me importo la accion 
import './SearchBar.css';

export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState('');// estado local se searchbar lo seteo en un string vacio
    
    function handleInputChange (e) {// tengo que guardar en mi estado local lo que vaya apareciendo en este input
        e.preventDefault();
        setName('')
        setName(e.target.value);
    }

    function handleSubmit (e) {
        e.preventDefault();
        if (name.length > 0) {
            dispatch(getPokemonName(name));// este name es mi estado local, lo que voy tipiando se va a ir guardando en ese
                                           // estado local name, y esto le llega a mi accion, que va a llamar al back y le va a pasar lo que el usuario esta escribiendo
            setName('');
            document.getElementById("search").value = ""
        }else{
            alert('¡Write a Pokemon!')
        }          
    }  


    return (
        <div className="search_bar">
            <input id='search' type="text" placeholder='Write a pokemon...' onChange={(e) => handleInputChange(e)}/>
            <button className='btn_search' type='submit' onClick={(e) => handleSubmit(e)}>Enter</button>
        </div>
    )
}

// type text porque ingreso un texto (input)