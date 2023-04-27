const BlogModel=require('../models/Blog')


class BlogController{
static create=async(req,res)=>{
    try {
        const {title,description,image}=req.body
          const result= new  BlogModel({
            title:title,
            description:description,
          })
          await result.save();
          res.status(201).json({
            success:true,
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
