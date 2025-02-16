import mongoose from "mongoose";


const ProfileShema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    age:{type:Number,required:true,min:0},
    gender:{type:String,required:true, enum:["Male","Female"]},
    adhaarNo:{type:Number,required:true,unique:true},
    phoneNo:{type:Number,required:true,unique:true},
    address:{type:String,required:true},
    image: { type: String, default: "" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User",  }

})

const Profile = mongoose.model('Profile',ProfileShema);

export default Profile