const BlogModel=require('../models/Blog')
const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
  cloud_name: "dwzcdo3uq",
  api_key: "537226856975565",
  api_secret: "PuGZrlmHthL8yOa9ntjrNsKoawE"
});


class BlogController{
static create=async(req,res)=>{
    // console.log("body",req.body)
    // console.log('res',req.files)
    try {
        const {title,content,cat}=req.body
        const image=req.files.image;
        // console.log(image)
        const uploadimg= await cloudinary.uploader.upload(
            image.tempFilePath,{
                folder:"BlogApiImage"
            }
        )
        // console.log(uplodimg);
        const result= await new BlogModel({
            title:title,
            content:content,
            category:cat,
            image:{
                pulic_id:uploadimg.public_id,
                url:uploadimg.secure_url
            }
        })
         await result.save();
         res.status(200).json({
            success:"true",
            message:"Blog Inserted Successfully",
            result
         })
    } catch (error) {
        console.log(error)
    }
}

static display=async(req,res)=>{
    try {
        const data=await BlogModel.find()
        res.status(200).json({
            success:true,
            data
          })
        
    } catch (error) {
        console.log(error)
    }

}
static displayBlogByQuery =async (req,res)=>
{
    try {
        const {title,id,sort,select}=req.query;
        // console.log(title)
        const queryObject={};
        if(title){
            queryObject.title={ $regex : title, $options : "i"};
            
        }
        // if(id){
        //     queryObject.id=id
        // }
        // console.log(queryObject)
        let apiData = BlogModel.find(queryObject)
        if(sort){
            let sortFix=sort.replace(","," ");
            apiData=apiData.sort(sortFix)
        }
        if(select){
            let selectFix=select.replace(","," ");
            apiData=apiData.select(selectFix)
        }

        const data = await apiData

        res.status(200).json({
            success:true,
            message:"Dispaly Blog By Passing Query",
            data 
        })
    } catch (error) {
       console.log(error) 
    }
}

static view=async(req,res)=>{
    try {
        const data=await BlogModel.findById(req.params.id)
        res.status(200).json({
            success:true,
            data
          })
    } catch (error) {
        console.log(error)
    }

}
static viewTopCat = async (req,res)=>{
    console.log("hello");
    try {
        const data = await BlogModel.find({category:"Tech"})
        // console.log(data)
        res.status(200).json({
            success:true,
            message:"Display Data By Top Tech Company Category ",
            data
        })
    } catch (error) {
        console.log(error)
    }
}
static ViewGadgets = async (req,res)=>{
    try {
        //  console.log("hello")
        const data = await BlogModel.find({category:"Gadget"})
        res.status(200).json({
            success:true,
            message:"Dispaly Data By Gadgets Categories",
            data
        })
    } catch (error) {
       console.log(error)  
    }
}
static update=async(req,res)=>{
    try {
        const {title,description}=req.body
        const data=await BlogModel.findByIdAndUpdate(req.params.id,{
           title:title,
           description:description
        })
        res.status(200).json({
            success:true,
            message:"Updated Successfully"
          })
        
    } catch (error) {
        console.log(error)
    }

}
static delete=async(req,res)=>{
    try {
        const data=await BlogModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,
            message:"Deleted Succesfully"
        })

        
    } catch (error) {
        console.log(error)
    }
}
}
module.exports=BlogController;
