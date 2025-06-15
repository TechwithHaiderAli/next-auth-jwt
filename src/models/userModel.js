
import mongoose,{Schema} from "mongoose";


const UserSchema=new Schema({
    username:{
        type:String,
        required :true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isVerified:{
        type:Boolean,
        default:false,

    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    VerifyToken:String,
    VerifyExpiry:Date

}) ;

const User=mongoose.models.User || mongoose.model("User",UserSchema)

export default User