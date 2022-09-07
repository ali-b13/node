const ProductModel =require('../../models/Product')
exports.adminPage=(req,res)=>{
  res.render('ejs/admin/edit-product',{path:'/add-product',title:"add product",editing:false})
}
exports.addProduct=(req,res)=>{
  console.log('req of user',req.user.dataValues)
  console.log('add register',req.body)
  const title =req.body.title;
  const img =req.body.image;
  const qty =req.body.qty;
  const price =req.body.price;
  const description=req.body.description
  ProductModel.create({
    title:title,
    price:price,
    image:img,
    qty:qty,
    description:description,
    userId:req.user.id
   }).then(()=>{
    res.redirect('/')
   }).catch((err)=>console.log(err))
 
  console.log('successful got registered ')
 
 
}

exports.getEditProduct=(req,res)=>{
  const editMode=req.query.edit
  console.log(typeof editMode)
  const id= req.params.productId;
  if(!editMode  ){
    return res.redirect('/')
  }
  console.log('id product is',id)
  ProductModel.findByPk(id).then(product=>{
    res.render('ejs/admin/edit-product',{path:'/add-product',title:"edit product",product:product,editing:editMode})
  }).catch(err=>console.log(err))
}
exports.EditPostProduct=(req,res,next)=>{

const id= req.body.id

const updatedTitle=req.body.title;
const updatedImage=req.body.image;
const updatedPrice=req.body.price;
const updatedQty=req.body.qty;
const updatedDescription=req.body.description;
ProductModel.findByPk(id).then(product=>{
  product.title=updatedTitle;
  product.image=updatedImage;
  product.price=updatedPrice;
  product.qty=updatedQty;
  product.description=updatedDescription;
  return product.save()
}
).then(()=>{console.log('updated successfully')
res.redirect('/admin-products')
}).catch(err=>console.log(err))

  
}
exports.getAllProducts =(req,res ,next)=>{
  ProductModel.findAll().then(products=>{
    res.render('ejs/admin/all-products',{data:products,path:'/all-products',title:'Admin'})
  }).catch(err=>console.log(err))
  
};

exports.deleteProduct=(req,res,next)=>{
  const productId=req.body.id
  ProductModel.findByPk(productId).then((product)=>{
    return product.destroy();
  }).then(()=>{
    res.redirect('/admin-products')
  })
  .catch(err=>console.log(err))

 
}
