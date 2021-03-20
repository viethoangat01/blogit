const mongoose=require('mongoose')
const BlogPost=require('./models/BlogPost')
mongoose.connect('mongodb://localhost/test_mydb',{
    useNewUrlParser: true
});
// BlogPost.create({
//     title: 'Ebook coding',
//     body: 'Hello cac ban'
// },(error,BlogPost)=>{
//     console.log(error,BlogPost)
// })
//Lấy dữ liệu từ db
BlogPost.find({
    title: "Ebook coding"
},(error,blogpost)=>{
    console.log(error,blogpost)
})
//Update document
var id1="603b1da8a0effd092055dc92"
BlogPost.findByIdAndUpdate(id1,{
    title: "Viet Hoang"
},(error,blogpost)=>{
    console.log(error,blogpost)
})
var id2="603b2d02b31f2d15141e90ee"
BlogPost.findByIdAndDelete(id2,(error,blogpost)=>{
    console.log(error,blogpost)
})