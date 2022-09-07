const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const cartItem=sequelize.define('cartItem',({
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  qty:{
    type:Sequelize.INTEGER,
    allowNull:false,
    inStock:true
  }
}))
module.exports=cartItem;