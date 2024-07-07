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
router.post('/signin' , async (req ,res) =>{
    try{
        const {email,password} = req.body;
        const token = await User.matchPasswordAndCreateToken(email,password);

        //make cookie....
        if(token.success === false){
            res.status(400).json(token.error);
        }
        else{
            res.status(200).json(token);
        }
    }
    catch(err){
        return res.err;
    }
})


module.exports= router;
