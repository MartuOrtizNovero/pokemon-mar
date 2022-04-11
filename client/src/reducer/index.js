const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    details: {},
    filterBySource: [],
    filterByType: [],
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,// en mi state que al principio esta vacio, metele todo lo que te mande la action
                allPokemons: action.payload
            };
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            };
        case 'FILTER_BY_SOURCE':
            const pokemons = state.filterByType.length > 0 ? state.filterByType : state.allPokemons;
            const filterSource = action.payload === 'Created' ? pokemons.filter(el => el.createdInDb) : pokemons.filter(el => !el.createdInDb)
            return {
                ...state,
                filterBySource: filterSource,
                pokemons: action.payload === 'All' && state.filterByType.length === 0 ? state.allPokemons : filterSource,
                filterByType: [],

            };
        /* case 'FILTER_BY_SOURCE':
            const allPokemons = state.allPokemons;
            const filterSource = action.payload === 'Created' ? allPokemons.filter(el => el.createdInDb) : allPokemons.filter(el => !el.createdInDb) 
            return {
                ...state,
                pokemons: action.payload === 'All' ? state.allPokemons : filterSource
            }; */
        case 'FILTER_BY_TYPES':
            const filterTypes = state.filterBySource.length > 0 ? state.filterBySource : state.allPokemons
            const filterType =
                action.payload === "All"
                    ? filterTypes.filter((pokemon) => pokemon.types.length > 0)
                    : filterTypes.filter(
                        (pokemon) =>
                            pokemon.types &&
                            pokemon.types
                                .map((types) => types.name ? types.name : types)
                                .includes(action.payload)
                    );
            return {
                ...state,
                filterByType: filterType,
                pokemons: filterType,
                filterBySource: [],

            };
        case 'ORDER_BY_NAME':
            let sortedArray = action.payload === 'asc' ?
                state.pokemons.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) :
                state.pokemons.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                pokemons: sortedArray
            };
        case "ORDER_BY_STRENGTH":
            let orderByStrength =
                action.payload === "higher-strength"
                    ? state.pokemons.sort((a, b) => {
                        return b.strong - a.strong;
                    })
                    : state.pokemons.sort((a, b) => {
                        return a.strong - b.strong;
                    });
            return {
                ...state,
                pokemons: orderByStrength,
            };
        case 'GET_POKEMON_NAME':
            return {
                ...state,
                pokemons: action.payload
            };
        case 'GET_DETAILS':
            return {
                ...state,
                details: action.payload
            };
        case 'CLEAN_DETAILS':
            return {
                ...state,
                details: action.payload
            };
        case 'POST_POKEMON':// no hace nada 
            return {
                ...state,
            };
        default:
            return state;
    };
};

export default reducer;