const express=require('express');
const path = require('path');
const router =express.Router();
const utlPath=require('../util/path')
const error= require('../controllers/404')
router.use('',error.notFound)
module.exports=router