const {Schema , model} = require("mongoose");
const {createHmac ,randomBytes} = require("crypto");
const { createTokenForUser } = require("../services/auth");

const userSchema = new Schema(
    {
        username:{
            type: String,
            required : true,
        }
        ,
        password:{
            type: String,
            required:true
        },
        salt:{
            type:String
        }
        ,
        email:{
            type: String,
            required:true
        }
        ,profileImageURL:{
            type:String,
            default: "/images/default.png",
        }
    },
    {timestamps:true}
)

//use pre function of mongoose
userSchema.pre("save" ,function(next){

    const user = this;

    if(!user.isModified("password")) return

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256" ,salt)
    .update(user.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

userSchema.static("matchPasswordAndCreateToken" ,async function(email,password) {
    //find email
    const user = await this.findOne({email})

    if(!user) return {success: false, error: "User not found"}

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256" ,salt)
    .update(password)
    .digest("hex");

    if(hashedPassword !== userProvidedHash){
        return {success: false, error: "Wrong Password"};
    }
    const token = createTokenForUser(user);
    return token;
})

const User = model('newuser' , userSchema);

module.exports= User;