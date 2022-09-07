const cartModel =require('../../models/Cart')
const ProductModel =require('../../models/Product');
exports.getProducts=(req,res,nex)=>{
   ProductModel.findAll().then((data)=>{
    
      res.render('ejs/shop/ejsHome',{data:data,path:'/products',title:'products'})
   }).catch(err=>console.log(err))
   
}
exports.getProduct=(req,res,nex)=>{
    const product_id =req.params.id;
    ProductModel.findAll({where:{id:product_id}}).then(products=>{
      res.render('ejs/shop/product-details',{title:'product details',data:products[0],path:'/products'})
    }).catch(err=>console.log(err))
   //  ProductModel.findByPk(product_id).then((data)=>{
   //    console.log(data)
   //    res.render('ejs/shop/product-details',{title:'product details',data:data,path:'/products'})
   //  }).catch((err)=>console.log(err))
}
exports.getIndx=(req,res,next)=>{
   ProductModel.findAll().then((data)=>{
      res.render('ejs/shop/index',{data:data,path:'/',title:'products'})
   }).catch(err=>console.log(err))
   
}

exports.cart= (req,res,next)=>{
 req.user.getCart().then((cart)=>{
   return cart.getProducts()
 }).then((products=>{
   console.log(products,'my cart')
   res.render('ejs/shop/cart',{path:'/cart',title:'cart',arrCart:products})
 })).catch((err)=>console.log(err))
   // req.user.getCart().then((cart)=>{
   // console.log(cart)
   // }).catch(err=>console.log(err))
//  cartModel.getAllCartProducts(cart=>{
//    ProductModel.fetchProducts(allProducts=>{
//       const arrCart=[]
//       for(let item of allProducts){
//          const cartProductData= cart.cartProducts.find(cartProduct=> cartProduct.id ==item.id)
//        if(cartProductData){
//          arrCart.push({item,qty:cartProductData.qty})
//        }
//       }console.log('final products',arrCart)
//       res.render('ejs/shop/cart',{path:'/cart',title:'cart',arrCart:arrCart,total:cart.totalPrice})
//    })
//  })

  
}
exports.deleteFromCart=(req,res,next)=>{
const id =req.body.id;
 req.user.getCart().then((cart)=>{
   cart.getProducts({where:{id:id}}).then((products)=>{
      const product=products[0];
      return product.cartItem.destroy()
   }).then(()=>{res.redirect('/cart')}).catch(err=>console.log(err))
 }).catch(err=>console.log(err))
}
exports.postCart=(req,res,next)=>{
   const productId =req.body.productId;
   let newCart
   let newQty=1;
   console.log(productId,'id of product')
    req.user.getCart().then((cart)=>{
      console.log(cart,'the cart')
      newCart=cart
      return cart.getProducts({where:{id:productId}});
    }).then(products=>{
      let product;
    if(products.length>0){
      
       product=products[0]
    }
    
    if(product){
      console.log(product.cartItem.qty,'my qty will')
      const oldQty=product.cartItem.qty;
      newQty=oldQty+1
      
    }
    return ProductModel.findByPk(productId)
    .then((product)=>{
      return newCart.addProduct(product,{through:{qty:newQty}})
    }).catch((err)=>console.log(err))
    }).then(()=>{
      res.redirect('/cart')
    }).catch(err=>console.log(err))
}
exports.PostOrder= (req,res,next)=>{
   let fetchedCart;
   req.user.getCart().then((cart)=>{
      fetchedCart=cart;
 return  cart.getProducts()}).then((products)=>{
   return req.user.createOrder().then((order)=>{
      order.addProducts(products.map((product)=>{
         product.orderItem={qty:product.cartItem.qty}
        return product;
      })
      )
   }).then((result)=>{console.log(result)
  return  fetchedCart.setProducts(null)
   }).then(()=>{
      res.redirect('/orders')
   }).catch(err=>console.log(err))
 }).catch(err=>console.log(err))
   
}
exports.getOrder= (req,res,next)=>{
   req.user.getOrders({include:'products'}).then((orders)=>{
      console.log('orders',orders)
      res.render('ejs/shop/orders',{path:'/orders',title:'orders',orders:orders})
   }).catch(err=>console.log(err))
   
}

exports.checkout= (req,res,next)=>{
   res.render('ejs/shop/checkout',{path:'/checkout',title:'Cart'})
}