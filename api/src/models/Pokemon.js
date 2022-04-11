const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,// para general un clave alfanumerica para que no se repita jamas
      defaultValue: DataTypes.UUIDV4,// version mas actualizada
      allowNull: false,// porque no puede estar vacio
      primaryKey: true,// es la clave primaria de mi tabla
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(500),// VER BIEN
      allowNull: false,
      defaultValue:
        "https://pokemon-the-wiki.herokuapp.com/pokemons/image/default-pokemon",
    },
    life: {
      type: DataTypes.INTEGER
    },
    strong: {
      type: DataTypes.STRING,
    },
    defense: {
      type: DataTypes.INTEGER,
    },
    speed: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    createdInDb: {// si viene de la api va ser false, si lo creo y lo guardo en la db va ser true
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },

  },
    {
      timestamps: false,
    }
  );
};
