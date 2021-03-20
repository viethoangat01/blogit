const User=require('../models/User')
module.exports=(req,res,next)=>{
    User.findById(req.session.userId,(error,user)=>{
        //Nếu session không chứa userId hoặc lỗi thì redirect sang màn hình login
        if(error||!user) return res.redirect('/auth/login')
        next()
    })
}