const mongoose =require('mongoose')

// define schema 
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        pulic_id:{
            type:String, 
        },
        url:{
            type:String,
        }
    }
},{timestamps:true})


// create collection             
const BlogModel= mongoose.model('blog',blogSchema)
//                                ^ collection name  


module.exports=BlogModel;