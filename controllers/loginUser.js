const bcrypt=require('bcrypt');
const { use } = require('browser-sync');
const User=require('../models/User.js')
module.exports=(req,res)=>{
    const {username,password}=req.body;
    User.findOne({username: username},(error,user)=>{
        if(user){
            bcrypt.compare(password,user.password,(error,same)=>{
                if(same){
                    //Nếu mật khẩu trùng thực hiện quay về trang chủ
                    res.redirect('/')
                }else{
                    res.redirect('/auth/login')
                }
            })
        }else{
            res.redirect('/auth/login')
        }
    })
}