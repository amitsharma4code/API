const BlogController=require('../controllers/BlogController')
const express= require('express')
const UserController = require('../controllers/UserController')
const router=express.Router()
const admin_auth=require('../middleware/auth')
//blog controller

router.post('/create',BlogController.create)
router.get('/display',BlogController.display)
router.get('/displayblogbyquery',BlogController.displayBlogByQuery)
router.get('/view/:id',BlogController.view)
router.post('/update/:id',BlogController.update)
router.get('/delete/:id',BlogController.delete)
router.get('/display/cat/top',BlogController.viewTopCat)
router.get('/display/cat/gadget',BlogController.ViewGadgets)

//user controller

router.post('/register',UserController.userregister)
router.post('/verifylogin',UserController.verifylogin)

module.exports=router;