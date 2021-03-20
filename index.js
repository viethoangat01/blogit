const { response } = require('express')
const express = require('express')
const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')
const { request } = require('http')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.raw());

//express-fileupload
const fileUpload = require('express-fileupload')
app.use(fileUpload())
//express-session
const expressSession=require('express-session');

const aboutController = require('./controllers/about');
const contactController = require('./controllers/contact');
const samplePostController = require('./controllers/samplePost');
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController=require('./controllers/login')
const loginUserController=require('./controllers/loginUser')
const logoutController=require('./controllers/logout')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useFindAndModify: true
})
const BlogPost = require('./models/BlogPost.js')

//Đăng ký thư mục public
app.use(express.static('public'));

//
const validateMiddleware = require('./middleware/validationMiddleware');
const authMiddleware=require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware=require('./middleware/redirectIfAuthenticatedMiddleware');
app.use('/posts/store', validateMiddleware)
//

app.listen(4000, () => {
    console.log('App listening on port 4000');
})
//
app.use(expressSession({
    secret: 'keyboard cat'
}))
//Xử lý ẩn login và register khi đã lựa chọn 1 trong 2
global.logggedIn=null;
app.use("*",(req,res,next)=>{
    logggedIn=req.session.userId;
    next();
});
//Chuyển hướng đến trang giới thiệu
app.get('/about', aboutController);

////Chuyển hướng đến trang liên hệ
app.get('/contact', contactController);

////Chuyển hướng đến trang post
app.get('/post', samplePostController);

//Chuyển hướng đến trang tạo bài viết
app.get('/posts/new',authMiddleware ,newPostController)
//Lấy dữ liệu trình duyệt gửi lên thông qua trường body của request


app.get('/', homeController)

app.get('/post/:id', getPostController)

app.post('/posts/store', authMiddleware,storePostController)

app.get('/auth/register',redirectIfAuthenticatedMiddleware, newUserController)

app.post('/users/register',redirectIfAuthenticatedMiddleware,storeUserController)

app.get('/auth/login',redirectIfAuthenticatedMiddleware,loginController)

app.post('/users/login',redirectIfAuthenticatedMiddleware,loginUserController)

app.get('/auth/logout',logoutController)

app.use((req,res)=>res.render('notfound'));

