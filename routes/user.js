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
    const user = await User.matchPassword(email, password)
    if (user) {
        console.log("User", user.email)
    }
    return res.redirect("/")
})

module.exports = router