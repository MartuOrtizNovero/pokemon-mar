const { Router } = require("express");

const pokemonRoutes = require("./pokemons");
const typeRoutes = require("./types");


const router = Router();

router.use("/", pokemonRoutes);
router.use("/", typeRoutes);


module.exports = router;

