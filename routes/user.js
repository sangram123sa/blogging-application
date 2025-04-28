const {Router} = require('express');
const User = require("../models/user")

const router = Router()

router.post("/signup", async (req, res)=>{
    const {fullName, email, password} = req.body;
    console.log(req.body)
    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect("/")
})

router.post("/signin", async(req, res)=>{
    const {email, password} = req.body
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password)
        if (token) {
            console.log("token", token)
        }
        return res.cookie("token", token).redirect("/")
    } catch (error) {
        return res.render("signin", {
            error : "Incorrect password"
        })
    }
})

module.exports = router