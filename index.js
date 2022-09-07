const express=require('express');
const app =express();
const path=require('path')
app.use(express.urlencoded({
  extended:true
}))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
const port=2400
const notFound= require('./routes/notFoundPage')
const homeRouter=require('./routes/Home')
const adminRouter =require('./routes/admin')
// const hbs=require('express-handlebars')
// app.engine('hbs',hbs())
// const sequelize=require('./util/database')
// const product =require('./models/Product');
// const User =require('./models/User');
// const Cart =require('./models/Cart');
// const cartItem=require('./models/Cart-item');
// const Order=require('./models/Order')
// const OrderItem=require('./models/order-item')
app.set('view engine','ejs');
app.set('views','views')
const utilPath=require('./util/path')
app.use((req,res,next)=>{
  // User.findByPk(1).then((user)=>{
  //   req.user=user;
  //   next()
  //  }).catch(err=>console.log(err))
})
// app.use(homeRouter)
// app.use(adminRouter.routes)
// app.use(notFound)


// product.belongsTo(User,{constrains:true,onDelete:"cascade"});
// User.hasMany(product);
// User.hasOne(Cart)
// Cart.belongsTo(User);
// Cart.belongsToMany(product,{through:cartItem});
// product.belongsToMany(Cart,{through:cartItem})
// Order.belongsTo(User)
// User.hasMany(Order);
// Order.belongsToMany(product,{through:OrderItem})
const mongo=require('./util/Mongo')


// sequelize.sync().then((res)=>{
//   return User.findByPk(1)
// }).then((user)=>{
//   if(!user){
//   return   User.create({username:"Alibinmro12",email:'alibin@gmail.com'})
//   }
//   return user;
// }).then((user)=>{
// return user.createCart()
 
// })
// .then(()=>{
//   app.listen(port,()=>{console.log(`server is working on ${port}`)})
// }).catch(err=>console.log(err))
  
// app.listen(port,()=>{console.log(`server is working on ${port}`)})

mongo((client)=>{
  console.log(client)
  app.listen(port,()=>{console.log(`server is working on ${port}`)})
})