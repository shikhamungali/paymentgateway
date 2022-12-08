const jwt = require("jsonwebtoken")
const {userData} = require("../model/userModel")
const bcrypt = require("bcrypt")
// const blogModel = require('../model/blogModel')
let emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
let passwordRegex=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/



let createUser = async function (req,res){
try{
    let data = req.body
    let{fname,lname,email,phone,password,roles}=data
    if (!fname) return res.status(400).send({ status: false, msg: "fname is mandatory" })
    if (!lname) return res.status(400).send({ status: false, msg: "lname is mandatory" })

    if (!email) return res.status(400).send({ status: false, msg: "email is mandatory" })
    if(!email.match(emailRegex))return res.status(400).send({ status: false, msg: "invalid email format" })

    if (!password) return res.status(400).send({ status: false, msg: "passowrd is mandatory" })
    if(!password.match(passwordRegex))return res.status(400).send({ status: false, msg: "invalid password format" })
    data.password = await bcrypt.hash(password, 10)

    if (!phone) return res.status(400).send({ status: false, msg: "phone is mandatory" })
    if(!/^[6-9]\d{9}$/.test(phone))return res.status(400).send({ status: false, msg: "invalid format of mobile number" })

    if(roles){
        if(!["admin","user"].includes(roles)){
            return res.status(400).send({ status: false, message: "roles should be admin or user" });
        }
    }

    let dataCreated = await userData.create(data)
    res.status(200).send({status:true,data:dataCreated})
}
catch(err){
res.status(500).send({status:false,message:err.message})
}
}




let loginUser = async function (req,res){
    try{
        let data = req.body
        let {email,password}=data

        if (!email) return res.status(400).send({ status: false, msg: "email is mandatory" })
        if(!email.match(emailRegex))return res.status(400).send({ status: false, msg: "invalid email format" })
    
        if (!password) return res.status(400).send({ status: false, msg: "password is mandatory" })
        if(!passwordRegex.test(password))return res.status(400).send({ status: false, msg: "invalid password format" })

        let user = await userData.findOne({ email:email});
        if (!user) {
            return res.status(404).send({ status: false, message: "User Not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).send({ status: false, message: "wrong password" })
        }
    

        let token = jwt.sign({ "userId": user._id ,"roles":user.roles[0]}, "task", { expiresIn: '24h' });
        
        res.status(200).send({status:true,message:"login sucessfully",data:token})
    
    }
    catch(err){
    res.status(500).send({status:false,message:err.message})
    }
    }

   



module.exports={createUser,loginUser}