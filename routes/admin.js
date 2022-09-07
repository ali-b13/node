const express=require('express');
const path =require('path')
const router= express.Router();

const admin =require('../controllers/admin/adminController')
router.get('/add-product',admin.adminPage)
router.post('/registered',admin.addProduct)
router.get('/edit-product/:productId',admin.getEditProduct)
router.post('/edit-product',admin.EditPostProduct)
router.get('/admin-products',admin.getAllProducts)
router.post('/delete-product',admin.deleteProduct)
exports.routes=router;

