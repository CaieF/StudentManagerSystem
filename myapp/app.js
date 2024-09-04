var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//引入
let db = require('./sql.js');
var indexRouter = require('./routes/index');
let left = require('./routes/left');
let right = require('./routes/right');
let studentCourse = require('./routes/studentCourse');
let addSC = require('./routes/addSC');
let likeSC = require('./routes/likeSC');
let delSC = require('./routes/delSC');
let updateSC = require('./routes/updateSC');
let user = require('./routes/user');
let teacherCourse = require('./routes/teacherCourse');
let likeTC = require('./routes/likeTC');
let addTC = require('./routes/addTC');
let delTC = require('./routes/delTC');
let updateTC = require('./routes/updateTC');
let courseGrade = require('./routes/courseGrade');
let likeCouG = require('./routes/likeCouG');
let classGrade = require('./routes/classGrade');
let likeClaG = require('./routes/likeClaG');
let studentGrade = require('./routes/studentGrade');
let likeStuG = require('./routes/likeStuG');
let addGrade = require('./routes/addGrade');
let student = require('./routes/student');
let likeStudent = require('./routes/likeStudent');
let addStudent = require('./routes/addStudent');
let delStudent = require('./routes/delStudent');
let updateStudent = require('./routes/updateStudent');
let teacher = require('./routes/teacher');
let addTeacher = require('./routes/addTeacher');
let likeTeacher = require('./routes/likeTeacher');
let delTeacher = require('./routes/delTeacher');
let updateTeacher = require('./routes/updateTeacher');
let course = require('./routes/course');
let likeCourse = require('./routes/likeCourse');
let addCourse = require('./routes/addCourse');
let delCourse = require('./routes/delCourse');
let updateCourse = require('./routes/updateCourse');
let studentGPA = require('./routes/studentGPA');
let likeStuGPA = require('./routes/likeStuGPA');

var app = express();
//配置sessioon中间件
const session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}))
//首页
app.use('/admin', indexRouter);
//左侧
app.use('/left',left);
//右侧
app.use('/right',right);
//学生选课
app.use('/studentCourse',studentCourse);
//添加学生选课
app.use('/addSC',addSC);
//添加排课安排
app.use('/addTC',addTC);
//一键导入成绩
app.use('/addGrade',addGrade);
//搜索功能
app.use('/likeSC',likeSC);
app.use('/likeTC',likeTC);
app.use('/likeCouG',likeCouG);
app.use('/likeClaG',likeClaG);
app.use('/likeStuG',likeStuG);
app.use('/likeStudent',likeStudent);
app.use('/likeTeacher',likeTeacher);
app.use('/likeCourse',likeCourse);
app.use('/likeStuGPA',likeStuGPA);
//删除功能
app.use('/delSC',delSC);
app.use('/delTC',delTC);
//修改功能
app.use('/updateSC',updateSC);
app.use('/updateTC',updateTC);
//用户信息展示界面
app.use('/user',user);
//课程安排
app.use('/teacherCourse',teacherCourse);
//展现按课程计算成绩
app.use('/courseGrade',courseGrade);
//展现按班级计算成绩
app.use('/classGrade',classGrade);
//展现按学生计算成绩
app.use('/studentGrade',studentGrade);
//展现计算学生绩点
app.use('/studentGPA',studentGPA);
//展现学生信息
app.use('/student',student);
//添加学生信息
app.use('/addStudent',addStudent);
//删除学生信息
app.use('/delStudent',delStudent);
//修改学生信息
app.use('/updateStudent',updateStudent);
//展现教师信息
app.use('/teacher',teacher);
//添加教师数据
app.use('/addTeacher',addTeacher);
//删除教师数据
app.use('/delTeacher',delTeacher);
//修改教师数据
app.use('/updateTeacher',updateTeacher);
//展现课程信息
app.use('/course',course);
//添加课程信息
app.use('/addCourse',addCourse);
//删除课程信息
app.use('/delCourse',delCourse);
//修改课程信息
app.use('/updateCourse',updateCourse);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{
    errorMessage: err.message
  });
});


module.exports = app;
