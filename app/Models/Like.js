const mongoose=require('mongoose');

const likeSchema = new mongoose.Schema({
    postId:{type: mongoose.Schema.Types.ObjectId, ref: 'posts',require:true},
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'users',require:true},
    createdAt: { type: Date, immutable: true, default: () => new Date() },
    updatedAt: { type: Date, default: new Date() }
})


module.exports=mongoose.model('likes',likeSchema);
