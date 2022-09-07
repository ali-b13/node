 const Sequelize=require('sequelize');
const sequelize= new Sequelize('shop_node','root','alib13',{dialect:'mysql',host:'localhost'})
module.exports=sequelize