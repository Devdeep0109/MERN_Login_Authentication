require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.secret;

function createTokenForUser(user){

    //make a payload..
    const payload ={
        _id : user._id,
        email : user.email,
        profileImageURL : user.profileImageURL,
        username : user.username,
        role : user.role 
    }
    console.log(process.env.secret);
    const token = jwt.sign(payload ,secret);
    return token;
}

function validateToken(token){
    const payload = jwt.verify(token ,secret);
    return payload;
}

module.exports ={
    validateToken,
    createTokenForUser
}