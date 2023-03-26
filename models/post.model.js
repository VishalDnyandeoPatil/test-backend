const mongoose = require ("mongoose");

const postSchema= mongoose.Schema({
    title:{type:String, require:true},
    body:{type:String, require:true},
    device:{type:String, require:true, enum:['Laptop','Tablet','Mobile']},
    no_of_comments:{type:Number, require:true},
    userId:{type:String, require:true},
});
const post = mongoose.model('post',postSchema);

module.exports={post} 