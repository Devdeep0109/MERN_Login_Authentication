const {validateToken} = require("../services/auth");

function checkForAuthenticationCookie(cookieName){
    return(req,res,next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
            next();
        }
        try{
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        }   
        catch(err){
        }     
        next();
    }
}

module.exports = {
    checkForAuthenticationCookie,
}