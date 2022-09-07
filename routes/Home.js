const express =require('express')

const router =express.Router();
const shopController=require('../controllers/shop/shop')
router.get('/',shopController.getIndx)

router.get('/products',shopController.getProducts)
router.get('/products/:id',shopController.getProduct)
router.get('/cart',shopController.cart)
router.post('/cart',shopController.postCart)
router.post('/cart-deleteItem',shopController.deleteFromCart)
router.post('/create-order',shopController.PostOrder)
router.get('/orders',shopController.getOrder)
router.get('/cart/checkout',shopController.checkout)
module.exports= router