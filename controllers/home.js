const BlogPost=require('../models/BlogPost.js')
module.exports=(req,res)=>{
    //Hiển thị dữ liệu bài post mới tạo 
    BlogPost.find({},function (error,posts){
        console.log(req.session)
         //console.log(posts)
        res.render('index',{
            blogposts: posts
        });
    })
}