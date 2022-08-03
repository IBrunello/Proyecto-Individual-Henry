const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    sequelize.define('type', {
        id:{
            primaryKey:true,
            allowNull:false,
            type:DataTypes.INTEGER
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        }
},{timestamps:false});
};