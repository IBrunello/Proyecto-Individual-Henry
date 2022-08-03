const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      primaryKey:true,
      type:DataTypes.STRING,
      allowNull:false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp:{
      type:DataTypes.INTEGER,
    },
    attack:{
      type:DataTypes.INTEGER
    },
    defense:{
      type:DataTypes.INTEGER,
    },
    speed:{
      type:DataTypes.INTEGER,
    },
    sprite:{
      type:DataTypes.STRING
    },
    height:{
      type:DataTypes.INTEGER,
    },
    weight:{
      type:DataTypes.INTEGER,
    },
  },{timestamps:false});
};
