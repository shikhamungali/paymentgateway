
// const userModel = require("../model/usermodel")
const blogModel = require('../model/blogModel')


let createBlogs = async function (req, res) {
    try {
        let data = req.body
        let { title, blog } = data

        if (!title) return res.status(400).send({ status: false, msg: "title is mandatory" })
        if (!blog) return res.status(400).send({ status: false, msg: "blog is mandatory" })
        let location = []
        for (let i = 0; i < req.files.length; i++) {
            location.push(req.files[i].location)
        }
        data.image = location
        // console.log(req.files[0].location);
        let dataCreated = await blogModel.create(data)
        res.status(201).send({ status: true, data: dataCreated })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


let getBlogs = async function (req, res) {
    try {
        let blogs = await blogModel.find()
        res.status(200).send({ status: true, data: blogs })
    }
    catch (err) { }
}

module.exports = { createBlogs, getBlogs }