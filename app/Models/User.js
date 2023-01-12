const mongoose=require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    followers:{type:Number,default:0},
    followings:{type:Number,default:0},
    createdAt: { type: Date, immutable: true, default: () => new Date() },
    updatedAt: { type: Date, default: new Date() }
})

module.exports=mongoose.model('users',UserSchema);
