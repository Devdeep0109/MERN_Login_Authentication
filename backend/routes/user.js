const {Router} = require("express");
const User = require("../model/user");


const router = Router();
//SIGN UP......................
router.post('/signup' , async(req ,res) =>{

    const {username,password,email} = req.body;

    console.log("userName" + username);

    try{
        await User.create({
            username,
            password,
            email
        }).then(e => res.json(e))
    }
    catch{
        res.status(500).json("something went wrong");
    }
})


// SIGN IN .............
router.post('/signin' , (req ,res) =>{
    const {email,password} = req.body;
    User.findOne({email,password})
    .then(user =>{
        if(user){
            if(user.password === password){
                res.status(200).json("success");
            }
            else{
                res.status(400).json("wrong password")
            }
        }
        else{
            res.json(400).json("No user found");
        }
    })
})


module.exports= router;
