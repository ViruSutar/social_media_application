const mongoose=require('mongoose');

const followeSchema = new mongoose.Schema({
    follwerId:{type: mongoose.Schema.Types.ObjectId, ref: 'users',require:true},
    follweeId:{type: mongoose.Schema.Types.ObjectId, ref: 'users',require:true},
    createdAt: { type: Date, immutable: true, default: () => new Date() },
    updatedAt: { type: Date, default: new Date() }
})

module.exports=mongoose.model('follower',followeSchema);
