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
app.use('/posts/store', validateMiddleware)
//

app.listen(4000, () => {
    console.log('App listening on port 4000');
})
//Chuyển hướng đến trang giới thiệu
app.get('/about', aboutController);

////Chuyển hướng đến trang liên hệ
app.get('/contact', contactController);

////Chuyển hướng đến trang post
app.get('/post', samplePostController);

//Chuyển hướng đến trang tạo bài viết
app.get('/posts/new', newPostController)
//Lấy dữ liệu trình duyệt gửi lên thông qua trường body của request


app.get('/', homeController)
app.get('/post/:id', getPostController)
app.post('/posts/store', storePostController)
app.get('/auth/register', newUserController)
app.post('/users/register', storeUserController)
app.get('/auth/login',loginController)
app.post('/users/login',loginUserController)