const mongoose=require('mongoose');

const postSchema = new mongoose.Schema({
    title:{type:String ,require:true},
    description:{type:String,require:true},
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'users',require:true},
    likeCount:{type:Number,require:true,default:0},
    commentCount:{type:Number,require:true,default:0},
    comments:[{type: mongoose.Schema.Types.ObjectId, ref: 'comments'}],
    createdAt: { type: Date, immutable: true, default: () => new Date() },
    updatedAt: { type: Date, default: new Date() }
})



module.exports=mongoose.model('posts',postSchema);
