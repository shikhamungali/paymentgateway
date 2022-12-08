const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")
// const blogModel = require('../model/blogModel')

let authentication = async (req, res, next) => {
    try {
        let bearerHeader = req.headers.authorization;
        if (typeof bearerHeader == "undefined") {
            return res.status(401).send({ status: false, message: "Token is missing! please enter token." });
        }
        let bearerToken = bearerHeader.split(' ')
       let token = bearerToken[1];
        jwt.verify(token, "task", function (error, data) {
            if (error && error.message == "jwt expired") {
                return res.status(401).send({ status: false, message: "Session expired! Please login again." })
            }
            if (error) {
                return res.status(401).send({ status: false, message: "Incorrect token" })
            }
            else {
                req.decodedToken = data.userId;
                req.role = data.roles
                next()
            }
        });
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
}






    function authorize(roles = []) {
        if (typeof roles === 'string') {
            roles = [roles];
        }
        return [
           ( async (req, res, next) => {
                // console.log(req.role)
                // console
                if (roles.length && !roles.includes(req.role)) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                next();
            })]
        
    }






let authorization = async function (req, res, next) {
    try {
        let userid = req.params.userId
        let validUser = req.decodedToken 
        
        let user = await userModel.userData.findById(userid)
        if (user) {
            let users = user._id.toString()
            if (users !== validUser) {
                return res.status(403).send({ status: false, message: "Sorry! Unauthorized User" })
            }
            next()
        }
        else {
            return res.status(404).send({ status: false, message: "user not found or userId does not exist" })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

module.exports ={authorization,authentication,authorize}