const mongoose=require('mongoose');

const commentSchema = new mongoose.Schema({
    comment:{type:String,require:true},
    postId:{type: mongoose.mongoose.Schema.Types.ObjectId, ref: 'posts',require:true},
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'users',require:true},
    createdAt: { type: Date, immutable: true, default: () => new Date() },
    updatedAt: { type: Date, default: new Date() }
})

module.exports=mongoose.model('comments',commentSchema);
