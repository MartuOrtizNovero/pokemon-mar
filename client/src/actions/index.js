import axios from 'axios';



export function getPokemons() {
    return async function(dispatch) {
        let pokemons = await axios.get('http://localhost:3001/pokemons');// ACA SUCEDE TODA LA CONECCION DEL FRONT Y EL BACK
        return dispatch({
            type: 'GET_POKEMONS',
            payload: pokemons.data
        });
    };
};


export function filterBySource(payload) {
    return {
        type: 'FILTER_BY_SOURCE',
        payload
    }
};

export function getTypes(){
    return async function(distpach){
    try {
        const allTypes = await axios.get("http://localhost:3001/types");
        return distpach({
            type: 'GET_TYPES',
            payload: allTypes.data
        })
    } catch (error) {
        return(error)
    }       
    }
}

export function postPokemon (payload) { // ACA LA ACTION NO UTILIZA EL DISPACH
    return async function () {
        const info = await axios.post('http://localhost:3001/pokemons', payload);// en esta ruta hago el POST del payload o sea de la info que le estoy mandando
        return info;
    }
}

export function filterByTypes(payload){
    return {
            type: 'FILTER_BY_TYPES',
            payload
        }
};

export function orderByName (payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
};

export function orderByStrength(payload) {
    return {
        type: "ORDER_BY_STRENGTH",
        payload,
    };
};

export function getPokemonName(payload) {
    return async function (dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/pokemons?name=' + payload);
            return dispatch({
                type: 'GET_POKEMON_NAME',
                payload: json.data
            })
        } catch (err) {
            console.log(err)
            return dispatch({
                type: 'GET_POKEMON_NAME',
                payload: []
            })
        }
    }
}

export function getDetails(id) {
    return async function (dispatch) {
        try {
            let pokemon = await axios.get('http://localhost:3001/pokemons/' + id)
            console.log(pokemon)
            return dispatch({
                type: 'GET_DETAILS',
                payload: pokemon.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export function cleanDetails() {
            return ({
                type: 'CLEAN_DETAILS',
                payload: []
            })
    }

