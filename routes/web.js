const BlogController=require('../controllers/BlogController')
const express= require('express')
const UserController = require('../controllers/UserController')
const router=express.Router()
const admin_auth=require('../middleware/auth')
//blog controller

router.post('/create',BlogController.create)
router.get('/display',admin_auth,BlogController.display)
router.get('/displayblogbyquery',BlogController.displayBlogByQuery)
router.get('/view/:id',BlogController.view)
router.post('/update/:id',BlogController.update)
router.get('/delete/:id',BlogController.delete)

//user controller

router.post('/register',UserController.userregister)
router.post('/verifylogin',UserController.verifylogin)


module.exports=router;