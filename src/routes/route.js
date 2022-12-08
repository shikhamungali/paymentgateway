const express = require("express")
const router = express.Router()
const {authentication,authorization,authorize}=require("../middleware/auth")
const {roles,userData} =require("../model/userModel")
const{createUser,loginUser}=require("../controller/userController")
const{createBlogs,getBlogs}= require("../controller/blogController")
const {upload}=require("../aws/aws")



router.post("/register",createUser)
router.post('/login', loginUser)
router.post('/blogs/:userId',authentication,authorize([roles.ADMIN]),upload.array("file"),authorization,createBlogs)
router.post('/blogs',upload.array("file"),createBlogs)
router.get('/blogs',getBlogs)

module.exports = router
