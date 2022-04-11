const axios = require('axios');
const { Router } = require("express");
const { Type } = require("../db")

const router = Router();

router.get('/types', async (req, res) => {
    try {
        let apiTypes = await axios.get('https://pokeapi.co/api/v2/type');
        let types = apiTypes.data.results.map(p => p.name);

        types.forEach(type => {
            Type.findOrCreate({
                where: { name: type }
            })
        })
        let allTypes = await Type.findAll();
        res.status(200).send(allTypes);
    } catch (error) {
        res.send(error)
    }
});


module.exports = router;