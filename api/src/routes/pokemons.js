const axios = require('axios');
const { Router } = require("express");
const { Pokemon, Type } = require("../db")



const dbPokemon = async () => {
    try {
        return await Pokemon.findAll({ // traeme todo lo que tengas en el modelo Pokemon e incluime el nombre del tipo del modelo type
            include: {
                model: Type,
                attributes: ['name']
            }
        })
    } catch (error) {
        return error;
    }
}

const apiPokemon = async () => {//HACEMOS LOS PEDIDOS A LA API Y NOS TRAEMOS LOS POKEMONES

    try {
        let arrPokemons = [];
        let pokemons = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40");// me traigo 20 pokemons
        let dataPokemons = pokemons.data.results.map(p => axios.get(p.url));// aca lo pasa a promesa porque hay otra URL 
        let results = await Promise.all(dataPokemons).then(response=> {
            response.map(p => {
                arrPokemons.push({
                    id: p.data.id.toString(),
                    name: p.data.name,
                    life: p.data.stats[0].base_stat,
                    strong: p.data.stats[1].base_stat,
                    defense: p.data.stats[2].base_stat,
                    speed: p.data.stats[5].base_stat,
                    height: p.data.height,
                    weight: p.data.weight,
                    types: p.data.types.map(el => el.type.name),
                    img: p.data.sprites.other.dream_world.front_default,
                    createdInDb: false
                    //types : e.data.types(obj => obj) 
                })
            })
            return arrPokemons; // array de objetos con los detalles de pokemones
        })

        return results;// ver de sacarlo

    } catch (error) {
        return error;
    }
}
// ACA UNIMOS LA DB CON LA API --> TODOS LOS POKEMONES
const getAllPokemon = async () => {
    try {
        const pokemonApi = await apiPokemon();
        const pokemonDb = await dbPokemon();
        const pokemons = await pokemonDb.concat(pokemonApi);
        return pokemons;
    } catch (error) {
        return error
    }
}

//----------------------------------------------------  RUTAS  -----------------------------------------------------------------------------------------------------------

const router = Router();

router.get("/pokemons", async (req, res) => {// aca resumimos 2 rutas en una , la principal y la de query

    try {
        let { name } = req.query;
        let pokeTotal = await getAllPokemon();
        if (name) {
            let pokeName = await pokeTotal.filter(p => p.name.toLowerCase() === name.toLowerCase());
            pokeName.length ?
                res.status(200).send(pokeName) :
                res.status(404).send("Escribre el nombre correctamente")
        } else {
            res.status(200).send(pokeTotal)
        }
    } catch (error) {
        res.send(error)
    }
})

router.get("/pokemons/:id", async (req, res) => {
    let id = req.params.id;
   
    try {
        let pokemons = await getAllPokemon();
        let pokemon = pokemons.find(p => p.id=== id);// ESTUDIAR LOS METODOS QUE ME DEVUELVEN

        if (pokemon) {
            return res.status(200).send(pokemon)
        } else {
            return res.status(404).send("No hay pokemon con ese ID")
        }
    } catch (error) {
        res.send(error)
    }
})

router.post('/pokemons', async (req, res) => {
    try {
        let { name, hp, attack, defense, speed, height, weight, image, types, createdInDb } = req.body

        let newPokemon = await Pokemon.create({
            name,
            life : hp,
            strong : attack,
            defense,
            speed,
            height,
            weight,
            img: image ? image : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/769px-Pokebola-pokeball-png-0.png",
            createdInDb
        })

        let typesDb = await Type.findAll({
            where: { name: types }
        });

        newPokemon.addType(typesDb); // metodo sequelize

        res.status(200).send('¡Pokemon creado con exito!');
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;// para que mi servidor pueda trabajar con el router