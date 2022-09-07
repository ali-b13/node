const Sequelize=require('sequelize');
const sequelize=require('../util/database')
const product= sequelize.define('product',{
  id:{
    type:Sequelize.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
  },
  title:Sequelize.STRING,
  price:{
    type:Sequelize.DOUBLE,
    allowNull:false
  },
  qty:{
      type:Sequelize.INTEGER,
      allowNull:false
  },
  image:{
    type:Sequelize.STRING,
    allowNull:false
  },
  description:{
    type:Sequelize.STRING,
    allowNull:false
  }

});
module.exports=product